import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import axiosWithAuth from "./utils/axiosWithAuth";
import "../css/ItemCard.css";
const initialStateValues = [];

export default function ItemList() {
  const [itemList, setItemList] = useState(initialStateValues);

  useEffect(() => {
    axiosWithAuth()
      .get("https://ptierie-africanmarketplace.herokuapp.com/items/item")
      .then((res) => {
        setItemList(res.data);
        console.table(res.data, "list of items");
      })
      .catch((err) => {
        console.log(err, "error getting items");
      });
  }, []);

  return (
    <div>
      <h1>Available items</h1>
      <div className="cards">
        {/* <br></br> */}

        {itemList.map((item) => {
          return <ItemCard details={item} key={item.class_id} />;
        })}
      </div>
    </div>
  );
}
