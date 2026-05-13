import React from "react";
import {View, Text} from  "react-native";

export default function URT(props){
    return(
        <View>
            <Text>Uniao Recreativa dos Trabalhadores</Text>
            <Text>{props.nome}</Text>
        </View>
    );
}