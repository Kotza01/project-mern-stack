import { FETCHAll, FETCHSEND } from "../types";

const reducer = (state = [], action) => {
  switch (action.type) {
    case FETCHAll:
      return action.payload;
    case FETCHSEND:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default reducer;