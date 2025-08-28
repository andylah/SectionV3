"use strict";
import React, {Component} from 'react';
import { View, TextInput, TouchableOpacity, ToastAndroid } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from "../../Assets/Styles";

class SearchBar extends Component {
    constructor(props){
        super(props)

        this.state = {
            searchTerm:'',
        }
    }
    buttonSearch = (searchTerm) => {
      if (searchTerm != ""){
        this.props.onPress(searchTerm);
      }else{
        ToastAndroid.showWithGravityAndOffset(
          "Kata pencarian kosong.",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      }
    }
    render() {
        return (
            <View style={styles.searchBarContainer}>
                <TextInput
                    placeholder = 'Masukkan kata kunci pencarian anda.'
                    style = {styles.textInputSearch}
                    underlineColorAndroid={'transparent'}
                    onChangeText={(term) =>
                      this.setState({
                        searchTerm: term
                      },()=>{
                        this.props.onPress(term)
                      })
                    }
                />
                <TouchableOpacity
                    style = {styles.textSearchButton}
                    onPress={()=>this.buttonSearch(this.state.searchTerm)}
                >
                    <Ionicons name="search" size={16} color="#000" />
                </TouchableOpacity>
            </View>
        );
    }
}

export default SearchBar
