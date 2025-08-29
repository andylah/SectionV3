import {Component} from "react";
import {FlatList, StatusBar,  TouchableWithoutFeedback, View} from "react-native";
import styles from "../Assets/Styles";
import {theme} from "../Assets/Theme";
import {Box, Divider, Flex, HStack, IconButton, Text, VStack} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Title} from "react-native-paper";
import {Spacer} from "native-base/src/components/primitives/Flex";

class KategoriScreen extends Component{
    constructor(props) {
        super();
        this.state = {

        }
    }
    render(){
        const displayListClient = ({item, index})=>{
            return(
                <TouchableWithoutFeedback
                    onPress={()=>this.props.showDetail(item)}
                >
                <Box flex={1}>
                    <Box pl="4" pr="5" py="1">
                        <HStack alignItems="center" space={2}>
                            <Ionicons name={"clipboard"} style={{fontSize:25, color:'#2196F3'}}/>


                            <Text><Title style={{color:"#505050", fontWeight:'bold'}}>{item}</Title></Text>

                            <Spacer />
                            <VStack>
                                <IconButton icon={<Ionicons name={"play"} style={{fontSize:25, color:'#2196F3'}} alignSelf="flex-start"/>} size="xs"/>
                                <Text style={{fontSize: 10}} alignSelf="flex-start">{this.props.getTotalSection(item)} Section</Text>
                            </VStack>
                        </HStack>
                    </Box>
                    <Divider/>
                </Box>
            </TouchableWithoutFeedback>
            )
        };
        return(
            <View style={styles.searchResultsContainer}>
                <StatusBar backgroundColor='#2196F3' barStyle="light-content"/>
                <FlatList
                    data={this.props.data}
                    renderItem={displayListClient}
                    keyExtractor={(item)=>item}
                />
            </View>
        )
    }
}

export default KategoriScreen;
