import { useContext } from "react";
import { GlobalStoreContext } from "../store";
import { useHistory } from "react-router-dom";
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
  const { store } = useContext(GlobalStoreContext);
  const history = useHistory();
  let undoTrue = store.isUndo();
  let redoTrue = store.isRedo();
  let closeTrue = store.isCurrent() && store.isEditList();
  let enabledButtonClass = "top5-button";
  let disabledButtonClass = "top5-button-disabled";
  function handleUndo() {
    if (store.isItemEditActive) {
      return;
    }
    store.undo();
  }
  function handleRedo() {
    if (store.isItemEditActive) {
      return;
    }
    store.redo();
  }
  function handleClose() {
    if (store.isItemEditActive) {
      return;
    }
    history.push("/");
    store.closeCurrentList();
  }
  let editStatus = false;
  if (store.isListNameEditActive) {
    editStatus = true;
  }
  return (
    <div id="edit-toolbar">
      <div
        disabled={editStatus}
        id="undo-button"
        onClick={handleUndo}
        className={
          undoTrue && !store.isItemEditActive
            ? enabledButtonClass
            : disabledButtonClass
        }
      >
        &#x21B6;
      </div>
      <div
        disabled={editStatus}
        id="redo-button"
        onClick={handleRedo}
        className={
          redoTrue && !store.isItemEditActive
            ? enabledButtonClass
            : disabledButtonClass
        }
      >
        &#x21B7;
      </div>
      <div
        disabled={editStatus}
        id="close-button"
        onClick={handleClose}
        className={
          closeTrue && !store.isItemEditActive
            ? enabledButtonClass
            : disabledButtonClass
        }
      >
        &#x24E7;
      </div>
    </div>
  );
}

export default EditToolbar;
