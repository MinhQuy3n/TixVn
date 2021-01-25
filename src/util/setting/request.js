import Axios from "axios";
const request = (url = "", method = "", data = {}) => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
 
  return Axios({
    url: url,
    method: method,
    data: data,
    ...config,
  });
};
export default request;
