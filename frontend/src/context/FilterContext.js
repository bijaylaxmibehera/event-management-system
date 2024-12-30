import { createContext, useReducer } from "react";

export const FilterContext = createContext();

const initialState = {
  searchTerm: "",
  selectedCategory: "All",
  sortOrder: "asc",
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    case "SET_SORT_ORDER":
      return { ...state, sortOrder: action.payload };
    case "RESET_FILTERS":
      return initialState;
    default:
      return state;
  }
};

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};
