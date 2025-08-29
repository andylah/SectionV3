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
import Kategori from "../Components/Kategori";
import KategoriDetail from "../Components/KategoriDetail";
import Favorit from "../Components/Favorit";


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
  const { colors } = useTheme();
  return(
    <Tab.Navigator
      initialRouteName="dashboard"
      screenOptions={({navigation, route})=>({
        tabBarActiveTintColor: colors.ActiveTint,
        tabBarInactiveTintColor: colors.InactiveTint,
        tabBarActiveBackgroundColor: colors.ActiveBackground,
        tabBarInactiveBackgroundColor: colors.InactiveBackground,
        title: 'PT Indal Aluminium.Tbk',
        headerStyle: {
            backgroundColor: colors.primary,
        },
        headerTintColor: colors.HeaderTint,
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
      <Tab.Screen
        name='kategori'
        component={KategoriStack}
        options={({ navigation, route }) => ({
            tabBarLabel: 'Client',
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account-group" color={color} size={size} />
            ),
            headerLeft: () => (
                <View style={styles.circle}>
                    <Text style={styles.profileText}>{!navigation.getState().routes[1].state? '':navigation.getState().routes[1].state.routes[0].params.userLogin}</Text>
                </View>
                //console.log(navigation.getState().routes[1])
            )
        })}
      />
      <Tab.Screen
          name='favorit'
          component={Favorit}
          options={{
              tabBarLabel: 'Favorit',
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="heart" color={color} size={size} />
              ),
          }}
      />

    </Tab.Navigator>
  )
}

const KategoriStack = () => {
  return(
    <Stack.Navigator initialRouteName="mainKategori">
        <Stack.Screen name="mainKategori" component={Kategori} options={{headerShown: false}}/>
        <Stack.Screen name="detailKategori" component={KategoriDetail} options={({navigation, route}) =>({
            header: () => (
                <Appbar.Header>
                    <Appbar.Action icon="chevron-left" onPress={()=>{navigation.goBack()}}/>
                    <Appbar.Content title={route.params.client} />
                </Appbar.Header>
            )
        })}/>
    </Stack.Navigator>
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
