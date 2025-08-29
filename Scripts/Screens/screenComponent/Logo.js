import React from 'react'
import { Image, StyleSheet } from 'react-native'
import styles from "../../Assets/Styles";

const Logo = () => (
  <Image source={require('../../Assets/images/logo-new.png')} resizeMode='contain' style={styles.imageLogo} />
)
export default Logo
