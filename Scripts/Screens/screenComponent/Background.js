import React from 'react'
import { ImageBackground, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
import styles from "../../Assets/Styles";

const Background = ({image_url,children}) => {
  let img = require('../../Assets/images/bg_sectionV2.jpg');
  return (
    <ImageBackground
      source={image_url?image_url:img}
      resizeMode="stretch"
      style={styles.background}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          {children}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  )
}

export default Background
