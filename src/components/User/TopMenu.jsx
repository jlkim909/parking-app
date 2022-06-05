import styled from "@emotion/styled";
import React from "react";
import logoImg from "../../image/logo.png";
import { BiArrowBack } from "react-icons/bi";
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 12%;
  background-color: #50accb;
  border-radius: 0 0 20px 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 2px lightgray;
`;

const Gift = styled.div`
  position: relative;
  width: 100%;
  height: 12%;
  background-color: #50accb;
  border-radius: 0 0 20px 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  color: white;
  font-weight: bold;
  box-shadow: 0 2px 2px lightgray;
`;
function TopMenu({ page, handlePage }) {
  if (page === "GIFT") {
    return (
      <Gift>
        <BiArrowBack
          className="w-[20%] text-3xl mt-[4%]"
          onClick={() => handlePage("INUSE")}
        />
        <span className="w-[60%] text-center text-xl mt-[4%]">선물함</span>
      </Gift>
    );
  }
  return (
    <Container>
      <img src={logoImg} alt="" className=" w-[50%] h-[70%] mt-[2%]" />
    </Container>
  );
}

export default TopMenu;
