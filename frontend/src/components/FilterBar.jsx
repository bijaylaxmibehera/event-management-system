import React, { useContext } from "react";
import { FilterContext, EventContext } from "../";

export const FilterBar = () => {
  const { state, dispatch } = useContext(FilterContext);
  const { categories } = useContext(EventContext);

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row md:justify-around items-center gap-4">
        {/* Category Filter */}
        <select
          className="p-2 border border-gray-300 rounded-md w-full md:w-1/3"
          value={state.selectedCategory}
          onChange={(e) =>
            dispatch({ type: "SET_CATEGORY", payload: e.target.value })
          }
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Sort Order */}
        <div className="flex flex-col md:flex-row gap-2 items-center md:items-start">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sortOrder"
              value="asc"
              checked={state.sortOrder === "asc"}
              onChange={() =>
                dispatch({ type: "SET_SORT_ORDER", payload: "asc" })
              }
              className="form-radio"
            />
            Ascending
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sortOrder"
              value="desc"
              checked={state.sortOrder === "desc"}
              onChange={() =>
                dispatch({ type: "SET_SORT_ORDER", payload: "desc" })
              }
              className="form-radio"
            />
            Descending
          </label>
        </div>
      </div>
    </div>
  );
};
