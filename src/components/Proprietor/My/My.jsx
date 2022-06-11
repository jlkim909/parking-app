import styled from "@emotion/styled";
import { getAuth, signOut } from "firebase/auth";
import React, { useCallback, useEffect } from "react";
import {
  IoLogOutOutline,
  IoTimerOutline,
  IoInformationCircleSharp,
} from "react-icons/io5";
import { BsDoorOpen } from "react-icons/bs";
import { MdPortrait } from "react-icons/md";
import { CategoryIcon } from "../SearchStore";
import Ticket from "../../User/Home/Ticket";
import { useSelector } from "react-redux";
import "../../../firebase";
import { get, ref, getDatabase } from "firebase/database";
import { useState } from "react";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 78%;
`;

const UserInfoConatainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 92%;
  height: 16%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 2px 2px 4px lightgray;
`;

const TicketInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 92%;
  height: 72%;
  background-color: white;
  padding: 1.25rem;
  font-size: 1.5rem;
  box-shadow: 2px 2px 4px lightgray;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`;
function My() {
  const { user } = useSelector((state) => state);
  const [storeData, setStoreData] = useState({});

  const handleLogout = useCallback(async () => {
    await signOut(getAuth());
  }, []);

  useEffect(() => {
    if (!user.currentUser) return;
    async function getStoreInfo() {
      const snapShot = await get(
        ref(getDatabase(), "users/proprietor/" + user.currentUser.uid)
      );
      if (!!snapShot.val()) {
        setStoreData(snapShot.val() ? snapShot.val() : {});
      }
    }
    getStoreInfo();
    return () => {
      setStoreData();
    };
  }, [user.currentUser]);

  return (
    <Container>
      <UserInfoConatainer>
        <div className="flex items-center justify-center w-[50%]">
          <MdPortrait className="text-5xl text-[#9e9e9e]" />
          <span className="font-bold text-base mt-4">{storeData?.name}</span>
        </div>
        <div
          className="flex flex-col items-center justify-center w-[50%]"
          onClick={handleLogout}
        >
          <IoLogOutOutline className="text-4xl ml-2" />
          <span className="text-xs font-bold mt-1 text-[#707070]">
            로그아웃
          </span>
        </div>
      </UserInfoConatainer>
      <TicketInfoContainer>
        <Box>
          <CategoryIcon category={storeData?.code} />
          <span className="text-lg">{storeData?.storeName}</span>
        </Box>
        <Box>
          <span className="flex w-[90%] justify-end text-base text-[#707070]">
            {storeData?.address}
          </span>
        </Box>
        <Box>
          <span className="flex w-[90%] justify-end text-base text-[#707070]">
            {storeData?.phoneNum}
          </span>
        </Box>
        <Box className="h-[30%]">
          <div className="flex flex-col mt-2 w-[30%] items-center">
            <BsDoorOpen className=" text-3xl" />
            <span className="text-xs">open</span>
          </div>
          <Box>
            <span>09:00</span>~<span>22:00</span>
          </Box>
        </Box>
        <Box className="h-[30%]">
          <Box className="flex mt-4 ml-[-1.5rem]">
            <IoInformationCircleSharp className="text-blue-700 text-3xl" />
            <span className="flex ml-[-2rem]">티켓 정보</span>
          </Box>
          <Ticket size={60} />
        </Box>
        <Box>
          <span className="text-lg">티켓 최대 주차공간 : </span>
          <span className="flex w-[30%] justify-center text-lg">{`${storeData?.parkingSpace} 자리`}</span>
        </Box>
        <Box>
          <Box>
            <IoTimerOutline className="text-3xl" />
            <span className="text-lg">주차 지정 시간 : </span>
          </Box>
          <span className="flex w-[60%] justify-center text-lg">{`${storeData?.ticketTime}분`}</span>
        </Box>
      </TicketInfoContainer>
    </Container>
  );
}

export default My;
