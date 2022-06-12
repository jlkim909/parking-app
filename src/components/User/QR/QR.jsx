import styled from "@emotion/styled";
import React, { useCallback, useState } from "react";
import { QrReader } from "react-qr-reader";
import "../../../firebase";
import { getDatabase, ref, serverTimestamp, set, get } from "firebase/database";
import { useSelector } from "react-redux";
import { CategoryIcon } from "../../Proprietor/SearchStore";
import { IoTimerOutline } from "react-icons/io5";
import { BsDoorOpen } from "react-icons/bs";
import { IoMdRefresh } from "react-icons/io";
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 78%;
`;

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 92%;
  height: 90%;
  background-color: white;
  padding: 1.25rem;
  font-size: 1.5rem;
  box-shadow: 2px 2px 4px lightgray;
`;

const ConfirmButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ece6cc;
  border-radius: 8px;
  width: 74%;
  height: 100%;
  font-size: 0.875rem;
  color: #707070;
  font-weight: bold;
  box-shadow: 2px 2px 4px lightgray;
`;

const RefreshButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff8b8b;
  border-radius: 8px;
  width: 16%;
  height: 100%;
  font-size: 0.875rem;
  color: white;
  font-weight: bold;
  box-shadow: 2px 2px 4px lightgray;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`;

function QR({ handlePage }) {
  const { user } = useSelector((state) => state);
  const [data, setData] = useState();
  const createTicket = useCallback(
    (keep) => ({
      timestamp: serverTimestamp(),
      code: data?.code,
      storeCode: data?.storeCode,
      storeName: data?.storeName,
      storeTicketTime: data?.storeTicketTime,
      remainTime: keep?.val()
        ? keep?.val().remainTime + data?.storeTicketTime
        : data?.storeTicketTime,
    }),
    [data?.storeName, data?.storeCode, data?.code, data?.storeTicketTime]
  );
  const registerTicket = useCallback(async () => {
    if (!data) return;
    try {
      const keep = await get(
        ref(
          getDatabase(),
          "users/" + user.currentUser.uid + "/ticket/" + data?.storeName
        )
      );
      await set(
        ref(
          getDatabase(),
          "users/" + user.currentUser.uid + "/ticket/" + data?.storeName
        ),
        createTicket(keep)
      );
    } catch (error) {
      console.error(error);
    }
    handlePage("HOME");
  }, [data, user.currentUser?.uid, createTicket, handlePage]);

  return (
    <Container>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(JSON.parse(decodeURIComponent(result?.text)));
          }

          if (!!error) {
            //console.info(error);
          }
        }}
        constraints={{
          facingMode: "environment",
        }}
        containerStyle={{ width: "100%", display: data ? "none" : "flex" }}
      />

      <div
        style={{
          display: data ? "flex" : "none",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RegisterContainer>
          <Box>
            <CategoryIcon category={"CE7"} />
            <span className="text-lg">{data?.storeName}</span>
          </Box>
          <Box>
            <span className="flex w-[90%] justify-end text-base text-[#707070]">
              {data?.address}
            </span>
          </Box>
          <Box>
            <span className="flex w-[90%] justify-end text-base text-[#707070]">
              {data?.phoneNum}
            </span>
          </Box>
          <Box className="mt-[20%]">
            <div className="flex flex-col mt-2 w-[30%] items-center">
              <BsDoorOpen className=" text-3xl" />
              <span className="text-xs">open</span>
            </div>
            <Box>
              <span>{data?.officeHours}</span>
            </Box>
          </Box>
          <Box className="mt-[20%]">
            <IoTimerOutline className="text-5xl" />
            <span className="text-3xl">{`${data?.storeTicketTime}분`}</span>
          </Box>
          <Box className="mt-[40%] h-[10%]">
            <ConfirmButton onClick={registerTicket}>등록하기</ConfirmButton>
            <RefreshButton onClick={() => setData(null)}>
              <IoMdRefresh className="text-2xl" />
            </RefreshButton>
          </Box>
        </RegisterContainer>
      </div>
    </Container>
  );
}

export default QR;
