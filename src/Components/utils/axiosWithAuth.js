// import axios from "axios";

// export const axiosWithAuth = () => {
//   const token = localStorage.getItem("token");

//   return axios.create({
//     baseURL: "https://ptierie-africanmarketplace.herokuapp.com",
//     headers: {
//       Authorization: token,
//     },
//   });
// };
// export default axiosWithAuth;

import axios from "axios";

const axiosWithAuth = () => {
  const token = window.localStorage.getItem("token");
  return axios.create({
    headers: {
      Authorization: `bearer ${token}`,
    },
    baseURL: "https://ptierie-africanmarketplace.herokuapp.com/",
  });
};
export default axiosWithAuth;
