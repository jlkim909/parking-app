import styled from "@emotion/styled";
import React, { useCallback } from "react";
import giftTicket from "../../../image/giftTicket.png";
import { AiOutlineGift } from "react-icons/ai";
import "../../../firebase";
import { getDatabase, ref, serverTimestamp, set, get } from "firebase/database";
import { useSelector } from "react-redux";
const Container = styled.div`
  width: 100%;
  min-height: 16vh;
  display: flex;
  flex-direction: column;
  align-items: end;
`;
const GiftImg = styled.div`
  display: flex;
  background-image: url(${giftTicket});
  background-size: 100% 100%;
  width: 100%;
  height: 84%;
  padding-left: 8%;
  padding-right: 4%;
`;
const ConfirmBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ece6cc;
  width: 16%;
  height: 80%;
  margin-top: 2.5%;
  margin-left: 10%;
  border-radius: 8px;
  color: #404040;
  font-size: 1.75rem;
  box-shadow: 2px 2px 4px gray;
`;

const formateDate = (millisecond) => {
  const tempTime = new Date(millisecond);

  const year = tempTime.getFullYear();
  let Month = tempTime.getMonth() + 1;
  if (Month < 10) {
    Month = `0${Month}`;
  }

  let Day = tempTime.getDate();
  if (Day < 10) {
    Day = `0${Day}`;
  }
  let hours = tempTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = tempTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${year}/${Month}/${Day} ${hours} : ${minutes}`;
};

function GiftItem({ data }) {
  const { user } = useSelector((state) => state);
  const createTicket = useCallback(
    (keep) => ({
      timestamp: serverTimestamp(),
      code: data?.code,
      num: data?.num,
      date: data?.date,
      storeName: data?.storeName,
      time: keep?.val() ? keep?.val().time + data?.time : data?.time,
    }),
    [data?.storeName, data?.num, data?.code, data?.date, data?.time]
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
  }, [data, user.currentUser?.uid, createTicket]);
  return (
    <Container>
      <GiftImg>
        <div className="flex font-bold items-center justify-center text-[#404040] mt-4 w-[36%] ">
          <span style={{ fontSize: "0.75rem", width: "70%" }}>
            {data?.storeName.indexOf(" ") > 0
              ? data?.storeName.slice(0, data?.storeName.indexOf(" "))
              : data?.storeName}
            <br />
            {data?.storeName.indexOf(" ") > 0
              ? data?.storeName.slice(
                  data?.storeName.indexOf(" "),
                  data?.storeName.length
                )
              : ""}
          </span>
          <span>{`${data?.remainTime}분`}</span>
        </div>
        <div className="flex flex-col font-bold items-end justify-between text-[#707070] w-[24%] h-[80%] mt-1 ml-4">
          <span style={{ fontSize: "0.5rem" }}>from. {data?.sender}님</span>
          <span>X</span>
        </div>
        <div className="flex w-[10%] items-center justify-center">
          <span
            style={{
              fontSize: "2rem",
              color: "#404040",
            }}
          >
            {data?.num}
          </span>
        </div>
        <ConfirmBtn onClick={registerTicket}>
          <AiOutlineGift />
        </ConfirmBtn>
      </GiftImg>
      <span
        style={{
          fontSize: "0.5rem",
          height: "16%",
          width: "30%",
        }}
      >
        {formateDate(data?.timestamp)}
      </span>
    </Container>
  );
}

export default GiftItem;
