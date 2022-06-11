import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";
import { MdPortrait } from "react-icons/md";
import { AiOutlineGift } from "react-icons/ai";
import {
  IoReceiptOutline,
  IoLogOutOutline,
  IoTimerOutline,
} from "react-icons/io5";
import Ticket from "../Home/Ticket";
import "../../../firebase";
import { getAuth, signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import {
  get,
  set,
  ref,
  getDatabase,
  remove,
  serverTimestamp,
} from "firebase/database";

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

function InUse({ handlePage }) {
  const { user } = useSelector((state) => state);
  const [inUseTicket, setInUseTicket] = useState();

  const createUsedTicket = useCallback(
    () => ({
      timestamp: serverTimestamp(),
      code: inUseTicket?.code,
      num: inUseTicket?.num,
      storeName: inUseTicket?.storeName,
      remainTime: inUseTicket?.remainTime,
    }),
    [
      inUseTicket?.storeName,
      inUseTicket?.num,
      inUseTicket?.code,
      inUseTicket?.remainTime,
    ]
  );
  const handleLogout = useCallback(async () => {
    await signOut(getAuth());
  }, []);

  const handleEndTicket = useCallback(async () => {
    if (!inUseTicket) return;
    try {
      await set(
        ref(
          getDatabase(),
          "users/" +
            user.currentUser.uid +
            "/usedTicket/" +
            inUseTicket?.storeName
        ),
        createUsedTicket()
      );
      await remove(
        ref(getDatabase(), "users/" + user.currentUser.uid + "/inUseTicket")
      );
      setInUseTicket();
    } catch (error) {
      console.error(error);
    }
  }, [inUseTicket, user.currentUser.uid, createUsedTicket]);

  useEffect(() => {
    if (!user.currentUser) return;
    async function getTicket() {
      const snapShot = await get(
        ref(getDatabase(), "users/" + user.currentUser.uid + "/inUseTicket")
      );
      if (!!snapShot.val()) {
        setInUseTicket(snapShot.val() ? snapShot.val() : null);
      }
    }
    getTicket();
    return () => {
      setInUseTicket();
    };
  }, [user.currentUser]);

  return (
    <Container>
      <UserInfoConatainer>
        <div className="flex mt-4 ml-5 gap-2">
          <MdPortrait className="text-5xl text-[#9e9e9e]" />
          <span className="font-bold text-xl mt-4">{`${user?.currentUser.displayName}님`}</span>
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
          <div
            className="flex flex-col items-center justify-center"
            onClick={handleLogout}
          >
            <IoLogOutOutline className="text-3xl" />
            <span className="text-xs font-bold mt-1 text-[#707070]">
              로그아웃
            </span>
          </div>
        </div>
      </UserInfoConatainer>
      <TicketInfoContainer>
        {inUseTicket ? (
          <>
            <div className="flex gap-4 items-center w-[80%] h-[20%]">
              <Ticket category={inUseTicket.code} size={50} />
              <span className="font-bold text-[#363636] mt-2">
                {inUseTicket.storeName}
              </span>
            </div>
            <div className="flex text-[#707070] font-bold items-center justify-between w-[85%] h-[20%]">
              <span className="text-base">이용 시작 시간</span>
              <span>{formateDate(inUseTicket?.timestamp)}</span>
            </div>
            <div className="flex text-[#707070] font-bold items-center justify-between w-[85%]">
              <span className="text-base">이용 종료 시간</span>
              <span>
                {formateDate(
                  inUseTicket?.timestamp + inUseTicket.remainTime * 60000
                )}
              </span>
            </div>
            <div className="flex items-center w-[85%] h-[30%] justify-between">
              <span>{inUseTicket?.carNum}</span>
              <div className="flex items-center">
                <IoTimerOutline className="text-[1.5rem]" />
                <span className="font-bold ml-2">
                  {inUseTicket?.remainTime}분
                </span>
              </div>
            </div>
            <EndButton onClick={handleEndTicket}>사용 종료</EndButton>
          </>
        ) : (
          <div>
            <span>사용중인 티켓이 없습니다.!</span>
          </div>
        )}
      </TicketInfoContainer>
    </Container>
  );
}

export default InUse;
