import styled from "@emotion/styled";
import React, { useState } from "react";
import ParkinglotMap from "./Map/ParkinglotMap";
import BottomMenu from "./BottomMenu";
import Home from "./Home/Home";
import TopMenu from "./TopMenu";
import InUse from "./Used/InUse";
import GiftBox from "./Used/GiftBox";
import Paycheck from "./Used/Paycheck";
import QR from "./QR/QR";

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
`;

function User() {
  const [page, setPage] = useState("HOME");
  return (
    <Container>
      <TopMenu page={page} handlePage={setPage} />
      {page === "INUSE" ? (
        <InUse handlePage={setPage} />
      ) : page === "MAP" ? (
        <ParkinglotMap />
      ) : page === "QR" ? (
        <QR />
      ) : page === "GIFT" ? (
        <GiftBox />
      ) : page === "PAYCHECK" ? (
        <Paycheck />
      ) : (
        <Home />
      )}
      <BottomMenu page={page} handlePage={setPage} />
    </Container>
  );
}

export default User;
