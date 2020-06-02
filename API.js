const url = "70.12.113.180:9090";

const signin = (email, password) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: email, pw: password }),
  };
  return fetch(`http://${url}/user/signIn`, fetchOptions)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
      // data.companyType === null
      //   ? alert(data.companyType)
      //   : alert("❗️로그인에 실패했습니다.");
    });
};

const sendDistInfo = (data) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  };

  console.log(fetchOptions.body);
  fetch(`http://${url}/distributor/productEnroll`, fetchOptions)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
      // 여기 지금 data 리턴 undefined로 옴
    });
};

const searchCompanybyName = (keyword) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ keyword }),
  };

  fetch(`http://${url}/company/searchCompanyByName`, fetchOptions)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
      // 여기 지금 data 리턴 undefined로 옴
    });
};
export default { signin, sendDistInfo };
