export const SearchBox = () => {
  return (
    <>
      <div className="relative w-1/2">
        <input
          type="text"
          placeholder="Search..."
          className="w-full py-2 pl-4 pr-10 rounded-lg focus:outline-cool-gray"
        />
        <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-tekhelet">
          <i className="fas fa-search"></i>
        </span>
      </div>
    </>
  );
};
