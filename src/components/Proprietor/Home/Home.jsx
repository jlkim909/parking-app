import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";
import CurrentTicketItem from "./CurrentTicketItem";
import { useSelector } from "react-redux";
import "../../../firebase";
import { get, child, set, ref, getDatabase, remove } from "firebase/database";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 78%;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 96%;
  height: 76%;
  padding: 4%;
  border-radius: 8px;
  background-color: white;
  overflow: scroll;
`;

const OnOffContinaer = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  height: 10%;
  border-radius: 2rem;
  transition: 1s;
  margin-top: 4%;
  background-color: #bce0fd;
  box-shadow: 2px 2px 4px gray;
`;
const OnOff = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
  font-size: 2rem;
  height: 90%;
  width: 40%;
  transition: 1s ease;
  background-color: #f9f7e8;
  box-shadow: 2px 2px 4px gray;
`;
function Home() {
  const { user } = useSelector((state) => state);
  const [onOff, setOnOff] = useState(true);
  const [currentParkinglot, setCurrentParkinglot] = useState([]);

  const handleOnOff = useCallback(async () => {
    if (!user.currentUser) return;
    try {
      const ableParking = await get(
        ref(
          getDatabase(),
          "users/proprietor/" + user.currentUser.uid + "/ableParking"
        )
      );
      if (!!ableParking.val()) {
        await remove(
          ref(
            getDatabase(),
            "users/proprietor/" + user.currentUser.uid + "/ableParking"
          )
        );
        setOnOff(false);
      } else {
        await set(
          ref(
            getDatabase(),
            "users/proprietor/" + user.currentUser.uid + "/ableParking"
          ),
          { ableParking: true }
        );
        setOnOff(true);
      }
    } catch (error) {
      console.error(error);
    }
  }, [user.currentUser]);

  useEffect(() => {
    if (!user.currentUser) return;
    async function getTicket() {
      const snapShot = await get(
        child(
          ref(getDatabase()),
          "users/proprietor/" + user.currentUser.uid + "/storeParkinglot"
        )
      );
      const ableParking = await get(
        ref(
          getDatabase(),
          "users/proprietor/" + user.currentUser.uid + "/ableParking"
        )
      );
      setOnOff(!!ableParking.val());
      setCurrentParkinglot(snapShot.val() ? Object.values(snapShot.val()) : []);
    }
    getTicket();
    return () => {
      setCurrentParkinglot([]);
    };
  }, [user.currentUser]);

  return (
    <Container>
      <div className="flex mt-[2%] h-[8%] w-[90%] items-center font-bold">
        <span>현재상황 : </span>
        <span className="ml-2">{currentParkinglot?.length} / 10</span>
      </div>
      <ItemContainer>
        {currentParkinglot
          ? currentParkinglot.map((value, index) => (
              <CurrentTicketItem key={index} data={value} />
            ))
          : "없음"}
      </ItemContainer>
      <OnOffContinaer
        style={{ backgroundColor: onOff ? "#61BFAD" : "#FF8B8B" }}
      >
        <OnOff
          style={{
            transform: onOff ? "translate(4%, 0)" : "translate(144%, 0)",
            color: onOff ? "#61BFAD" : "#FF8B8B",
          }}
          onClick={handleOnOff}
        >
          {onOff ? "ON" : "OFF"}
        </OnOff>
      </OnOffContinaer>
    </Container>
  );
}

export default Home;
