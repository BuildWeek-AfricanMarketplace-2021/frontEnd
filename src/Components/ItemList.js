import React, { useEffect, useState } from "react";
import axiosWithAuth from "./utils/axiosWithAuth";

const initialStateValues = [];

export default function ItemList() {
  const [itemList, setItemList] = useState(initialStateValues);

  useEffect(() => {
    axiosWithAuth()
      .get("https://ptierie-africanmarketplace.herokuapp.com/roles/roles")
      .then((res) => {
        setItemList(res.data);
        console.table(res.data, "list of items");
      })
      .catch((err) => {
        console.log(err, "error getting items");
      });
  }, []);
}
