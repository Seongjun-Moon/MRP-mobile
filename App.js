import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Signin from "./components/signin";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MRP</Text>

      <Signin />

      <TouchableOpacity onPress={() => alert("곰성준씨 가만히계세여")}>
        <View style={styles.buttonContainer}>
          <Text style={styles.button}>등록하기</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dee8eb",
    alignItems: "center",
  },
  title: {
    color: "#3e3533",
    fontSize: 50,
    marginTop: 80,
    marginBottom: 10,
  },
  button: {
    color: "#64b3d3",
    fontSize: 20,
  },
  buttonContainer: {
    borderColor: "#64b3d3",
    borderRadius: 10,
    borderWidth: 2,
    padding: 15,
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: 200,
  },
});
