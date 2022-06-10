import React from "react";
import { useSelector } from "react-redux";
import JoinProprietor from "./JoinProprietor";
import JoinUser from "./JoinUser";

function Join() {
  const { mode } = useSelector((state) => state.user);
  if (mode === "user") {
    return <JoinUser />;
  } else {
    return <JoinProprietor />;
  }
}

export default Join;
