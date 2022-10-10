import { FETCHAll } from "../types";

const reducer = (state = [], action) => {
  switch (action.type) {
    case FETCHAll:
      return action.payload;

    default:
      return state;
  }
};

export default reducer;
