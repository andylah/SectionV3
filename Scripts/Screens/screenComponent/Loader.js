// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import { View, Modal, ActivityIndicator, Text } from "react-native";
import styles from "../../Assets/Styles";


const Loader = (props) => {
  const {loading, ...attributes} = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={true}
            style={styles.indicator}
            size="large"
            color="#ff0000ff"
          />
          <Text>Loading ...</Text>
        </View>
      </View>
    </Modal>
  );
};

export default Loader;
