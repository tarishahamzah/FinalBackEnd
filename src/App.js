import React from "react";
import Routes from "./config/Routes/";
import "./App.css";
import Footer from "./components/molecules/Footer"

const App = () => {
  return (
    <div className="page-container">
      <div className="content-wrapper">
          <Routes />
      </div>
      <Footer />
    </div>

  );
};

export default App;
