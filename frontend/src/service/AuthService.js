import axios from "axios";

export const loginService = async (email, password) =>
  await axios.post("http://localhost:3000/api/v1/auth/login", {
    email: email,
    password: password,
  });
export const signUpService = async (name,email, password) =>
  await axios.post("http://localhost:3000/api/v1/auth/register", {
    name:name,
    email: email,
    password: password,
  });
