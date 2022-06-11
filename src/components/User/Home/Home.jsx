import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import { IoCafe, IoCart } from "react-icons/io5";
import { RiGasStationFill } from "react-icons/ri";
import { ImSpoonKnife } from "react-icons/im";
import Ticket from "./Ticket";
import Dialog from "../../Dialog/Dialog";
import NoTicket from "./NoTicket";
import { useSelector } from "react-redux";
import "../../../firebase";
import { get, child, ref, getDatabase } from "firebase/database";

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 78%;
`;

const TagContainer = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const TagItem = styled.div`
  width: 20%;
  height: 60%;
  background-color: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  gap: 0.25rem;
  box-shadow: 2px 2px lightgray;
`;

const TicketContainer = styled.div`
  display: flex;
  width: 92%;
  height: 88%;
  background-color: white;
  box-shadow: 2px 2px 4px lightgray;
  flex-wrap: wrap;
  border-radius: 8px;
  overflow: scroll;
`;

const TicketItem = styled.div`
  width: 33%;
  margin-top: 10%;
  display: flex;
  align-items: center;
`;

function Home() {
  const { user } = useSelector((state) => state);
  console.log(user);
  const [category, setCategory] = useState("ALL");
  const [dialogData, setDialogData] = useState();
  const [ticketList, setTicket] = useState([]);
  const dialogRef = useRef(null);
  const onClickTag = (code) => () => {
    if (category === code) {
      setCategory("ALL");
    } else {
      setCategory(code);
    }
  };
  const onClickTicket = (data) => () => {
    dialogRef.current.showModal();
    setDialogData(data);
  };

  useEffect(() => {
    if (!user.currentUser) return;
    async function getTicket() {
      const snapShot = await get(
        child(ref(getDatabase()), "users/" + user.currentUser.uid + "/ticket")
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
      <TagContainer>
        <TagItem
          onClick={onClickTag("CE7")}
          style={{
            border: `${category === "CE7" ? "1px solid #50accb" : "none"}`,
            color: `${category === "CE7" ? "#50accb" : "black"}`,
          }}
        >
          <IoCafe className="text-base text-[#7A5478]" />
          <p>카페</p>
        </TagItem>
        <TagItem
          onClick={onClickTag("MT1")}
          style={{
            border: `${category === "MT1" ? "1px solid #50accb" : "none"}`,
            color: `${category === "MT1" ? "#50accb" : "black"}`,
          }}
        >
          <IoCart className="text-base text-[#FFC900]" />
          <p>마트</p>
        </TagItem>
        <TagItem
          onClick={onClickTag("OL7")}
          style={{
            border: `${category === "OL7" ? "1px solid #50accb" : "none"}`,
            color: `${category === "OL7" ? "#50accb" : "black"}`,
          }}
        >
          <RiGasStationFill className="text-base text-[#e8514e]" />
          <p>주유소</p>
        </TagItem>
        <TagItem
          onClick={onClickTag("FD6")}
          style={{
            border: `${category === "FD6" ? "1px solid #50accb" : "none"}`,
            color: `${category === "FD6" ? "#50accb" : "black"}`,
          }}
        >
          <ImSpoonKnife className="text-base text-[#C7AFFF]" />
          <p>식당</p>
        </TagItem>
      </TagContainer>
      <TicketContainer>
        {ticketList?.length > 0 ? (
          ticketList?.map((ticket, index) => {
            if (category === "ALL" || category === ticket.code) {
              return (
                <TicketItem
                  className="flex flex-col text-center"
                  key={index}
                  onClick={onClickTicket(ticket)}
                >
                  <Ticket category={ticket.code} size={60} />
                  <p className="mt-[4%] font-bold text-[#303030]">
                    {ticket.storeName.indexOf(" ") > 0
                      ? ticket.storeName.slice(0, ticket.storeName.indexOf(" "))
                      : ticket.storeName}
                    <br />
                    {ticket.storeName.indexOf(" ") > 0
                      ? ticket.storeName.slice(
                          ticket.storeName.indexOf(" "),
                          ticket.storeName.length
                        )
                      : ""}
                  </p>
                </TicketItem>
              );
            } else {
              return null;
            }
          })
        ) : (
          <NoTicket />
        )}
      </TicketContainer>
      <Dialog dialogRef={dialogRef} selectTicket={dialogData} />
    </Container>
  );
}

export default Home;
