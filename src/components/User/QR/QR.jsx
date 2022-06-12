import styled from "@emotion/styled";
import React, { useCallback, useRef, useState } from "react";
import { QrReader } from "react-qr-reader";
import "../../../firebase";
import { getDatabase, ref, serverTimestamp, set, get } from "firebase/database";
import { useSelector } from "react-redux";
import Dialog from "../../Dialog/Dialog";
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
  const dialogRef = useRef(null);
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
            dialogRef.current.showModal();
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

      <div style={{ display: "flex", width: "100%", height: "40%" }}>
        <span>{data?.storeName}</span>
        <br />
        <span>{data?.time}분</span>
        <ConfirmButton onClick={registerTicket}>등록하기</ConfirmButton>
      </div>
      <Dialog dialogRef={dialogRef} />
    </Container>
  );
}

export default QR;
