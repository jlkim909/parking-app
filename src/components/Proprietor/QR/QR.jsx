import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import "../../../firebase";
import { get, ref, getDatabase } from "firebase/database";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";

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

function QR() {
  const { user } = useSelector((state) => state);
  const [qrData, setQrData] = useState({});

  useEffect(() => {
    if (!user.currentUser) return;
    async function getTicket() {
      const snapShot = await get(
        ref(getDatabase(), "users/proprietor/" + user.currentUser.uid)
      );
      setQrData(
        snapShot.val()
          ? {
              code: snapShot.val().code,
              storeCode: snapShot.val().storeCode,
              storeName: snapShot.val().storeName,
              address: snapShot.val().address,
              phoneNum: snapShot.val().phoneNum,
              officeHours: `${snapShot.val().openHour}:${
                snapShot.val().openMinute
              }~${snapShot.val().closeHour}:${snapShot.val().closeMinute}`,
              storeTicketTime: snapShot.val().ticketTime,
              x: snapShot.val().x,
              y: snapShot.val().y,
            }
          : {}
      );
    }
    getTicket();
    return () => {
      setQrData([]);
    };
  }, [user.currentUser]);

  return (
    <Container>
      <QRCode
        size={256}
        value={encodeURIComponent(JSON.stringify(qrData))}
        viewBox={`0 0 256 256`}
        style={{ marginTop: "20%" }}
      />
    </Container>
  );
}

export default QR;
