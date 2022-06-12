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
  border: 2px solid #ece6cc;
  box-shadow: 2px 2px 4px lightgray;
  font-weight: bold;
  color: #505050;
`;

const formateDate = (millisecond) => {
  const tempTime = new Date(millisecond);
  let hours = tempTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = tempTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours} : ${minutes}`;
};

function CurrentTicketItem({ data }) {
  return (
    <Container>
      <div className="flex w-[100%] h-[30%] justify-between">
        <span>{`이름 : ${data?.userName}`}</span>
        <div className="flex flex-col text-[0.5rem]">
          <span>{`이용 시작 시간 ${formateDate(data?.timestamp)}`}</span>
          <span>{`이용 시작 시간 ${formateDate(
            data?.timestamp + data?.remainTime * 60000
          )}`}</span>
        </div>
      </div>
      <div className="flex h-[30%]">
        <span>{`차량번호 : ${data?.userCarNum}`}</span>
      </div>
      <div className="flex h-[20%]">
        <span>{`연락처 : ${data?.userPhoneNum}`}</span>
      </div>
      <div className="flex justify-end items-center h-[20%]">
        <IoTimerOutline className="text-2xl" />
        <span>{`${data?.remainTime}분`}</span>
      </div>
    </Container>
  );
}

export default CurrentTicketItem;
