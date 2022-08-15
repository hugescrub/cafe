import React, { useState } from 'react';

const Validate = () => {
  const [requestAccepted, setRequestAccepted] = useState(true);

  const decodedData = window.atob(localStorage.getItem("data").slice(1, -1));  
  const username = decodedData.substring(0, decodedData.indexOf(':'));
  const password = decodedData.substring(decodedData.indexOf(':') + 1, decodedData.length)

  const data = { username, password };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  fetch("http://localhost:8080/auth/login", requestOptions)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.status);
      } else {
        return res.json();
      }
    })
    .then((res) => {
      setRequestAccepted(true)
      console.log(res);
    })
    .catch((error) => {
      setRequestAccepted(false);
      console.log("error: " + error);
    });
    console.log(requestAccepted);
    return requestAccepted;
};

export default Validate;
