import styled from "@emotion/styled";
import React, { useCallback } from "react";
import { IoCloseSharp } from "react-icons/io5";
import "../../firebase";
import { getDatabase, ref, set, get, serverTimestamp } from "firebase/database";
import { useSelector } from "react-redux";

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

const formateDate = (dateData) => {
  console.log(dateData);
  let hours = dateData.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = dateData.getMinutes() + 1;
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours} : ${minutes}`;
};

const formateDate2 = (dateData, time) => {
  dateData.setMinutes(dateData.getMinutes() + time);
  let hours = dateData.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = dateData.getMinutes() + 1;
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours} : ${minutes}`;
};

function DialogUse({ storeData, dialogRef }) {
  const { user } = useSelector((state) => state);
  const createInUseTicket = useCallback(
    (currentTime) => ({
      timestamp: serverTimestamp(),
      code: storeData?.code,
      num: parseInt(storeData?.remainTime / storeData?.storeTicketTime),
      //date: storeData?.date,
      storeName: storeData?.storeName,
      remainTime: storeData?.remainTime,
      startTime: formateDate(currentTime),
      endTime: formateDate2(currentTime, storeData?.remainTime),
    }),
    [
      storeData?.storeName,
      storeData?.code,
      //storeData?.date,
      storeData?.remainTime,
      storeData?.storeTicketTime,
    ]
  );
  const handleParkingStart = useCallback(async () => {
    if (!storeData) return;
    try {
      const keep = await get(
        ref(getDatabase(), "users/" + user.currentUser.uid + "/inUseTicket")
      );
      if (!keep?.val()) {
        const currentTime = new Date();
        await set(
          ref(getDatabase(), "users/" + user.currentUser.uid + "/inUseTicket"),
          createInUseTicket(currentTime)
        );
      } else {
        alert("이미 사용중인 티켓이 있습니다!");
      }
    } catch (error) {
      console.error(error);
    }
    dialogRef.current.close();
  }, [storeData, user.currentUser?.uid, createInUseTicket, dialogRef]);
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
          {user?.currentUser.displayName}님
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
      <DialogBtn onClick={handleParkingStart}>주차 시작</DialogBtn>
    </Container>
  );
}

export default DialogUse;
