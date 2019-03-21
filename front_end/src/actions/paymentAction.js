import GET_INDIVIDUAL_HOTEL from "./types";
import BOOK_ROOM from "./types";

function getHotelInfo(index) {
  return {
    type: GET_INDIVIDUAL_HOTEL,
    index
  };
}

function bookRoom(index) {
  return {
    type: BOOK_ROOM,
    index
  };
}
