import {Component} from "react";
import {FlatList, StatusBar, Text, TouchableWithoutFeedback, View} from "react-native";
import styles from "../Assets/Styles";
import {theme} from "../Assets/Theme";
import {IMAGE_URL} from "../Assets/Konstanta";
import {Title} from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Box, Divider, HStack, IconButton, Image, VStack} from "native-base";
import {Spacer} from "native-base/src/components/primitives/Flex";

class DashboardScreen extends Component{
    constructor(props) {
        super();
        this.state = {

        }
    }

    render(){
        const renderFunction = ({item}) =>{
            return(
                <Box>
                    <Box pl="4" pr="5" py="2">
                        <HStack alignItems="center" space={3}>
                            <Image size="sm" source={{uri:IMAGE_URL+'/'+item.shape}} resizeMode="contain" alt={"Section No."+item.section}/>
                            <TouchableWithoutFeedback
                                onLongPress={()=>this.props.onLongPress(item)}
                            >
                                <VStack>
                                    <Text>Section No: <Title style={{color:'#3F51B5', fontWeight:'bold'}}>{item.section}</Title></Text>
                                    <Text>Dimension : {item.dimension}</Text>
                                    <Text>Weight : {item.weight}</Text>
                                    <Text>Perimeter : {item.perimeter}</Text>
                                    <Text>Application : {item.application.length>22?item.application.substring(0,20)+"..":item.application}</Text>
                                    <Text>Client : {item.client}</Text>
                                </VStack>
                            </TouchableWithoutFeedback>
                            <Spacer />
                                {
                                    item.dwg==1?
                                        <IconButton onPress={()=>this.props.downloadPDF(item.section)} icon={<Ionicons name={"cloud-download-outline"} style={{fontSize:25, color:'#3F51B5'}}/>} alignSelf="center"/>
                                        :
                                        <Ionicons name={"cloud-offline-outline"} style={{fontSize:25, color:'#3F51B5'}} alignSelf="center"/>
                                }
                        </HStack>
                    </Box>
                    <Divider/>
                </Box>
            )
        }
        return(
            <View style={styles.searchResultsContainer}>
                <StatusBar backgroundColor='#3F51B5' barStyle="light-content"/>
                <FlatList
                    data={this.props.data}
                    renderItem={renderFunction}
                    keyExtractor={(item)=>item.section}
                />
            </View>
        )
    }
}

export default DashboardScreen;
