import styled from "@emotion/styled";
import React, { useCallback, useState } from "react";
import ShareInfo from "./ShareInfo";
import TicketInfo from "./TicketInfo";
import UseInfo from "./UseInfo";

const Container = styled.dialog`
  width: 70%;
  height: 40%;
  padding: 0;
  border-radius: 4px;
  ::backdrop {
    background: rgba(107, 114, 128, 0.75);
  }
`;

function Dialog({ dialogRef, storeData }) {
  const [dialogPage, setDialogPage] = useState("INFO");
  const handlePage = useCallback(
    (mode) => () => {
      setDialogPage(mode);
    },
    []
  );
  return (
    <Container ref={dialogRef} onClose={() => setDialogPage("INFO")}>
      {dialogPage === "USE" ? (
        <UseInfo dialogRef={dialogRef} storeData={storeData} />
      ) : dialogPage === "SHARE" ? (
        <ShareInfo dialogRef={dialogRef} storeData={storeData} />
      ) : (
        <TicketInfo
          dialogRef={dialogRef}
          storeData={storeData}
          page={handlePage}
        />
      )}
    </Container>
  );
}

export default Dialog;
