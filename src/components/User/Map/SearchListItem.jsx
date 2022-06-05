import React, { useCallback } from "react";
import { FaSchool, FaCoins, FaParking } from "react-icons/fa";
import { IoMdCafe } from "react-icons/io";
import { MdLocalHospital } from "react-icons/md";
import { CgHello } from "react-icons/cg";

function CategoryIcon({ category }) {
  switch (category) {
    case "주차장":
      return <FaParking style={{ color: "#f96363" }} />;
    case "병원":
      return <MdLocalHospital style={{ color: "#f96363" }} />;
    case "카페":
      return <IoMdCafe style={{ color: "#f96363" }} />;
    case "학교":
      return <FaSchool style={{ color: "#f96363" }} />;
    case "은행":
      return <FaCoins style={{ color: "#f96363" }} />;
    default:
      return <CgHello style={{ color: "#f96363" }} />;
  }
}
function SearchListItem({ parkingName, category, address, setUserPosition }) {
  const onClickItem = useCallback(() => {
    var geocoder = new window.kakao.maps.services.Geocoder();
    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(address, (result, status) => {
      // 정상적으로 검색이 완료됐으면
      if (status === window.kakao.maps.services.Status.OK) {
        var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        setUserPosition({
          la: coords.Ma,
          lo: coords.La,
        });
      }
    });
  }, [address, setUserPosition]);
  return (
    <li className="text-[0.5rem] cursor-pointer" onClick={onClickItem}>
      <div className="flex items-center">
        <CategoryIcon category={category} />
        <span className="font-bold ml-1">{parkingName}</span>
      </div>
      <span className="text-[#707070] text-[0.5rem]">{address}</span>
    </li>
  );
}

export default SearchListItem;
