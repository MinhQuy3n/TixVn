import {
  GET_DETAIL_FILM,
  GET_FILM_SHOW_TIME,
  GET_LIST_FILM,
} from "../../util/setting/config";

let initialState = {
  listFilm: [],
  detailFilm: [],
  showTimes: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_LIST_FILM: {
      return { ...state, listFilm: payload };
    }
    case GET_DETAIL_FILM: {
      return { ...state, detailFilm: payload };
    }
    case GET_FILM_SHOW_TIME: {
      return { ...state, showTimes: payload };
    }

    default:
      return state;
  }
};
export default reducer;
