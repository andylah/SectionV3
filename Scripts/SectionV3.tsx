import React from "react";
import { NativeBaseProvider, View, Text} from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import Navigasi from "./Routes/Navigasi"; // sementara dimatikan dulu
import { PaperProvider } from "react-native-paper";


const SectionV3 = () => {
  return (
    <NativeBaseProvider>
      <PaperProvider>
        <NavigationContainer>
            <Navigasi/>
        </NavigationContainer>
      </PaperProvider>
    </NativeBaseProvider>
  );
};

export default SectionV3;