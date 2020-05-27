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
import API from "../API";

export default function Form(props) {
  const [selectedValue, setSelectedValue] = useState("");
  const [barcodeScreen, setBarcodeScreen] = useState(false);
  const [barcode, setBarcode] = useState(null);
  const [oppCompanyCode, setOppCompanyCode] = useState("");

  return (
    <View style={styles.container}>
      {barcodeScreen ? (
        <BarCodeReader
          setBarcodeScreen={setBarcodeScreen}
          barcode={barcode}
          setBarcode={setBarcode}
        />
      ) : (
        <View style={styles.formContainer}>
          <Text>회사코드</Text>
          <Text>{props.companyCode}</Text>
          <Text>입/출고할 회사명</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setOppCompanyCode(text)}
            placeholder="회사명 검색"
            value={oppCompanyCode}
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
          {barcode ? (
            <Text>{barcode}</Text>
          ) : (
            <CustomButton
              text="바코드 인식"
              btnColor="#7a4938"
              btnContainerColor="#7a4938"
              handleOnPress={() => setBarcodeScreen(true)}
            />
          )}

          <Button
            onPress={() => {
              alert(
                `${props.companyCode}, ${oppCompanyCode}, ${barcode}, ${selectedValue}`
              );
              API.sendInfo({
                companyCode: props.companyCode,
                targetCompanyCode: oppCompanyCode,
                barcode: barcode,
                state: selectedValue,
              });
            }}
            title="테스트"
          />
          <Button onPress={() => props.setLogin(false)} title="로그아웃" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
