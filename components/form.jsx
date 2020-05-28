import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Alert,
  Button,
  Picker,
} from "react-native";
import CustomButton from "./custom-button";
import BarCodeReader from "./barcode-reader";
import API from "../API";

export default function Form(props) {
  const [stateValue, setStateValue] = useState("");
  const [barcodeScreen, setBarcodeScreen] = useState(false);
  const [barcode, setBarcode] = useState(null);
  const [targetCompanyCode, setTargetCompanyCode] = useState("");

  const handleSubmitBtnOnPress = () => {
    if (barcode && targetCompanyCode && stateValue) {
      Alert.alert(
        "유통 내역",
        `업체 코드: ${props.companyCode},\n 대상 업체 코드: ${targetCompanyCode},\n 바코드: ${barcode},\n 입/출고 여부: ${stateValue} \n\n 제출하시겠습니까?`,
        [
          {
            text: "Cancel",
            onPress: () => console.log("제출 취소"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: handleSubmit,
          },
        ],
        { cancelable: false }
      );
    } else {
      alert("정보를 모두 입력해주세요");
    }
  };

  const handleSubmit = async () => {
    await API.sendDistInfo({
      companyCode: props.companyCode,
      targetCompanyCode: targetCompanyCode,
      barcode: barcode,
      state: stateValue,
    }).then((data) => alert(data));
  };

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
          <Text style={styles.title}>유통 이력 등록</Text>
          <View style={styles.formInputContainer}>
            <Text style={styles.labelText}>회사코드</Text>
            <Text style={styles.mainText}>{props.companyCode}</Text>
          </View>

          <View style={styles.formInputContainer}>
            <Text style={styles.labelText}>입 / 출고할 회사 코드</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setTargetCompanyCode(text)}
              placeholder="회사명 검색(기능 추후 개발)"
              value={targetCompanyCode}
            />
          </View>

          <View style={styles.formInputContainer}>
            <Text style={styles.labelText}>입 / 출고 여부</Text>
            <Picker
              selectedValue={stateValue}
              style={styles.picker}
              itemStyle={{ height: 44 }}
              onValueChange={(itemValue) => {
                setStateValue(itemValue);
              }}
            >
              <Picker.Item label="입고" value="input" />
              <Picker.Item label="출고" value="output" />
            </Picker>
          </View>

          <View style={styles.formInputContainer}>
            <Text style={styles.labelText}>바코드</Text>
            {barcode ? (
              <>
                <Text style={styles.mainText}>{barcode}</Text>
              </>
            ) : (
              <Button
                title="바코드 인식"
                color="#828b8b"
                onPress={() => setBarcodeScreen(true)}
              />
            )}
          </View>

          <CustomButton
            style={{ marginBottom: 5 }}
            handleOnPress={handleSubmitBtnOnPress}
            btnColor="#202020"
            btnContainerColor="#202020"
            text="제출하기"
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
    backgroundColor: "#fff",
  },
  labelText: {
    fontSize: 18,
    marginBottom: 5,
  },
  mainText: {
    fontSize: 20,
  },
  formContainer: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 50,
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
  },
  formInputContainer: {
    marginBottom: 20,
  },
  title: {
    color: "#202020",
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "500",
    marginBottom: 20,
  },
  input: {
    height: 40,
    // width: 250,
    borderColor: "gray",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    fontSize: 20,
  },
  picker: {
    width: 200,
    height: 44,
    marginTop: 0,
    marginLeft: 20,
    marginRight: 20,
    borderColor: "black",
    alignSelf: "center",
  },
});
