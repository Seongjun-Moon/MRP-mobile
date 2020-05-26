const signin = (email, password) => {
  const url = "70.12.113.182:9090";
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: email, pw: password }),
  };

  console.log(fetchOptions);
  fetch(`http://${url}/user/signIn`, fetchOptions)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.companyType === null
        ? alert(data.companyType)
        : alert("❗️로그인에 실패했습니다.");
    });
};

export default { signin };
