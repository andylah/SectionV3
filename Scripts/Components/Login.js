import {Component} from "react";
import LoginScreen from "../Screens/LoginScreen";
import {ToastAndroid} from "react-native";
import {APIKEY, LOGIN_URL} from "../Assets/Konstanta";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Login extends Component {
    state = {
        username: '',
        password: '',
        isLoading: false,
        isPassword: true,
        iconPassLock: 'eye-off',
    };

    loginProcess = async () => {
        const { username, password } = this.state;

        if (!username) {
            ToastAndroid.show("Username kosong!", ToastAndroid.SHORT);
            return;
        }
        if (!password) {
            ToastAndroid.show("Password kosong!", ToastAndroid.SHORT);
            return;
        }

        this.setState({ isLoading: true });

        try {
            const response = await fetch(LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authkey': APIKEY,
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!data.status) {
                this.setState({ isLoading: false });
                ToastAndroid.show(`${data.message}, periksa username & password.`, ToastAndroid.SHORT);
                return;
            }

            // ⚠️ Sebaiknya simpan token, bukan password
            await AsyncStorage.multiSet([
                ['username', username],
                ['password', password],
            ]);

            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'MainApp' }],
            });
        } catch (err) {
            this.setState({ isLoading: false });
            ToastAndroid.show(
                "Server error: " + (err.message || JSON.stringify(err)),
                ToastAndroid.LONG
            );
        }
    };

    showPass = () => {
        this.setState(prevState => ({
            iconPassLock: prevState.iconPassLock === "eye-off" ? "eye" : "eye-off",
            isPassword: !prevState.isPassword,
        }));
    };

    setUsername = (text) => this.setState({ username: text });
    setPassword = (text) => this.setState({ password: text });

    render() {
        return (
            <LoginScreen
                isLoading={this.state.isLoading}
                setUsername={this.setUsername}
                username={this.state.username}
                setPassword={this.setPassword}
                password={this.state.password}
                isPassword={this.state.isPassword}
                iconPassLock={this.state.iconPassLock}
                loginProcess={this.loginProcess}
                showPass={this.showPass}
            />
        );
    }
}

export default Login;
