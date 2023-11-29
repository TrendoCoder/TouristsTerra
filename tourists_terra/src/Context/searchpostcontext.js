import React, { createContext, useReducer } from "react";

const INITIAL_STATE = {
  userName: undefined,
};
export const SearchPostContext = createContext(INITIAL_STATE);
const SearchPostReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchPostContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchPostReducer, INITIAL_STATE);

  return (
    <SearchPostContext.Provider
      value={{
        userName: state.userName,
        dispatch,
      }}
    >
      {children}
    </SearchPostContext.Provider>
  );
};
