import {Component} from "react";
import {FlatList, Text, TouchableWithoutFeedback, View} from "react-native";
import {Box, Divider, HStack, IconButton, Image, VStack} from "native-base";
import {IMAGE_URL} from "../Assets/Konstanta";
import {Title} from "react-native-paper";
import {theme} from "../Assets/Theme";
import {Spacer} from "native-base/src/components/primitives/Flex";
import Ionicons from "react-native-vector-icons/Ionicons";

class KategoriDetailScreen extends Component{
    constructor(props) {
        super();
        this.state = {

        }
    }
    render(){
        const displayClientDie = ({item}) =>{
            return(
                <Box>
                    <Box pl="4" pr="5" py="2">
                        <HStack alignItems="center" space={3}>
                            <Image size="sm" source={{uri:IMAGE_URL+'/'+item.shape}} resizeMode="contain" alt={"Section No."+item.section}/>
                            <TouchableWithoutFeedback
                                onLongPress={()=>this.props.LongPress(item)}
                            >
                                <VStack>
                                    <Text>Section No: <Title style={{color:theme.colors.primary, fontWeight:'bold'}}>{item.section}</Title></Text>
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
                                    <IconButton onPress={()=>this.props.download(item.section)} icon={<Ionicons name={"cloud-download-outline"} style={{fontSize:25, color:theme.colors.primary}}/>} alignSelf="center"/>
                                    :
                                    <Ionicons name={"cloud-offline-outline"} style={{fontSize:25, color:theme.colors.primary}} alignSelf="center"/>
                            }
                        </HStack>
                    </Box>
                    <Divider/>
                </Box>
            )
        }
        return(
            <FlatList
                data={this.props.data}
                renderItem={displayClientDie}
                keyExtractor={item => item.section}
            />
        )
    }
}

export default KategoriDetailScreen;
