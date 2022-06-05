import styled from "@emotion/styled";
import React from "react";
import { useRecoilValue } from "recoil";
import { AppInfomation } from "../../../store/store";
import GiftItem from "./GiftItem";

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

function GiftBox() {
  const data = useRecoilValue(AppInfomation);
  const giftData = data.usersInfo[0]["gift"];
  return (
    <Container>
      {giftData.map((value, index) => (
        <GiftItem data={value} key={index} />
      ))}
    </Container>
  );
}

export default GiftBox;
