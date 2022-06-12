import styled from "@emotion/styled";
import React, { useCallback, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import "../../firebase";
import {
  getDatabase,
  ref,
  set,
  get,
  serverTimestamp,
  remove,
} from "firebase/database";
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

function DialogUse({ selectTicket, dialogRef, chagePage }) {
  const { user } = useSelector((state) => state);
  const [carNum, setCarNum] = useState("");
  const [useTicketNum, setUseTicketNum] = useState(1);

  const createInUseTicket = useCallback(
    () => ({
      timestamp: serverTimestamp(),
      code: selectTicket?.code,
      num: useTicketNum,
      carNum: carNum,
      storeName: selectTicket?.storeName,
      remainTime: selectTicket?.storeTicketTime * useTicketNum,
    }),
    [
      carNum,
      useTicketNum,
      selectTicket?.storeName,
      selectTicket?.code,
      selectTicket?.storeTicketTime,
    ]
  );

  const createInUseUser = useCallback(
    (user) => ({
      timestamp: serverTimestamp(),
      userName: user.name,
      userPhoneNum: user.phoneNum,
      userCarNum: carNum,
      remainTime: selectTicket?.storeTicketTime * useTicketNum,
    }),
    [carNum, useTicketNum, selectTicket?.storeTicketTime]
  );

  const isSendValidate = useCallback(() => {
    if (carNum.length <= 0) return false;
    if (selectTicket?.remainTime < selectTicket?.storeTicketTime * useTicketNum)
      return false;
    return true;
  }, [
    carNum,
    useTicketNum,
    selectTicket?.remainTime,
    selectTicket?.storeTicketTime,
  ]);

  const handleParkingStart = useCallback(async () => {
    if (!selectTicket) return;
    if (!isSendValidate()) {
      alert("차량번호, 사용가능한 티켓을 확인하세요");
      return;
    }
    try {
      const keep = await get(
        ref(getDatabase(), "users/" + user.currentUser.uid + "/inUseTicket")
      );
      const userData = await get(
        ref(getDatabase(), "users/" + user.currentUser.uid)
      );
      const ableParking = await get(
        ref(
          getDatabase(),
          "users/proprietor/" + selectTicket.storeCode + "/ableParking"
        )
      );
      if (!keep.val() && !!ableParking.val()) {
        await remove(
          ref(
            getDatabase(),
            "users/" +
              user.currentUser.uid +
              "/ticket/" +
              selectTicket.storeName
          )
        );
        await set(
          ref(getDatabase(), "users/" + user.currentUser.uid + "/inUseTicket"),
          createInUseTicket()
        );
        await set(
          ref(
            getDatabase(),
            "users/proprietor/" +
              selectTicket?.storeCode +
              "/storeParkinglot/" +
              userData.val().name
          ),
          createInUseUser(userData.val())
        );
        dialogRef.current.close();
        chagePage("INUSE");
      } else {
        alert("이미 사용중인 티켓이 있습니다!");
      }
    } catch (error) {
      console.error(error);
    }
  }, [
    selectTicket,
    chagePage,
    user.currentUser?.uid,
    createInUseTicket,
    createInUseUser,
    dialogRef,
    isSendValidate,
  ]);

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
          <input
            className="w-[50%] h-[200%] border-[#ECE6CC] border-2 text-center font-bold ml-4"
            onChange={(e) => setCarNum(e.target.value)}
            value={carNum}
          />
        </TextContainer>
        <TextContainer>
          <p>사용티켓</p>
          <select
            className="border-[#ECE6CC] border-2 w-[30%]"
            onChange={(e) => setUseTicketNum(e.target.value)}
          >
            <option value={1}>1개</option>
            <option value={2}>2개</option>
            <option value={3}>3개</option>
          </select>
        </TextContainer>
      </Body>
      <DialogBtn onClick={handleParkingStart}>주차 시작</DialogBtn>
    </Container>
  );
}

export default DialogUse;
