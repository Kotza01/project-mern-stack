import {
  FETCHAll,
  FETCHDELETE,
  FETCHENDLOADING,
  FETCHGETONE,
  FETCHSEND,
  FETCHSTARTLOADING,
  FETCHUPDATE,
  FETCH_BY_SEARCH,
} from "../types";

const initialState = {
  posts: [],
  post: false,
  currentPage: 1,
  totalPages: 1,
  send: {},
  isLoading: true,
};

/**Actions to update the state are done here
 *
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    /**Push all data from server in the state */
    case FETCHAll:
      return {
        ...state,
        posts: action.payload.posts,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };
    case FETCHGETONE:
      return { ...state, post: action.payload };
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload };
    /**Add new Post to the server*/
    case FETCHSEND:
      return { ...state, send: action.payload };
    /**Update one post in the server and in the state */
    case FETCHUPDATE:
      return {
        ...state,
        posts: state.posts.map((el) =>
          el._id === action.payload._id ? action.payload : el
        ),
      };
    /**Delete one post in the server and in the state */
    case FETCHDELETE:
      return {
        ...state,
        posts: state.posts.filter((el) => el._id === action.payload),
      };
    case FETCHSTARTLOADING:
      return { ...state, isLoading: true };
    case FETCHENDLOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default reducer;
