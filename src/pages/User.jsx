import styled from "@emotion/styled";
import React, { useState } from "react";
import ParkinglotMap from "../components/User/Map/ParkinglotMap";
import BottomMenu from "../components/User/BottomMenu";
import Home from "../components/User/Home/Home";
import TopMenu from "../components/User/TopMenu";
import InUse from "../components/User/Used/InUse";
import GiftBox from "../components/User/Used/GiftBox";
import Paycheck from "../components/User/Used/Paycheck";
import QR from "../components/User/QR/QR";

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
        <QR handlePage={setPage} />
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
