import React from "react";

const form = document.getElementsByClassName("form");
const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");
const passwordcm = document.getElementById("passwordcm");

form.addEventListener("click", (e) => {
  e.preventDefault();

  validate();
});

function validate() {
  const email_way = /^[^\s@]+@[^\s@]+\[^\s@]{2,6}$/;
  const password_way = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{7,}$/;

  if (username === "") {
    setErrorFor(username, "empty");
  }
  if (email === "") {
    setErrorFor(email, "empty");
  } else if (!email_way.test(email)) {
    setErrorFor(email, "Enter correct email");
  }
  if (password === "") {
    setErrorFor(password, "Enter password");
  } else if (!password_way.test(password)) {
    setErrorFor(password, "Enter correct password");
  } else if (password !== "") {
    if (passwordcm != password) {
      setErrorFor(passwordcm, "Enter correct");
    }
  }

  function setErrorFor(input, message) {
    const inputContainer = input.parentElement;
    const small = inputContainer.querySelector("small");
    inputContainer.className = "inputContainer_error";
    small.innerText = message;
  }

  function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
  }
  console.log("hello");
}
