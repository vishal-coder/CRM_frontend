import React from "react";
import "./css/home.css";
import Header from "./Header";
import Posts from "./Posts";
import Sidebar from "./Sidebar";

function Home() {
  return (
    <>
      <Header />
      <div className="home">
        <Posts />
        <Sidebar />
      </div>
    </>
  );
}

export default Home;
