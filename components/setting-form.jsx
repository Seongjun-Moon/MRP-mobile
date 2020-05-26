import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";

export default function SettingForm(props) {
  const sendCompanyInfo = () => {
    // const url = "70.12.113.182:9090";
    // const fetchOptions = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ id: email, pw: password }),
    // };
    // console.log(fetchOptions);
    // fetch(`http://${url}/user/signIn`, fetchOptions)
    //   .then((res) => res.json())
    //   .then((data) => alert(data.companyType));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회사 검색하기</Text>
      <TextInput
        style={{
          height: 40,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 20,
          padding: 5,
        }}
        onChangeText={(text) => setEmail(text)}
        placeholder="email"
      />

      <TouchableOpacity onPress={() => {}}>
        <View style={styles.buttonContainer}>
          <Text style={styles.button}>전송</Text>
        </View>
      </TouchableOpacity>

      <Button onPress={() => props.setLogin(false)} title="로그아웃" />
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
    alignItems: "center",
    borderColor: "#64b3d3",
    borderRadius: 10,
    borderWidth: 2,
    padding: 15,
    paddingLeft: 50,
    paddingRight: 50,
    // marginTop: 200,
  },
});
