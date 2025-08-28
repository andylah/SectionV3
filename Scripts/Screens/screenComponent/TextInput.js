import React from 'react'
import { View } from 'react-native'
import { TextInput as Input } from 'react-native-paper'

import styles from "../../Assets/Styles";

const TextInput = ({ ...props }) => (
  <View style={styles.containerTextInput}>
    <Input
      style={styles.input}
      selectionColor='#607D8B'
      underlineColor="transparent"
      mode="flat"
      {...props}
    />
  </View>
)

export default TextInput;
