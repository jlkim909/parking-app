import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GiftItem from "./GiftItem";
import "../../../firebase";
import { get, child, ref, getDatabase } from "firebase/database";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 4%;
  height: 78%;
  overflow-y: scroll;
`;

function GiftBox() {
  const { user } = useSelector((state) => state);
  const [ticket, setTicket] = useState([]);
  useEffect(() => {
    if (!user.currentUser) return;
    async function getTicket() {
      const snapShot = await get(
        child(ref(getDatabase()), "users/" + user.currentUser.uid + "/giftbox")
      );
      setTicket(snapShot.val() ? Object.values(snapShot.val()) : []);
    }
    getTicket();
    return () => {
      setTicket([]);
    };
  }, [user.currentUser]);
  return (
    <Container>
      {ticket?.map((value, index) => (
        <GiftItem data={value} key={index} />
      ))}
    </Container>
  );
}

export default GiftBox;
