import React from "react";
import { FaSchool, FaCoins, FaParking } from "react-icons/fa";
import { IoMdCafe } from "react-icons/io";
import { MdLocalHospital } from "react-icons/md";
import { CgHello } from "react-icons/cg";

export function CategoryIcon({ category }) {
  switch (category) {
    case "주차장":
      return <FaParking style={{ color: "#f96363", fontSize: "2rem" }} />;
    case "병원":
      return <MdLocalHospital style={{ color: "#f96363", fontSize: "2rem" }} />;
    case "카페":
      return <IoMdCafe style={{ color: "#f96363", fontSize: "2rem" }} />;
    case "학교":
      return <FaSchool style={{ color: "#f96363", fontSize: "2rem" }} />;
    case "은행":
      return <FaCoins style={{ color: "#f96363", fontSize: "2rem" }} />;
    default:
      return <CgHello style={{ color: "#f96363", fontSize: "2rem" }} />;
  }
}
function SearchListItem({ store, handleStore }) {
  const onClickItem = () => {
    handleStore(store);
  };
  return (
    <div
      className="flex cursor-pointer gap-2 border-b-2 mt-3"
      onClick={onClickItem}
    >
      <CategoryIcon category={store.category_group_name} />
      <div>
        <span className="font-bold">{store.place_name}</span>
        <br />
        <span className="text-[#707070] text-xs">{store.address_name}</span>
      </div>
    </div>
  );
}

export default SearchListItem;
