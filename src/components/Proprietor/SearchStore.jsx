import React from "react";
import { FaSchool, FaCoins, FaParking } from "react-icons/fa";
import { IoMdCafe } from "react-icons/io";
import { MdLocalHospital } from "react-icons/md";
import { CgHello } from "react-icons/cg";

export function CategoryIcon({ category }) {
  switch (category) {
    case "PK6":
      return <FaParking style={{ color: "#f96363", fontSize: "2rem" }} />;
    case "HP8":
      return <MdLocalHospital style={{ color: "#f96363", fontSize: "2rem" }} />;
    case "CE7":
      return <IoMdCafe style={{ color: "#f96363", fontSize: "2rem" }} />;
    case "SC4":
      return <FaSchool style={{ color: "#f96363", fontSize: "2rem" }} />;
    case "BK9":
      return <FaCoins style={{ color: "#f96363", fontSize: "2rem" }} />;
    case "MT1":
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
