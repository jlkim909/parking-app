import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import "../../../firebase";
import { get, ref, getDatabase } from "firebase/database";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
// const ticket = encodeURIComponent(JSON.stringify({
//     storeName:"E-Mart",
//     code:"MT1",
//     num:5,
//     date:"2022.06.05 03:37",
//     time:30
//   }))
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
      setQrData(snapShot.val() ? snapShot.val() : {});
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
