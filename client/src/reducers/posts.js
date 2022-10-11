import { FETCHAll, FETCHDELETE, FETCHSEND, FETCHUPDATE } from "../types";

/**Actions to update the state are done here
 *
 */
const reducer = (state = [], action) => {
  switch (action.type) {
    /**Push all data from server in the state */
    case FETCHAll:
      return action.payload;
    /**Add new Post to the server*/
    case FETCHSEND:
      return [...state, action.payload];
    /**Update one post in the server and in the state */
    case FETCHUPDATE:
      return state.map((el) =>
        el._id === action.payload._id ? action.payload : el
      );
    /**Delete one post in the server and in the state */
    case FETCHDELETE:
      return state.filter((el) => el._id === action.payload);
    default:
      return state;
  }
};

export default reducer;
