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
import CompanySearch from "./company-search";

export default function Form(props) {
  const [stateValue, setStateValue] = useState("");
  const [barcodeScreen, setBarcodeScreen] = useState(false);
  const [barcode, setBarcode] = useState(null);
  const [companySearch, setCompanySearch] = useState(false);
  const [targetCompanyCode, setTargetCompanyCode] = useState(null);

  const handleSubmitBtnOnPress = () => {
    if (barcode && targetCompanyCode && stateValue) {
      Alert.alert(
        "유통 내역",
        `업체 코드: ${
          props.companyCode
        },\n 대상 업체 코드: ${targetCompanyCode},\n 바코드: ${barcode},\n 입/출고 여부: ${
          stateValue === "input" ? "입고" : "출고"
        } \n\n 제출하시겠습니까?`,
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
    return await API.sendDistInfo({
      companyCode: props.companyCode,
      targetCompanyCode: targetCompanyCode,
      barcode: barcode,
      state: stateValue,
    }).then((data) => {
      if (data.message) {
        alert("정상적으로 제출되었습니다.");
        setBarcode(null);
      } else {
        alert("제출 과정에서 오류가 발생했습니다. \n 다시 확인해주세요.");
      }
    });
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

          {companySearch ? (
            <CompanySearch
              setCompanySearch={setCompanySearch}
              setTargetCompanyCode={setTargetCompanyCode}
            />
          ) : (
            <>
              <View style={styles.formInputContainer}>
                <Text style={styles.labelText}>업체코드</Text>
                <Text style={styles.mainText}>{props.companyCode}</Text>
              </View>

              {targetCompanyCode ? (
                <View style={styles.formInputContainer}>
                  <Text style={styles.labelText}>상대 업체코드</Text>
                  <Text style={styles.mainText}>{targetCompanyCode}</Text>
                  <Button
                    title="업체명 재검색"
                    color="#828b8b"
                    onPress={() => setCompanySearch(true)}
                  />
                </View>
              ) : (
                <View style={styles.formInputContainer}>
                  <Button
                    title="상대 업체명 검색"
                    color="#828b8b"
                    onPress={() => setCompanySearch(true)}
                  />
                </View>
              )}

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
                    <Button
                      title="바코드 다시 찍기"
                      color="#828b8b"
                      onPress={() => setBarcodeScreen(true)}
                    />
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
                btnColor="#0B4141"
                btnContainerColor="#0B4141"
                text="제출하기"
              />
              <Button onPress={() => props.setLogin(false)} title="로그아웃" />
            </>
          )}
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
    fontSize: 18,
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
