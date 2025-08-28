import {createStackNavigator} from "@react-navigation/stack";
import Splash from "../Components/Splash";
import Login from "../Components/Login";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Text, useTheme} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DashboardComponent from "../Components/DashboardComponent";

import {Alert, ToastAndroid, TouchableHighlight, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../Assets/Styles";
import {APIKEY, LOGOUT_URL} from "../Assets/Konstanta";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Appbar} from "react-native-paper";


const Stack = createStackNavigator();

const Autentikasi = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="loginScreen" component={Login}/>
  </Stack.Navigator>
);
const _logoutProses = (nav)=>{
        Alert.alert(
            'Peringatan',
            'Apakah anda yakin akan keluar ?',
            [
                {text: 'Tidak', style: 'cancel'},
                {text: 'Yakin', onPress: () => {
                    fetch(LOGOUT_URL,{
                        method:'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'authkey': APIKEY
                        },
                    }).then((response)=>response.json())
                        .then((data)=>{
                            if(data.status){
                                AsyncStorage.clear();
                                nav.reset({
                                    index:0,
                                    routes:[{name:'Login'}],
                                })
                            }else{
                                ToastAndroid.showWithGravityAndOffset(
                                    "Gagal logout coba ulangi sekali lagi.",
                                    ToastAndroid.LONG,
                                    ToastAndroid.BOTTOM,
                                    25,
                                    50
                                );
                            }
                        }).catch((err)=>{
                            ToastAndroid.showWithGravityAndOffset(
                                "Server Down, gagal logout. kode :"+JSON.stringify(err),
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM,
                                25,
                                50
                            );
                        })
                }}],
            { cancelable: false }
        )
}


const MainApp = () => {
  const Tab = createBottomTabNavigator()
  const theme = useTheme();
  return(
    <Tab.Navigator
      initialRouteName="dashboard"
      screenOptions={({navigation, route})=>({
        tabBarActiveTintColor: '#9C27B0',
        tabBarInactiveTintColor: '#757575',
        tabBarActiveBackgroundColor: '#7B1FA2',
        tabBarInactiveBackgroundColor: '#7C4DFF',
        title: 'PT Indal Aluminium.Tbk',
        headerStyle: {
            backgroundColor: '#9C27B0',
        },
        headerTintColor: '#FFFFFF',
        headerRight: () =>(
            <View style={styles.iconContainer}>
                <TouchableHighlight onPress={()=>_logoutProses(navigation)}>
                    <Ionicons style={{color: '#fff'}} name="log-out-outline" size={25}/>
                </TouchableHighlight>
            </View>
        ),
        headerLeft: () => (
            <View style={styles.circle}>
                <Text style={styles.profileText}>{!route.params?'':route.params.userLogin}</Text>
            </View>
        )
      })}
    >
      <Tab.Screen
        name='dashboard'
        component={DashboardComponent}
        options={{
            tabBarLabel: 'Dashboard',
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
        }}
      />

    </Tab.Navigator>
  )
}

const Navigasi = () => {
    return (
        <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Splash" component={Splash}/>
            <Stack.Screen name="Login" component={Autentikasi}/>
            <Stack.Screen name="MainApp" component={MainApp}/>
        </Stack.Navigator>
    )
}

export default Navigasi;
