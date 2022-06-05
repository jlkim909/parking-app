import styled from "@emotion/styled";
import React from "react";
import { useRecoilValue } from "recoil";
import { AppInfomation } from "../../../store/store";
import PayItem from "./PayItem";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 4%;
  height: 78%;
  overflow-y: scroll;
`;

function Paycheck() {
  const data = useRecoilValue(AppInfomation);
  const giftData = data.usersInfo[0]["paycheck"];
  return (
    <Container>
      {giftData.map((value, index) => (
        <PayItem data={value} key={index} />
      ))}
    </Container>
  );
}

export default Paycheck;
