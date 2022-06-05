import styled from "@emotion/styled";
import React from "react";

const Container = styled.div`
  width: 90%;
  min-height: 20%;
  display: flex;
  flex-direction: column;
  align-items: end;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 84%;
  background-color: white;
  border: 2vw solid #ece6cc;
  box-shadow: 2px 2px 4px lightgray;
  font-weight: bold;
  color: #505050;
`;

function PayItem({ data }) {
  return (
    <Container>
      <Item>
        <span
          style={{
            width: "50%",
            fontSize: "0.75rem",
            textAlign: "center",
          }}
        >
          {data?.storeName}
        </span>
        <span>{data?.time}분</span>
        <span
          style={{
            width: "35%",
            textAlign: "end",
            fontSize: "1.25rem",
            marginTop: "16%",
          }}
        >
          x {data?.num}
        </span>
      </Item>
      <span style={{ fontSize: "0.5rem" }}>{data?.date}</span>
    </Container>
  );
}

export default PayItem;
