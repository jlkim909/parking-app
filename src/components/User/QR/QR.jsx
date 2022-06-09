import styled from "@emotion/styled";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 78%;
`;

function QR() {
  const [data, setData] = useState("No result");
  console.log(data);
  return (
    <Container>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        constraints={{
          facingMode: "environment",
        }}
        style={{ width: "100%" }}
      />
      <p>{data}</p>
    </Container>
  );
}

export default QR;
