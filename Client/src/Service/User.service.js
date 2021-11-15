import axios from "./axios";
const internPath = "/intern";
const userPath = "/user";
export const Intern = {
  Login: async ({ userName, password }) => {
    try {
      return await axios.post(`${internPath}/signin`, {
        userName: userName,
        password: password,
      });
    } catch (e) {
      console.log(e);
    }
  },
  SignUp: async (args) => {
    try {
      return await axios.post(`${internPath}/signup`, args);
    } catch (e) {
      console.log(e);
    }
  },
};
export const User = {
  Info: async () => {
    return await axios.get(`${userPath}/info`);
  },
};
