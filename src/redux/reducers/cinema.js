import {
  GET_CINEMA,
  GET_INFO_CINEMA,
  GET_LIST_TICKET_ROOM,
} from "../../util/setting/config";

let initialState = {
  cinemaList: [],
  infoCinema: [],
  listTicketRoom: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CINEMA: {
      state.cinemaList = payload;
      return { ...state };
    }
    case GET_INFO_CINEMA: {
      state.infoCinema = payload;
      return { ...state };
    }
    case GET_LIST_TICKET_ROOM: {
      state.listTicketRoom = payload;
      return { ...state };
    }
    default:
      return state;
  }
};

export default reducer;
