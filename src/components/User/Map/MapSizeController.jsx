import styled from "@emotion/styled";
import React, { useCallback } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
const PlusMinusBoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  position: absolute;
  top: 35%;
  z-index: 1;
  right: 8%;
  width: 2rem;
  height: 4rem;
  background-color: #f5f5f5;
  box-shadow: 2px 2px lightgray;
`;

function MapSizeController({ map }) {
  const onExpandMap = useCallback(() => {
    map?.current.setLevel(map?.current.getLevel() - 1);
  }, [map]);

  const onReduceMap = useCallback(() => {
    map?.current.setLevel(map?.current.getLevel() + 1);
  }, [map]);

  return (
    <PlusMinusBoxContainer>
      <AiOutlinePlus
        className="text-lg cursor-pointer text-[#425470] font-bold"
        onClick={onExpandMap}
      />
      <div className=" w-full h-[0.08rem] bg-[#bfbfbf]" />
      <AiOutlineMinus
        className="text-lg cursor-pointer text-[#425470] font-bold sh"
        onClick={onReduceMap}
      />
    </PlusMinusBoxContainer>
  );
}

export default MapSizeController;
