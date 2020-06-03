import React from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import API from "../API";
import CustomButton from "./custom-button";

export default function Signin(props) {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  const signin = async (email, password) => {
    const data = await API.signin(email, password);
    if (data.message) {
      props.setCompanyType(data.companyType);
      props.setCompanyCode(data.companyCode);
      props.setLogin(true);
    } else {
      alert("로그인에 실패했습니다.");
    }
    setEmail(null);
    setPassword(null);
  };

  const handleSubmit = (email, password) => {
    email && password
      ? signin(email, password)
      : alert("❗️이메일과 비밀번호를 입력해주세요");
  };

  return (
    <ImageBackground
      source={require("../assets/medicine.jpg")}
      style={styles.container}
    >
      <Text style={styles.title}>MRP</Text>
      <Text style={styles.subTitle}>전문의약품 유통 및 추적 서비스</Text>

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.signInForm}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
            placeholder="ID@example.com"
            value={email}
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            placeholder="비밀번호를 입력해주세요."
            secureTextEntry={true}
            value={password}
          />

          <CustomButton
            text="로그인"
            btnColor="#0B4141"
            btnContainerColor="#0B4141"
            handleOnPress={() => handleSubmit(email, password)}
          />

          <Text style={styles.footer}>&copy;WooahSiblings</Text>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 80,
  },
  signInForm: {
    // backgroundColor: "rgba(52, 52, 52, 0.1)",
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 10,
  },
  title: {
    color: "#3e3533",
    fontSize: 80,
    marginTop: 20,
    // marginBottom: 10,
  },
  subTitle: {
    color: "#3e3533",
    fontSize: 20,
    marginTop: 10,
    marginBottom: 50,
  },
  input: {
    height: 50,
    width: 250,
    borderColor: "gray",
    color: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    fontSize: 15,
  },
  footer: {
    alignSelf: "center",
    marginTop: 70,
  },
});
