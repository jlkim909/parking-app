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
  const placeOverlay = useRef(null);
  const { user } = useSelector((state) => state);
  const [store, setStore] = useState([]);

  const contentNode = document.createElement("div");
  const currCategory = "PK6";
  contentNode.className = "placeinfo_wrap";

  const setStoreMarker = useCallback(() => {
    if (!store) return;
    for (let index = 0; index < store.length; index++) {
      console.log(store[index].y);
      var markerPosition = new window.kakao.maps.LatLng(
        store[index].y,
        store[index].x
      );
      var marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map.current);
    }
  }, [map, store]);

  const placeOverlayClose = useCallback(() => {
    placeOverlay.current?.setMap(null);
  }, []);
  const displayPlaceInfo = useCallback(
    (place) => {
      var content =
        '<div class="placeinfo" style={{position:"absolute"}}>' +
        '<a class="title" href="' +
        place.place_url +
        '" target="_blank" title="' +
        place.place_name +
        '">' +
        place.place_name +
        "</a>";

      if (place.road_address_name) {
        content +=
          '<span title="' +
          place.road_address_name +
          '">' +
          place.road_address_name +
          "</span>" +
          '  <span class="jibun" title="' +
          place.address_name +
          '">(지번 : ' +
          place.address_name +
          ")</span>";
      } else {
        content +=
          '    <span title="' +
          place.address_name +
          '">' +
          place.address_name +
          "</span>";
      }

      content +=
        '    <span class="tel">' +
        place.phone +
        "</span>" +
        "</div>" +
        '<div class="after"></div>';

      contentNode.innerHTML = content;
      placeOverlay.current.setPosition(
        new window.kakao.maps.LatLng(place.y, place.x)
      );
      placeOverlay.current.setMap(map.current);
    },
    [map, contentNode]
  );
  const addMarker = useCallback(
    (position) => {
      const markerImage = new window.kakao.maps.MarkerImage(
          parkingLotImg,
          new window.kakao.maps.Size(40, 45),
          new window.kakao.maps.Point(20, 40)
        ),
        marker = new window.kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });

      marker.setMap(map.current); // 지도 위에 마커를 표출합니다

      return marker;
    },
    [map]
  );

  const displayPlaces = useCallback(
    (places) => {
      //setParkingLot(places);
      for (var i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        var marker = addMarker(
          new window.kakao.maps.LatLng(places[i].y, places[i].x)
        );

        // 마커와 검색결과 항목을 클릭 했을 때
        // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
        ((marker, place) => {
          window.kakao.maps.event.addListener(marker, "click", () => {
            console.log(place);
            displayPlaceInfo(place);
          });
        })(marker, places[i]);
      }
    },
    [addMarker, displayPlaceInfo]
  );

  const placesSearchCB = useCallback(
    (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
        displayPlaces(data);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
      }
    },
    [displayPlaces]
  );
  const searchPlaces = useCallback(() => {
    if (!currCategory) {
      return;
    }
    ps.current.categorySearch(currCategory, placesSearchCB, {
      useMapBounds: true,
    });
  }, [placesSearchCB, ps]);

  const addEventHandle = (target, type, callback) => {
    if (target.addEventListener) {
      target.addEventListener(type, callback);
    } else {
      target.attachEvent("on" + type, callback);
    }
  };

  useEffect(() => {
    if (mapRef.current) {
      var options = {
        center: new window.kakao.maps.LatLng(userPosition.la, userPosition.lo),
        level: 3,
      };
      map.current = new window.kakao.maps.Map(mapRef.current, options);
      ps.current = new window.kakao.maps.services.Places(map.current);
      placeOverlay.current = new window.kakao.maps.CustomOverlay({
        zIndex: 1,
      });
      placeOverlay.current.setContent(contentNode);
      //searchPlaces();
      window.kakao.maps.event.addListener(map.current, "idle", setStoreMarker);
      window.kakao.maps.event.addListener(
        map.current,
        "click",
        placeOverlayClose
      );
      addEventHandle(
        contentNode,
        "mousedown",
        window.kakao.maps.event.preventMap
      );
      addEventHandle(
        contentNode,
        "touchstart",
        window.kakao.maps.event.preventMap
      );

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
      window.kakao.maps.event.removeListener(
        map.current,
        "click",
        placeOverlayClose
      );
    };
  }, [
    userPosition,
    placesSearchCB,
    map,
    ps,
    contentNode,
    searchPlaces,
    placeOverlayClose,
    setStoreMarker,
  ]);

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
  // useEffect(() => {
  //   if (!store) return;
  // }, [store, map]);
  return <MapContainer ref={mapRef}></MapContainer>;
}

export default memo(Map);
