import styled from "@emotion/styled";
import React from "react";
import {
  IoTicketOutline,
  IoMapOutline,
  IoQrCodeOutline,
  IoHomeOutline,
} from "react-icons/io5";

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 10%;
  background-color: white;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 0 2px lightgray;
  justify-content: space-evenly;
`;

const BottomItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
function BottomMenu({ page, handlePage }) {
  return (
    <Container>
      <BottomItem
        style={{
          color: `${page === "HOME" ? "#50accb" : "black"}`,
        }}
        onClick={() => {
          handlePage("HOME");
        }}
      >
        <IoHomeOutline className="text-[2rem]" />
        <p className="text-xs font-bold">Home</p>
      </BottomItem>
      <BottomItem
        style={{
          color: `${page === "INUSE" ? "#50accb" : "black"}`,
        }}
        onClick={() => {
          handlePage("INUSE");
        }}
      >
        <IoTicketOutline className="text-[2rem]" />
        <p className="text-xs font-bold">In Use</p>
      </BottomItem>
      <BottomItem
        style={{
          color: `${page === "MAP" ? "#50accb" : "black"}`,
        }}
        onClick={() => {
          handlePage("MAP");
        }}
      >
        <IoMapOutline className="text-[2rem]" />
        <p className="text-xs font-bold">Map</p>
      </BottomItem>
      <BottomItem
        style={{
          color: `${page === "QR" ? "#50accb" : "black"}`,
        }}
        onClick={() => {
          handlePage("QR");
        }}
      >
        <IoQrCodeOutline className="text-[2rem]" />
        <p className="text-xs font-bold">QR</p>
      </BottomItem>
    </Container>
  );
}

export default BottomMenu;
