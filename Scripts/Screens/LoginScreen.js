import {Component} from "react";
import {StatusBar, View} from "react-native";
import {Text, TextInput as TextIcon} from 'react-native-paper';
import Background from "./screenComponent/Background";
import styles from "../Assets/Styles";
import Loader from "./screenComponent/Loader";
import Logo from "./screenComponent/Logo";
import Header from "./screenComponent/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import Button from "./screenComponent/Button";
import DeviceInfo from "react-native-device-info";
import CustomTextInput from "./screenComponent/TextInput";

class LoginScreen extends Component{
    componentDidMount(){
        console.log(
            this.props.iconPassLock +","+ this.props.isPassword
        )
    }
    render(){
        return(
           <Background>
               <View style={styles.container}>
                    <StatusBar hidden={true}/>
                    <Loader loading={this.props.isLoading}/>
                    <Logo/>
                    <Header>Katalog Section</Header>
                    <CustomTextInput
                        label="Nama Pengguna"
                        value={this.props.username}
                        onChangeText={(username)=>this.props.setUsername(username)}
                        autoCompleteType="username"
                        textContentType="username"
                        autoCapitalize="none"
                        keyboardType="default"
                        left={
                           <TextIcon.Icon icon={()=><Ionicons name={'person-outline'} size={20} color="#ffffffff"/>}/>
                        }
                    />
                    <CustomTextInput
                        label="Kata Sandi"
                        value={this.props.password}
                        secureTextEntry={this.props.isPassword}
                        onChangeText={(password)=>this.props.setPassword(password)}
                        autoCapitalize="none"
                        returnKeyType="done"
                        keyboardType="default"
                        left={
                           <TextIcon.Icon icon={()=><Ionicons name={'lock-closed'} size={20} color="#ffffffff"/>}/>
                        }
                        // right={
                        //     <TextIcon.Icon icon={()=><Ionicons name={this.props.iconPassLock} size={20} />} onPress={this.props.showPass}/>
                        // }
                    />
                    <Button mode="contained" icon='login' onPress={this.props.loginProcess} style={styles.buttonLogin}>
                        Masuk
                    </Button>
               </View>
               <View style={styles.twoButtonHorizontal}>
                   <Text style={{marginBottom: 10, color: "#ffffffff"}}>Version {DeviceInfo.getVersion()}</Text>
               </View>
           </Background>
        )
    }
}

export default LoginScreen;
