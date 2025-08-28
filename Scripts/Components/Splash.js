import {Component} from "react";
import SplashScreen from "../Screens/SplashScreen";
import {APIKEY, INDEX_URL, LOGIN_URL} from "../Assets/Konstanta";
import AsyncStorage from '@react-native-async-storage/async-storage';

class Splash extends Component
{
    constructor(props){
        super();
        this.state = {
            isUP: false
        }
    }

    checkingStatus = () => {
        const timeout = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Request Timeout')), 1000);
        });

        const request = fetch(INDEX_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authkey': APIKEY,
            },
        });

        Promise.race([timeout, request])
            .then(response => {
                if (!(response instanceof Response)) {
                    throw new Error('Invalid response object');
                }

                if (!response.ok) {
                    console.log(`Server UP tapi response kode salah. code ${response.status}`);
                } else {
                    this.setState({ isUP: true }, () => {
                        clearInterval(this.checkServer);
                        this.loadApp();
                    });
                }
            })
            .catch((err) => {
                console.log("Server Down:", err.message || err);
                clearInterval(this.checkServer);

                ToastAndroid.showWithGravityAndOffset(
                    "Server Down, Coba hubungi administrator.",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );

                // retry otomatis 10 detik kemudian
                setTimeout(() => {
                    this.checkingStatus();
                }, 10000);
            });
    }

    async loadApp() {
        try {
            const values = await AsyncStorage.multiGet(['username', 'password']);
            const username = values[0][1];
            const password = values[1][1];

            if (username && password) {
                const response = await fetch(LOGIN_URL, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'authkey': APIKEY,
                    },
                    body: JSON.stringify({ username, password }),
                });

                const responseData = await response.json();

                if (responseData.status) {
                    console.log("Masuk dashboard");
                    this.props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'MainApp' }],
                    });
                    
                } else {
                    console.log("Masuk Login Area");
                    this.props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    });
                    
                }
            } else {
                console.log("Masuk Login Area 2");
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
                
            }
        } catch (error) {
            console.log("Auto login error:", error);
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }
    }

    componentDidMount(){
        this.checkServer = setInterval(this.checkingStatus.bind(this), 5000);
    }

    render(){
        return(
            <SplashScreen status={this.state.isUP}/>
        )
    }
}

export default Splash;
