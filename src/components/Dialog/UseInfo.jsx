import styled from "@emotion/styled";
import React from "react";
import { IoCloseSharp } from "react-icons/io5";

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

function DialogUse({ storeData, dialogRef }) {
  return (
    <Container>
      <Header>
        <span
          style={{
            color: "#505050",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          유민국님
        </span>
        <IoCloseSharp
          className="text-2xl"
          onClick={() => dialogRef.current.close()}
        />
      </Header>
      <Body>
        <TextContainer>
          <p>연락처</p>
          <span>010 - 4992 - 4193</span>
        </TextContainer>
        <TextContainer>
          <p>차량번호</p>
          <input className="w-[50%] h-[200%] border-[#ECE6CC] border-2 text-center font-bold ml-4" />
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
      <DialogBtn>주차 시작</DialogBtn>
    </Container>
  );
}

export default DialogUse;
