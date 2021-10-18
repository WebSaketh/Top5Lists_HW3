import jsTPS_Transaction from "../common/jsTPS.js";
/**
 * EditItem_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
    
    @author McKilla Gorilla
 */
export default class EditItem_Transaction extends jsTPS_Transaction {
  constructor(initStore, index, oldName, newName) {
    super();
    this.store = initStore;
    this.index = index;
    this.oldName = oldName;
    this.newName = newName;
  }

  doTransaction() {
    this.store.editItem(this.index, this.newName);
  }

  undoTransaction() {
    this.store.editItem(this.index, this.oldName);
  }
}
