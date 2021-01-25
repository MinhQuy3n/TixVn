import { CHECK_OUT, UN_CHECK_OUT } from "../../util/setting/config";

let initialState = {
  seatList: [],
  isBooking: false,
};
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHECK_OUT: {
      const cloneSeatBooking = [...state.seatList];
      cloneSeatBooking.push(payload);
      return { ...state, seatList: cloneSeatBooking, isBooking: true };
    }
    case UN_CHECK_OUT: {
      const indexSeatList = state.seatList.findIndex(
        (seat) => seat.maGhe === payload.maGhe
      );

      const cloneSeatBooking = [...state.seatList];
      cloneSeatBooking.splice(indexSeatList, 1);
      let cloneIsBooking = true;

      if (cloneSeatBooking.length === 0) {
        cloneIsBooking = false;
      }

      return {
        ...state,
        seatList: cloneSeatBooking,
        isBooking: cloneIsBooking,
      };
    }
    default:
      return state;
  }
};
export default reducer;
