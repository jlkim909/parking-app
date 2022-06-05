import styled from "@emotion/styled";
import React from "react";
import { MdPortrait } from "react-icons/md";
import { AiOutlineGift } from "react-icons/ai";
import {
  IoReceiptOutline,
  IoLogOutOutline,
  IoTimerOutline,
} from "react-icons/io5";
import Ticket from "../Home/Ticket";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 78%;
  overflow: hidden;
`;
const UserInfoConatainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 92%;
  height: 28%;
  background-color: white;
  box-shadow: 2px 2px 4px lightgray;
`;

const TicketInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 92%;
  height: 68%;
  background-color: white;
  padding: 1.25rem;
  font-size: 1.5rem;
  box-shadow: 2px 2px 4px lightgray;
`;

const EndButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ece6cc;
  border-radius: 8px;
  width: 60%;
  height: 16%;
  font-size: 0.875rem;
  color: #707070;
  font-weight: bold;
  box-shadow: 2px 2px 4px lightgray;
`;

function InUse({ handlePage }) {
  return (
    <Container>
      <UserInfoConatainer>
        <div className="flex mt-4 ml-5 gap-2">
          <MdPortrait className="text-5xl text-[#9e9e9e]" />
          <span className="font-bold text-xl mt-4">OOO 님</span>
        </div>
        <div className="flex justify-evenly mt-9 gap-12">
          <div
            className="flex flex-col items-center justify-center"
            onClick={() => handlePage("GIFT")}
          >
            <AiOutlineGift className="text-3xl" />
            <span className="text-xs font-bold mt-1 text-[#707070]">
              선물함
            </span>
          </div>
          <div
            className="flex flex-col items-center justify-center"
            onClick={() => handlePage("PAYCHECK")}
          >
            <IoReceiptOutline className="text-3xl" />
            <span className="text-xs font-bold mt-1 text-[#707070]">
              이용내역
            </span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <IoLogOutOutline className="text-3xl" />
            <span className="text-xs font-bold mt-1 text-[#707070]">
              로그아웃
            </span>
          </div>
        </div>
      </UserInfoConatainer>
      <TicketInfoContainer>
        <div className="flex gap-4 items-center w-[80%] h-[20%]">
          <Ticket category="MT1" size={50} />
          <span className="font-bold text-[#363636] mt-2">E-마트</span>
        </div>
        <div className="flex text-[#707070] font-bold items-center justify-between w-[85%] h-[20%]">
          <span className="text-base">이용 시작 시간</span>
          <span>12 : 05</span>
        </div>
        <div className="flex text-[#707070] font-bold items-center justify-between w-[85%]">
          <span className="text-base">이용 종료 시간</span>
          <span>15 : 04</span>
        </div>
        <div className="flex items-center w-[85%] h-[30%] justify-end">
          <IoTimerOutline className="text-[1.5rem]" />
          <span className="font-bold ml-2">59분</span>
        </div>
        <EndButton>사용 종료</EndButton>
      </TicketInfoContainer>
    </Container>
  );
}

export default InUse;
