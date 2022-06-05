import styled from "@emotion/styled";
import React from "react";
import giftTicket from "../../../image/giftTicket.png";
import { AiOutlineGift } from "react-icons/ai";

const Container = styled.div`
  width: 90%;
  min-height: 20%;
  display: flex;
  flex-direction: column;
  align-items: end;
`;
const GiftImg = styled.div`
  display: flex;
  background-image: url(${giftTicket});
  background-size: 100% 100%;
  width: 100%;
  height: 84%;
`;
const ConfirmBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ece6cc;
  width: 16%;
  height: 80%;
  margin-top: 2.5%;
  margin-left: 10%;
  border-radius: 8px;
  color: #404040;
  font-size: 1.75rem;
  box-shadow: 2px 2px 4px gray;
`;
function GiftItem({ data }) {
  return (
    <Container>
      <GiftImg>
        <div className="flex flex-col font-bold items-end justify-center text-[#404040] mt-4 w-[36%]">
          <span style={{ fontSize: "0.75rem" }}>{data?.storeName}</span>
          <span>{data?.time}분</span>
        </div>
        <div className="flex flex-col font-bold items-end justify-between text-[#707070] h-[80%] mt-1 ml-4">
          <span style={{ fontSize: "0.5rem" }}>from. {data?.sender}님</span>
          <span>X</span>
        </div>
        <span
          style={{
            fontSize: "2rem",
            color: "#404040",
            marginTop: "10%",
            marginLeft: "2%",
          }}
        >
          {data?.num}
        </span>
        <ConfirmBtn>
          <AiOutlineGift />
        </ConfirmBtn>
      </GiftImg>
      <span style={{ fontSize: "0.5rem", marginRight: "4%", marginTop: "-2%" }}>
        {data?.date}
      </span>
    </Container>
  );
}

export default GiftItem;
