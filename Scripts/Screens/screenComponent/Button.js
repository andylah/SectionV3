import React from 'react'
import { Button as PaperButton } from 'react-native-paper'
import styles from "../../Assets/Styles.js";

const Button = ({ mode, style, ...props }) => (
  <PaperButton
    style={[
      styles.button,
      mode === 'outlined' && { backgroundColor: 'rgba(35,50,68,0.99)' },
      style,
    ]}
    labelStyle={styles.text}
    mode={mode}
    {...props}
  />
)

export default Button;
