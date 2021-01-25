import { domain } from "../../util/setting/config";
import request from "../../util/setting/request";

export const BookTicket = (contentCheckOut) => {


  request(`${domain}/api/QuanLyDatVe/DatVe`, "POST", contentCheckOut)
    .then((res) => {})
    .catch((err) => {});
};
