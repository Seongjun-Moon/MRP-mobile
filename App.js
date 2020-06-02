import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Signin from "./components/signin";
import Form from "./components/form";

export default function App() {
  const [isLoggedIn, setLogin] = useState(false);
  const [companyType, setCompanyType] = useState(null);
  const [companyCode, setCompanyCode] = useState(null);

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <Form
          isLoggedIn={isLoggedIn}
          setLogin={setLogin}
          companyType={companyType}
          companyCode={companyCode}
        />
      ) : (
        <Signin
          setLogin={setLogin}
          setCompanyType={setCompanyType}
          setCompanyCode={setCompanyCode}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: "#3e3533",
    fontSize: 50,
    marginTop: 80,
    marginBottom: 10,
  },
});
