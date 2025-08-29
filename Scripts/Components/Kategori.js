import {Component} from "react";
import KategoriScreen from "../Screens/KategoriScreen";
import Loader from "../Screens/screenComponent/Loader";
import styles from "../Assets/Styles";
import {APIKEY, POST_ALMI_URL} from "../Assets/Konstanta";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ToastAndroid, View} from "react-native";
import SearchBar from "../Screens/screenComponent/searchBar";


class Kategori extends Component{
    constructor(props) {
        super();
        this.state = {
            username:'',
            password:'',
            isLoading:false,
            dataClient:[],
            dataClientFilter:[],
            dataAluminium:[],
            dataAluminiumFilter:[]
        }
    }

    _groupBy = (arr, criteria) =>
        arr.reduce((obj, item) => {
            let key = typeof criteria === "function" ? criteria(item) : item[criteria];
            if (!obj.hasOwnProperty(key)) obj[key] = [];
            obj[key].push(item);
            return obj;
        }, {});
    _fetchingDataClient = ()=>{
        this.setState({
            isLoading: true,
        },async ()=>{
            await AsyncStorage.multiGet(['username','password'], (err, result)=>{
                this.setState({
                    username: result[0][1],
                    password: result[1][1]
                }, ()=>{
                    fetch(POST_ALMI_URL,{
                        method:'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'authkey' : APIKEY
                        },
                        body: JSON.stringify({
                            username: this.state.username,
                            password: this.state.password
                        })
                    }).then((response)=>response.json())
                        .then((responseData)=>{
                            const client = this._groupBy(responseData.data, 'client')
                            this.setState({
                                dataAluminium: responseData.data,
                                dataAluminiumFilter: responseData.data,
                                dataClient: Object.keys(client),
                                dataClientFilter: Object.keys(client),
                                isLoading: false,
                            })
                        })
                        .catch((error)=>{
                        this.setState({
                            isLoading: false
                        },()=>{
                            console.log(error.message)
                            ToastAndroid.showWithGravityAndOffset(
                                "Gagal menghubungi server periksa jaringan anda.",
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM,
                                25,
                                50
                            );
                        })
                    })
                    this.props.navigation.setParams({
                        userLogin: this.state.username.substring(0,1).toUpperCase()
                    })
                })
            })
        })
    }

    _searchingClient = (term)  =>{
        let dataClientOri = this.state.dataClient
        const result = dataClientOri.filter((key)=>{
            const client = key.toUpperCase().replace(/\s/g, '');
            const searchTerm = term.toUpperCase().replace(/\s/g, '');

            return client.indexOf(searchTerm) > -1;
        })
        if(result.length == 0){
            ToastAndroid.showWithGravityAndOffset(
                "Pencarian tidak menemukan hasil ...",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }else{
            this.setState({
                dataClientFilter: result
            })
        }
    }

    componentDidMount() {
        this._fetchingDataClient()
        this.focusListener = this.props.navigation.addListener('focus', ()=>{
            this._fetchingDataClient()
        })
    }

    componentWillUnmount() {
        this.focusListener()
    }

    _showDetail = (client) =>{
        this.props.navigation.navigate('detailKategori',{
            client: client,
            dataAluminium: this.state.dataAluminium,
        })
    }

    _getTotalSection = (client) => {
        let total = 0
        total = this.state.dataAluminium.reduce((count, item) => count + (item.client === client ? 1 : 0), 0)
        return total
    }

    render(){
        return(
            <View style={styles.searchContainer}>
                <SearchBar onPress={this._searchingClient}/>
                <Loader loading={this.state.isLoading}/>
                <KategoriScreen data={this.state.dataClientFilter}
                    showDetail={this._showDetail}
                    getTotalSection={this._getTotalSection}
                />
            </View>
        )
    }
}

export default Kategori;
