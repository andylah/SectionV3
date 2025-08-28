import { Component } from "react";
import {TouchableHighlight, View} from "react-native";
import styles from "../Assets/Styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import DashboardComponent from "../Components/DashboardComponent";

class MainScreen extends Component{

    render(){
        return(
            <this.props.tab.Navigator
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
                                <TouchableHighlight onPress={()=>this.props.logoutProses(navigation)}>
                                    <Ionicons style={{color: '#fff'}} name="log-out-outline" size={25}/>
                                </TouchableHighlight>
                            </View>
                        ),
                        headerLeft: () => (
                            <View style={styles.circle}>
                                <Text style={styles.profileText}>{!route.params?'':route.params.userLogin}</Text>
                            </View>
                        )
                    })
            }
            >
                <this.props.tab.Screen
                    name="dashboard"
                    component={DashboardComponent}
                    options={{
                        tabBarLabel: 'Dashboard',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),
                    }}
                />
            </this.props.tab.Navigator>
        )
    }
}

export default MainScreen;