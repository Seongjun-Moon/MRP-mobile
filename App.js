import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Signin from "./components/signin";
import SettingForm from "./components/setting-form";

export default function App() {
  const [isLoggedIn, setLogin] = useState(false);
  const [companyType, setCompanyType] = useState(null);

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <SettingForm
          isLoggedIn={isLoggedIn}
          setLogin={setLogin}
          companyType={companyType}
        />
      ) : (
        <Signin setLogin={setLogin} setCompanyType={setCompanyType} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dee8eb",
    alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    color: "#3e3533",
    fontSize: 50,
    marginTop: 80,
    marginBottom: 10,
  },
  // button: {
  //   color: "#64b3d3",
  //   fontSize: 20,
  // },
  // buttonContainer: {
  //   borderColor: "#64b3d3",
  //   borderRadius: 10,
  //   borderWidth: 2,
  //   padding: 15,
  //   paddingLeft: 50,
  //   paddingRight: 50,
  //   marginTop: 200,
  // },
});
