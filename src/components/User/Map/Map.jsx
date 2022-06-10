import React, { memo, useCallback, useEffect, useRef } from "react";
import parkingLotImg from "../../../image/parkingLot.png";
import userPositionImg from "../../../image/car.png";
import styled from "@emotion/styled";
import "../../../css/MapStyle.css";
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
function Map({ map, ps, userPosition }) {
  const mapRef = useRef(null);
  const { user } = useSelector((state) => state);
  const [store, setStore] = useState([]);
  const setStoreMarker = useCallback(() => {
    if (!store) return;
    for (let index = 0; index < store.length; index++) {
      console.log(store[index].y);
      var markerPosition = new window.kakao.maps.LatLng(
        store[index].y,
        store[index].x
      );
      const markerImage = new window.kakao.maps.MarkerImage(
        parkingLotImg,
        new window.kakao.maps.Size(40, 45),
        new window.kakao.maps.Point(20, 40)
      );
      var marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });
      marker.setMap(map.current);
    }
  }, [map, store]);

  useEffect(() => {
    if (mapRef.current) {
      var options = {
        center: new window.kakao.maps.LatLng(userPosition.la, userPosition.lo),
        level: 3,
      };
      map.current = new window.kakao.maps.Map(mapRef.current, options);
      ps.current = new window.kakao.maps.services.Places(map.current);
      window.kakao.maps.event.addListener(map.current, "idle", setStoreMarker);
      // window.kakao.maps.event.addListener(
      //   map.current,
      //   "click",
      //   placeOverlayClose
      // );
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
    async function getTicket() {
      const snapShot = await get(child(ref(getDatabase()), "store/"));
      setStore(snapShot.val() ? Object.values(snapShot.val()) : []);
    }
    getTicket();
    return () => {
      setStore([]);
    };
  }, [user.currentUser]);
  return <MapContainer ref={mapRef}></MapContainer>;
}

export default memo(Map);
