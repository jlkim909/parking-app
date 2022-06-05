import React from "react";
import { IoGiftOutline, IoCloseSharp } from "react-icons/io5";
import styled from "@emotion/styled";
import Ticket from "../User/Home/Ticket";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 15%;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 65%;
`;

const TextContainer = styled.div`
  display: flex;
  color: #707070;
  font-weight: bold;
  font-size: 1.1rem;
  justify-content: space-between;
  align-items: center;
  padding: 4%;
  width: 100%;
`;

const DialogBtn = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ece6cc;
  font-weight: bold;
  font-size: 1.2rem;
`;

function DialogShare({ storeData, dialogRef }) {
  return (
    <Container>
      <Header>
        <IoGiftOutline className="text-2xl" />
        <IoCloseSharp
          className="text-2xl"
          onClick={() => dialogRef.current.close()}
        />
      </Header>
      <Body>
        <TextContainer>
          <Ticket category={storeData?.code} size={50} />
          <span style={{ fontSize: "1rem" }}>{storeData?.storeName}</span>
        </TextContainer>
        <TextContainer>
          <p>대상 ID</p>
          <input className="w-[60%] h-[150%] border-[#ECE6CC] border-2 text-center font-bold" />
        </TextContainer>
        <TextContainer>
          <p>사용티켓</p>
          <select className="border-[#ECE6CC] border-2 w-[30%] ">
            <option>1개</option>
            <option>2개</option>
            <option>3개</option>
          </select>
        </TextContainer>
      </Body>
      <DialogBtn>선물 하기</DialogBtn>
    </Container>
  );
}

export default DialogShare;
