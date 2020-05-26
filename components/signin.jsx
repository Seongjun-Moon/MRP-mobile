import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";

export default function Signin(props) {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  const signin = (email, password) => {
    const url = "70.12.113.182:9090";
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: email, pw: password }),
    };

    console.log(fetchOptions);
    fetch(`http://${url}/user/signIn`, fetchOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message) {
          props.setCompanyType(data.companyType);
          props.setLogin(true);
        } else {
          alert("❗️로그인에 실패했습니다.");
          setEmail(null);
          setPassword(null);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MRP</Text>

      {/* <Text>Email</Text> */}
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
        value={email}
      />

      {/* <Text>Password</Text> */}
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
      />

      <TouchableOpacity
        onPress={() => {
          console.log(email + password);
          email && password
            ? signin(email, password)
            : alert("❗️이메일과 비밀번호를 입력해주세요");
        }}
        style={styles.buttonContainer}
      >
        <View>
          <Text style={styles.button}>로그인</Text>
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
  input: {
    height: 50,
    width: 250,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    fontSize: 20,
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
