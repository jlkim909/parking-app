import React, { memo, useCallback, useEffect, useRef } from "react";
import blueMarker0 from "../../../image/markers/B0.png";
import blueMarker1 from "../../../image/markers/B1.png";
import blueMarker2 from "../../../image/markers/B2.png";
import blueMarker3 from "../../../image/markers/B3.png";
import blueMarker4 from "../../../image/markers/B4.png";
import blueMarker5 from "../../../image/markers/B5.png";
import blueMarkerPlus from "../../../image/markers/B5+.png";
import userPositionImg from "../../../image/car.png";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import "../../../firebase";
import { get, child, ref, getDatabase } from "firebase/database";
import { useState } from "react";

const MapContainer = styled.div`
  width: 92%;
  height: 90%;
  margin-top: 0.75rem;
  box-shadow: 2px 2px lightgray;
  border-radius: 8px;
`;

const ticketShowNum = (num) => {
  switch (num) {
    case 0:
      return blueMarker0;
    case 1:
      return blueMarker1;
    case 2:
      return blueMarker2;
    case 3:
      return blueMarker3;
    case 4:
      return blueMarker4;
    case 5:
      return blueMarker5;
    default:
      return blueMarkerPlus;
  }
};

function Map({ map, ps, userPosition }) {
  const mapRef = useRef(null);
  const { user } = useSelector((state) => state);
  const [store, setStore] = useState([]);
  const [ticketList, setTicketList] = useState([]);
  const setStoreMarker = useCallback(() => {
    if (!store) return;
    for (let index = 0; index < store.length; index++) {
      const hadTicket = ticketList.find(
        (value) => value.storeCode === store[index].storeCode
      );
      let ticketCnt = 0;
      if (!!hadTicket) {
        ticketCnt = parseInt(hadTicket.remainTime / hadTicket.storeTicketTime);
      }
      var markerPosition = new window.kakao.maps.LatLng(
        store[index].y,
        store[index].x
      );
      const markerImage = new window.kakao.maps.MarkerImage(
        ticketShowNum(ticketCnt),
        new window.kakao.maps.Size(40, 45),
        new window.kakao.maps.Point(20, 40)
      );
      var marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });
      marker.setMap(map.current);
    }
  }, [map, store, ticketList]);

  useEffect(() => {
    if (mapRef.current) {
      var options = {
        center: new window.kakao.maps.LatLng(userPosition.la, userPosition.lo),
        level: 3,
      };
      map.current = new window.kakao.maps.Map(mapRef.current, options);
      ps.current = new window.kakao.maps.services.Places(map.current);
      window.kakao.maps.event.addListener(map.current, "idle", setStoreMarker);
      setStoreMarker();
      var markerImage = new window.kakao.maps.MarkerImage(
        userPositionImg,
        new window.kakao.maps.Size(40, 45),
        new window.kakao.maps.Point(20, 40)
      );

      var marker = new window.kakao.maps.Marker({
        map: map?.current,
        position: new window.kakao.maps.LatLng(
          userPosition.la,
          userPosition.lo
        ),
        title: "현재 위치",
      });

      marker.setImage(markerImage);
    }
    return () => {
      window.kakao.maps.event.removeListener(
        map.current,
        "idle",
        setStoreMarker
      );
    };
  }, [userPosition, map, ps, setStoreMarker]);

  useEffect(() => {
    if (!user.currentUser) return;
    async function getStore() {
      const snapShot = await get(child(ref(getDatabase()), "store/"));
      setStore(snapShot.val() ? Object.values(snapShot.val()) : []);
    }
    async function getTicket() {
      const snapShot = await get(
        child(ref(getDatabase()), "users/" + user.currentUser.uid + "/ticket")
      );
      setTicketList(snapShot.val() ? Object.values(snapShot.val()) : []);
    }
    getStore();
    getTicket();
    return () => {
      setStore([]);
    };
  }, [user.currentUser]);

  return <MapContainer ref={mapRef}></MapContainer>;
}

export default memo(Map);
