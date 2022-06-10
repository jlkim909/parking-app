import styled from "@emotion/styled";
import React, { useState } from "react";
import BottomMenu from "../components/Proprietor/BottomMenu";
import Home from "../components/Proprietor/Home/Home";
import My from "../components/Proprietor/My/My";
import QR from "../components/Proprietor/QR/QR";
import TopMenu from "../components/User/TopMenu";

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
`;

function Propriertor() {
  const [page, setPage] = useState("HOME");
  return (
    <Container>
      <TopMenu page={page} handlePage={setPage} />
      {page === "MY" ? <My /> : page === "QR" ? <QR /> : <Home />}
      <BottomMenu page={page} handlePage={setPage} />
    </Container>
  );
}

export default Propriertor;
