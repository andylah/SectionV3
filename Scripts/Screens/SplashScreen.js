import {Component} from "react";
import {ActivityIndicator, Image, StatusBar, Text, View} from "react-native";
import styles from "../Assets/Styles";

class SplashScreen extends Component{

    render(){
        let serverStatus;
        if (!this.props.status){
            serverStatus = (
                <Image source={require('../Assets/images/red_light.png')}
                       style={{width: 10, height: 10, marginTop: 10}}
                       />
            )
        }else{
            serverStatus = (
                <Image source={require('../Assets/images/green_light.png')}
                       style={{width: 10, height: 10, marginTop: 10}}
                       />
            )
        }
        return(
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <Image source={require('../Assets/images/splashScreen.png')}
                       style={styles.splashImage}
               />
               <View style={{position: 'absolute', bottom: 15}}>
                   <ActivityIndicator
                       animating={true}
                       color="#002D3DF"
                       size="large"
                       style={styles.activityIndicator}
                   />
                   <Text>Server Status {serverStatus} </Text>
               </View>
            </View>
        )
    }
}

export default SplashScreen;
