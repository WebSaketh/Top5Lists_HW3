import { Component, useContext, useEffect, useState } from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { useHistory } from "react-router-dom";
import { GlobalStoreContext } from "../store";
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
  const { store } = useContext(GlobalStoreContext);
  const [editActive, setEditActive] = useState(false);
  const { idNamePair, selected } = props;
  const [text, setText] = useState(idNamePair.name);
  store.history = useHistory();

  function handleLoadList(event) {
    if (!event.target.disabled) {
      let _id = event.target.id;
      if (_id.indexOf("list-card-text-") >= 0)
        _id = ("" + _id).substring("list-card-text-".length);

      // CHANGE THE CURRENT LIST
      store.setCurrentList(_id);
    }
  }

  useEffect(() => {
    document.getElementById("list-" + idNamePair._id)?.focus();
    store.clearAllTransactions();
  });

  function handleToggleEdit(event) {
    event.stopPropagation();
    toggleEdit();
  }

  function toggleEdit() {
    console.log("toggleEdit");
    let newActive = !editActive;
    if (newActive) {
      store.setIsListNameEditActive();
    }
    setEditActive(newActive);
  }

  function handleKeyPress(event) {
    if (event.code === "Enter") {
      let id = event.target.id.substring("list-".length);
      if (text === "") {
        store.changeListName(id, idNamePair.name);
        toggleEdit();
        return;
      }
      console.log("pressed Enter Once!");
      store.changeListName(id, text);
      toggleEdit();
      return;
    }
  }

  function handleUpdateText(event) {
    setText(event.target.value);
  }

  function handleDelete(event) {
    event.stopPropagation();
    let name = event.target.parentNode.textContent;
    let id = event.target.id.substring("delete-list-".length);
    store.setlistMarkedForDeletion(id, name);
    store.showDeleteListModal();
  }

  function handleBlur(event) {
    let id = event.target.id.substring("list-".length);
    store.changeListName(id, idNamePair.name);
    toggleEdit();
    return;
  }

  let selectClass = "unselected-list-card";
  if (selected) {
    selectClass = "selected-list-card";
  }
  let cardStatus = false;
  if (store.isListNameEditActive) {
    cardStatus = true;
  }
  let cardElement = (
    <div
      id={idNamePair._id}
      key={idNamePair._id}
      onClick={handleLoadList}
      className={"list-card " + selectClass}
    >
      <span
        id={"list-card-text-" + idNamePair._id}
        key={"span-" + idNamePair._id}
        className="list-card-text"
      >
        {idNamePair.name}
      </span>
      <input
        disabled={cardStatus}
        type="button"
        id={"delete-list-" + idNamePair._id}
        className="list-card-button"
        value={"\u2715"}
        onClick={handleDelete}
      />
      <input
        disabled={cardStatus}
        type="button"
        id={"edit-list-" + idNamePair._id}
        className="list-card-button"
        onClick={handleToggleEdit}
        value={"\u270E"}
      />
    </div>
  );
  if (editActive && !store.isListNameEditActive) {
    setEditActive(false);
  }
  if (editActive && store.isListNameEditActive) {
    cardElement = (
      <input
        id={"list-" + idNamePair._id}
        className="list-card"
        type="text"
        onKeyPress={handleKeyPress}
        onChange={handleUpdateText}
        defaultValue={idNamePair.name}
        onBlur={handleBlur}
      />
    );
  }
  return cardElement;
}

export default ListCard;
