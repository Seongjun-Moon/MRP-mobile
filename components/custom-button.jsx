import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

export default function CustomButton(props) {
  return (
    <TouchableOpacity onPress={props.handleOnPress} style={props.style}>
      <View
        style={{
          alignItems: "center",
          borderColor: `${props.btnContainerColor}`,
          borderRadius: 10,
          borderWidth: 2,
          padding: 10,
          paddingLeft: 50,
          paddingRight: 50,
          // marginTop: 200,
        }}
      >
        <Text
          style={{
            color: `${props.btnColor}`,
            fontSize: 20,
          }}
        >
          {props.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
