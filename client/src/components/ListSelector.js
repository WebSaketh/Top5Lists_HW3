import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ListCard from "./ListCard.js";
import { GlobalStoreContext, GlobalStoreActionType } from "../store";
import DeleteModal from "./DeleteModal";
import api from "../api";
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/

// async function createNewList() {
//   console.log("clicked");
//   const res =
//   return res.data.top5list;
// }

const ListSelector = () => {
  const { store, storeReducer } = useContext(GlobalStoreContext);
  store.history = useHistory();

  useEffect(() => {
    store.loadIdNamePairs();
  }, []);

  async function handleAddListOnClick() {
    if ((store.isListNameEditActive = true)) {
      return;
    }
    const newList = await api.createTop5List({
      name: "Untitled",
      items: ["1", "2", "3", "4", "5"],
    });
    store.loadIdNamePairs();
  }

  let listCard = "";
  if (store) {
    listCard = store.idNamePairs.map((pair) => (
      <ListCard key={pair._id} idNamePair={pair} selected={false} />
    ));
  }
  return (
    <div id="top5-list-selector">
      <div id="list-selector-heading">
        <input
          type="button"
          id="add-list-button"
          className={
            !store.isListNameEditActive ? "top5-button" : "top5-button-disabled"
          }
          value="+"
          onClick={handleAddListOnClick}
        />
        Your Lists
      </div>
      <div id="list-selector-list">
        {listCard}
        <DeleteModal />
      </div>
    </div>
  );
};

export default ListSelector;
