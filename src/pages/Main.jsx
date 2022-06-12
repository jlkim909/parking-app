import React from "react";
import { useSelector } from "react-redux";
import Proprietor from "./Proprietor";
import User from "./User";

function Main() {
  const { mode } = useSelector((state) => state.user);
  if (mode === "CLIENT") {
    return <User />;
  } else {
    return <Proprietor />;
  }
}

export default Main;
