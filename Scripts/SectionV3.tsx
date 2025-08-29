import React from "react";
import { NativeBaseProvider, View, Text} from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import Navigasi from "./Routes/Navigasi"; // sementara dimatikan dulu
import { PaperProvider } from "react-native-paper";
import { theme } from "./Assets/Theme";


const SectionV3 = () => {
  return (
    <NativeBaseProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
            <Navigasi/>
        </NavigationContainer>
      </PaperProvider>
    </NativeBaseProvider>
  );
};

export default SectionV3;