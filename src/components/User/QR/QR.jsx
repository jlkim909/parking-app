import styled from "@emotion/styled";
import React, { useCallback, useState } from "react";
import { QrReader } from "react-qr-reader";
import "../../../firebase";
import { getDatabase, ref, serverTimestamp, set, get } from "firebase/database";
import { useSelector } from "react-redux";
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 78%;
`;

const ConfirmButton = styled.div`
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

function QR() {
  const { user } = useSelector((state) => state);
  const [data, setData] = useState();
  const createTicket = useCallback(
    (keep) => ({
      timestamp: serverTimestamp(),
      code: data?.code,
      num: data?.num,
      date: data?.date,
      storeName: data?.storeName,
      time: keep?.val()
        ? keep?.val().time + data?.ticketTime
        : data?.ticketTime,
    }),
    [data?.storeName, data?.num, data?.code, data?.date, data?.ticketTime]
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
      //setData();
    } catch (error) {
      console.error(error);
    }
  }, [data, user.currentUser?.uid, createTicket]);
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
        style={{ width: "100%" }}
      />
      <div style={{ height: "40%" }}>
        <span>{data?.storeName}</span>
        <br />
        <span>{data?.time}분</span>
        <ConfirmButton onClick={registerTicket}>등록하기</ConfirmButton>
      </div>
    </Container>
  );
}

export default QR;
