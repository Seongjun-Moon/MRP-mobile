import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Picker,
} from "react-native";
import CustomButton from "./button";
import BarCodeReader from "./barcode-reader";

export default function Form(props) {
  const [selectedValue, setSelectedValue] = useState("");
  const [barcode, setBarcode] = useState(false);

  return (
    <View style={styles.container}>
      {barcode ? (
        <BarCodeReader setBarcode={setBarcode} />
      ) : (
        <View style={styles.formContainer}>
          <Text>회사명</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
            placeholder="회사명 검색"
          />

          <Text>입/출고 여부</Text>
          <Picker
            selectedValue={selectedValue}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => {
              console.log(selectedValue);
              setSelectedValue(itemValue);
            }}
          >
            <Picker.Item label="입고" value="input" />
            <Picker.Item label="출고" value="output" />
          </Picker>

          <CustomButton
            text="바코드 인식"
            btnColor="#7a4938"
            btnContainerColor="#7a4938"
            handleOnPress={() => setBarcode(true)}
          />

          <Button onPress={() => props.setLogin(false)} title="로그아웃" />
          <Button onPress={() => setBarcode(true)} title="바코드 찍기" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // paddingTop: 100,
    // paddingBottom: 100,
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 100,
    paddingBottom: 100,
  },
  title: {
    color: "#3e3533",
    fontSize: 20,
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
  picker: {
    width: 200,
    marginTop: 0,
    marginLeft: 20,
    marginRight: 20,
    borderColor: "black",
    alignSelf: "center",
  },
});
