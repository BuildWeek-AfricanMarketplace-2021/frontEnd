import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: "https://ptierie-africanmarketplace.herokuapp.com/",
    headers: {
      Authorization: token,
    },
  });
};
export default axiosWithAuth;
