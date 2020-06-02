import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import API from "../API";
import CustomButton from "./custom-button";

export default function CompanySearch(props) {
  const [keyword, setKeyword] = useState("");
  const [companyList, setCompanyList] = useState(null);

  const handleSearchSubmit = async () => {
    const data = await API.searchCompanybyName(keyword);
    console.log(data.companyInfo);
    setCompanyList(data.companyInfo);
  };

  const handleTargetCompanyCodeSubmit = (code) => {
    props.setTargetCompanyCode(code);
    props.setCompanySearch(false);
  };

  return (
    <View style={styles.container}>
      {companyList ? (
        <ScrollView style={styles.companyList}>
          <Text style={styles.labelText}>'{keyword}' 업체명 검색 결과</Text>

          {companyList.map((company) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  handleTargetCompanyCodeSubmit(company.companyCode)
                }
              >
                <Text style={styles.companyLi}>
                  {company.companyName}: {company.companyCode}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <>
          <Text style={styles.labelText}>업체명 검색</Text>

          <TextInput
            style={styles.input}
            onChangeText={(text) => setKeyword(text)}
            placeholder="업체 키워드를 입력하세요"
            value={keyword}
          />
          <CustomButton
            style={{ marginBottom: 5 }}
            handleOnPress={handleSearchSubmit}
            btnColor="#0B4141"
            btnContainerColor="#0B4141"
            text="검색"
          />
        </>
      )}

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
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "600",
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
  companyLi: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "rgba(52, 52, 52, 0.1)",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
