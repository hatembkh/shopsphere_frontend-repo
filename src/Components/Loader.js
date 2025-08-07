

import "./Loader.css";

const Loader = ({ message }) => {
  return (
    <div className="loader-container">
      <div className="end-loader"></div>
      {/* <p className="loader-text">{message}</p> */}
    </div>
  );
};

export default Loader;