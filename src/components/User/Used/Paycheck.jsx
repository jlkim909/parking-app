import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import PayItem from "./PayItem";
import "../../../firebase";
import { get, child, ref, getDatabase } from "firebase/database";
import { useSelector } from "react-redux";

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

function Paycheck() {
  const { user } = useSelector((state) => state);
  const [ticket, setTicket] = useState([]);
  useEffect(() => {
    if (!user.currentUser) return;
    async function getTicket() {
      const snapShot = await get(
        child(
          ref(getDatabase()),
          "users/" + user.currentUser.uid + "/usedTicket"
        )
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
        <PayItem data={value} key={index} />
      ))}
    </Container>
  );
}

export default Paycheck;
