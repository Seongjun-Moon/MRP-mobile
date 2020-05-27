const url = "70.12.113.182:9090";

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

const sendInfo = (data) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  };

  console.log(fetchOptions);
  fetch(`http://${url}/oversee/search`, fetchOptions)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};
export default { signin, sendInfo };
