import React from "react";

export default function validate(values) {
  const errors = {};

  const email_way = /^[^\s@]+@[^\s@]+\[^\s@]{2,6}$/;
  const password_way = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{7,}$/;

  if (values.username === "") {
    errors.username = "Enter Username";
  }
  if (values.email === "") {
    errors.email = "Enter Email";
  } else if (!email_way.test(values.email)) {
    errors.email = "Enter correct Email";
  }
  if (values.password === "") {
    errors.password = "Enter Email";
  } else if (!password_way.test(values.password)) {
    errors.email = "Enter correct Email";
  }
  if (values.confirm_password != values.password) {
    errors.email = "Enter same password";
  }

  return errors;
}
