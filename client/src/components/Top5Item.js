import { React, useContext, useEffect, useState } from "react";
import { GlobalStoreContext } from "../store";
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
  const { store } = useContext(GlobalStoreContext);
  const [draggedTo, setDraggedTo] = useState(0);
  const [editActive, setEditActive] = useState(false);
  const [newText, setNewText] = useState(props.text);

  useEffect(() => {
    document.getElementById("item-" + (index + 1))?.focus();
  });

  function handleDragStart(event) {
    event.dataTransfer.setData("item", event.target.id);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDragEnter(event) {
    event.preventDefault();
    setDraggedTo(true);
  }

  function handleDragLeave(event) {
    event.preventDefault();
    setDraggedTo(false);
  }

  function handleDrop(event) {
    event.preventDefault();
    let target = event.target;
    let targetId = target.id;
    targetId = targetId.substring(target.id.indexOf("-") + 1);
    let sourceId = event.dataTransfer.getData("item");
    sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
    setDraggedTo(false);

    // UPDATE THE LIST
    if (sourceId != targetId) {
      store.addMoveItemTransaction(sourceId, targetId);
    }
  }

  function handleToggleEdit(event) {
    if (store.isItemEditActive) {
      event.stopPropagation();
      console.log("item currently being edited");
      return;
    }
    event.stopPropagation();
    toggleEdit();
  }
  function toggleEdit() {
    setNewText(props.text);
    let newActive = !editActive;
    if (newActive) {
      store.setisItemEditActive(true);
    }
    setEditActive(newActive);
  }
  function handleKeyPress(event) {
    if (event.code === "Enter") {
      if (newText !== props.text) {
        store.addEditItemTransaction(index, props.text, newText);
      }
      setNewText(props.text);
      store.setisItemEditActive(false);
      toggleEdit();
    }
  }

  function handleUpdateText(event) {
    setNewText(event.target.value);
  }

  function handleBlur() {
    setNewText(props.text);
    store.setisItemEditActive(false);
    toggleEdit();
  }

  let { index } = props;
  let itemClass = "top5-item";
  if (draggedTo) {
    itemClass = "top5-item-dragged-to";
  }
  if (editActive) {
    return (
      <input
        id={"item-" + (index + 1)}
        className={itemClass}
        onKeyPress={handleKeyPress}
        onChange={handleUpdateText}
        defaultValue={props.text}
        onBlur={handleBlur}
      />
    );
  }
  return (
    <div
      id={"item-" + (index + 1)}
      className={itemClass}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      draggable={store.isItemEditActive ? "false" : "true"}
    >
      <input
        type="button"
        id={"edit-item-" + index + 1}
        //className="list-card-button"
        className={
          store.isItemEditActive
            ? "list-card-button-disabled"
            : "list-card-button"
        }
        value={"\u270E"}
        onClick={handleToggleEdit}
      />
      {props.text}
    </div>
  );
}

export default Top5Item;
