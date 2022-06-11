import styled from "@emotion/styled";
import React from "react";
import { IoTimerOutline } from "react-icons/io5";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 20vh;
  padding: 4%;
  background-color: white;
  border: 2vw solid #ece6cc;
  box-shadow: 2px 2px 4px lightgray;
  font-weight: bold;
  color: #505050;
`;

function CurrentTicketItem() {
  return (
    <Container>
      <div className="flex w-[100%] h-[30%] justify-between">
        <span>이름 : 나종현</span>
        <div className="flex flex-col text-[0.5rem]">
          <span>이용 시작 시간 12 : 30</span>
          <span>이용 시작 시간 13 : 30</span>
        </div>
      </div>
      <div className="flex h-[30%]">
        <span>차량 번호 : 12가 1234</span>
      </div>
      <div className="flex h-[20%]">
        <span>연락처 : 010-2912-1234</span>
      </div>
      <div className="flex justify-end items-center h-[20%]">
        <IoTimerOutline className="text-2xl" />
        <span>30분</span>
      </div>
    </Container>
  );
}

export default CurrentTicketItem;
