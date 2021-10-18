import { React, useContext, useState } from "react";
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
    store.addMoveItemTransaction(sourceId, targetId);
  }

  function handleToggleEdit(event) {
    event.stopPropagation();
    toggleEdit();
  }
  function toggleEdit() {
    setEditActive(!editActive);
  }
  function handleKeyPress(event) {
    if (event.code === "Enter") {
      store.addEditItemTransaction(index, props.text, newText);
      toggleEdit();
    }
  }

  function handleUpdateText(event) {
    setNewText(event.target.value);
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
      draggable="true"
    >
      <input
        type="button"
        id={"edit-item-" + index + 1}
        className="list-card-button"
        value={"\u270E"}
        onClick={handleToggleEdit}
      />
      {props.text}
    </div>
  );
}

export default Top5Item;
