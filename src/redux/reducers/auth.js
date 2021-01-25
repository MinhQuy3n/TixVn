import {
  ADD_USER,
  ADMIN_SET_TOKEN,
  DELETE_USER,
  GET_LIST_USER,
  INFO_USER,
  LOG_OUT,
  SET_TOKEN,
} from "../../util/setting/config";

let initialState = {
  token: "",
  adminToken: "",
  userInfo: {},
  userList: [],
};
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_TOKEN: {
      return { ...state, token: payload.accessToken, userInfo: payload };
    }
    case LOG_OUT: {
      return { ...state, userInfo: payload };
    }
    case GET_LIST_USER: {
      return { ...state, userList: payload };
    }
    case INFO_USER: {
      return { ...state, userInfo: payload };
    }
    case DELETE_USER: {
      const indexUserList = state.userList.findIndex(
        (user) => user.taiKhoan === payload
      );
      const cloneUserList = [...state.userList];

      cloneUserList.splice(indexUserList, 1);

      return { ...state, userList: cloneUserList };
    }
    case ADD_USER: {
      state.userList.push(payload);
      return { ...state };
    }
    case ADMIN_SET_TOKEN: {
      return { ...state, adminToken: payload };
    }
    default:
      return state;
  }
};
export default reducer;
