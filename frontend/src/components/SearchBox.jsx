import {useContext} from "react";
import { FilterContext } from "../";
import { useNavigate } from "react-router";

export const SearchBox = () => {
  const {state,dispatch}=useContext(FilterContext);
  const navigate=useNavigate();
  return (
    <>
      <div className="relative w-1/2">
        <input
          type="text"
          placeholder="Search events"
          className="w-full py-2 pl-4 pr-10 rounded-lg focus:outline-cool-gray"
          value={state.searchTerm}
          onChange={(e) =>
            dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value })
          }
          onClick={()=>navigate("/events")}
        />
        <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-tekhelet">
          <i className="fas fa-search"></i>
        </span>
      </div>
    </>
  );
};
