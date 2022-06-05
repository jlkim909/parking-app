import React, { useEffect, useRef, useState } from "react";
import Map from "./Map";
import SearchPage from "./SearchPage";
import MapSizeController from "./MapSizeController";
import GpsController from "./GpsController";
import styled from "@emotion/styled";

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 78%;
`;
function ParkinglotMap({ userid, userpassword }) {
  const map = useRef(null);
  const ps = useRef(null);
  //const [parkinglot, setParkingLot] = useState([]);
  //const [user, setUser] = useState({});
  const [userPosition, setUserPosition] = useState({
    la: 35.8242238,
    lo: 127.1479532,
  });

  useEffect(() => {
    function error() {
      alert("Sorry, no position available.");
    }
    const options = {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000,
    };
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserPosition({
          la: position.coords.latitude,
          lo: position.coords.longitude,
        });
      },
      error,
      options
    );
  }, [userid, userpassword]);
  return (
    <Container>
      <SearchPage ps={ps} setUserPosition={setUserPosition} />
      <Map map={map} ps={ps} userPosition={userPosition} />
      <MapSizeController map={map} />
      <GpsController setUserPosition={setUserPosition} />
    </Container>
  );
}

export default ParkinglotMap;
