import React, { useState, useEffect } from "react";
import { Text, TextInput, View, StyleSheet, Button } from "react-native";
import API from "../API";
import CustomButton from "./custom-button";

export default function CompanySearch(props) {
  const [targetCompanyCode, setTargetCompanyCode] = useState("");

  const handleSubmit = async () => {
    const data = await API.searchCompanybyName();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>업체명 검색</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setTargetCompanyCode(text)}
        placeholder="업체 키워드를 입력하세요"
        value={targetCompanyCode}
      />
      <CustomButton
        style={{ marginBottom: 5 }}
        handleOnPress={handleSubmit}
        btnColor="#0B4141"
        btnContainerColor="#0B4141"
        text="검색"
      />
      <Button
        title="뒤로가기"
        color="#828b8b"
        onPress={() => props.setCompanySearch(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  labelText: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 40,
    // width: 250,
    borderColor: "gray",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    fontSize: 18,
  },
});
