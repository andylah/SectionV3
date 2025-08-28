import {Component} from "react";
import MainScreen from "../Screens/MainScreen";
import { useTheme } from "react-native-paper";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Alert, ToastAndroid} from "react-native";



class MainApp extends Component{
    tema = useTheme
    tab = createBottomTabNavigator();

    // logoutProses = (nav)=>{
    //     Alert.alert(
    //         'Peringatan',
    //         'Apakah anda yakin akan keluar ?',
    //         [
    //             {text: 'Tidak', style: 'cancel'},
    //             {text: 'Yakin', onPress: () => {
    //                 fetch(LOGOUT_URL,{
    //                     method:'POST',
    //                     headers: {
    //                         'Accept': 'application/json',
    //                         'Content-Type': 'application/json',
    //                         'authkey': APIKEY
    //                     },
    //                 }).then((response)=>response.json())
    //                     .then((data)=>{
    //                         if(data.status){
    //                             AsyncStorage.clear();
    //                             nav.reset({
    //                                 index:0,
    //                                 routes:[{name:'login'}],
    //                             })
    //                         }else{
    //                             ToastAndroid.showWithGravityAndOffset(
    //                                 "Gagal logout coba ulangi sekali lagi.",
    //                                 ToastAndroid.LONG,
    //                                 ToastAndroid.BOTTOM,
    //                                 25,
    //                                 50
    //                             );
    //                         }
    //                     }).catch((err)=>{
    //                         ToastAndroid.showWithGravityAndOffset(
    //                             "Server Down, gagal logout. kode :"+JSON.stringify(err),
    //                             ToastAndroid.LONG,
    //                             ToastAndroid.BOTTOM,
    //                             25,
    //                             50
    //                         );
    //                     })
    //             }}],
    //         { cancelable: false }
    //     )
    // }

    componentDidMount(){
        console.log('masuk ke mainApp screen')
    }
    render(){
        return(
            <MainScreen 
                tema={this.tema} 
                tab={this.tab}
                // logoutProses={this.logoutProses}
            />
        )
    }
}

export default MainApp;