import React from "react";
import cafeTicketImg from "../../../image/cafe.png";
import oilTicketImg from "../../../image/oil.png";
import restaurantTicketImg from "../../../image/restaurant.png";
import martTicketImg from "../../../image/mart.png";

function Ticket({ category, size }) {
  return (
    <img
      src={
        category === "CE7"
          ? cafeTicketImg
          : category === "MT1"
          ? martTicketImg
          : category === "OL7"
          ? oilTicketImg
          : category === "FD6"
          ? restaurantTicketImg
          : cafeTicketImg
      }
      alt=""
      style={{
        width: size * 1.5,
        height: size,
      }}
    />
  );
}

export default Ticket;
