import styled from "@emotion/styled";
import React from "react";
import { IoShareOutline, IoCloseSharp, IoTimerOutline } from "react-icons/io5";
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

const DialogBtn = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #50accb;
  font-weight: bold;
  font-size: 1.2rem;
  color: white;
`;

function DialogTicket({ storeData, dialogRef, page }) {
  return (
    <Container>
      <Header>
        <IoShareOutline className="text-2xl" onClick={page("SHARE")} />
        <p className="text-base font-bold">{storeData?.storeName}</p>
        <IoCloseSharp
          className="text-2xl"
          onClick={() => dialogRef.current.close()}
        />
      </Header>
      <Body>
        <span className="font-bold mt-[-10%]">영업시간 10 : 00 ~ 22 : 00</span>
        <Ticket category={storeData?.code} size={80} />
        <div className="flex items-center font-bold w-[90%]">
          <IoTimerOutline className="text-3xl" />
          <span className="text-xl ml-1">30분</span>
          <span className="text-[#505050] text-3xl ml-[40%] mt-[-30%]">
            x 3
          </span>
        </div>
      </Body>
      <DialogBtn onClick={page("USE")}>사용하기</DialogBtn>
    </Container>
  );
}

export default DialogTicket;
