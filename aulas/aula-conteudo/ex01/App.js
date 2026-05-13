import React from "react";
import { View, Text, StyleSheet} from "react-native";
import URT from "./components/URT";

export default function App(){
  return(
    <View style={styles.container}>
      <URT nome = 'POEIRA AZUL'/>
      <Text style={styles.text}> URT 2 x 1 Marias !!! </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: '#6a60f3',
  },
  text: {
    fontsize: 24,
    fontWeight:'bold',
  }
});