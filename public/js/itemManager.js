class ItemManager extends ItemCollection {
    constructor() {
        let self = this;
        if (new.target === ItemManager) {
            throw new TypeError('Cannot instantiate abstract class.');
        }
        this.items = [];
        this.api = "/api/";
        
        this.onPostItem=self.render;
        this.onPutItem=self.render;
        this.onDeleteItem=self.render;

        document.addEventListener('DOMContentLoaded', function () {
            self.initialize();
        }, false);
    }

    displayItems() {
        throw new TypeError('Method displayItems() must be implemented.');
    }

    initialize() {
        throw new TypeError('Method initialize() must be implemented.');
    }
    isValid(item) {
        throw new TypeError('Method isValid() must be implemented.');
    }
    getItemFromUI(){
        throw new TypeError('Method getItemFromUI() must be implemented.');
    }
    reseItemFromUI(){
        throw new TypeError('Method reseItemFromUI() must be implemented.');
    }
    setItemToUI(){
        throw new TypeError('Method setItemToUI() must be implemented.');
    }

    addItem() {
        let item = this.getItemFromUI();
        if (!this.isValid(item)) {
            alert("Team must have a name and members!");
            return;
        }
        this.postItem(item);
        showElement(this.actions.add);
        this.actions.update.disabled = true;
        this.actions.cancel.disabled = true;
        this.resetItemOnUI();
    }

    editItem(index) {
        const item = this.items[index];
        this.editingIndex=index;
        this.setItemOnUI(item);
        hideElement(this.actions.add);
        this.actions.update.disabled = false;
        this.actions.cancel.disabled = false;
        this.editingIndex = index;
    }

    cancelEdit() {
        this.editingIndex = -1;
        this.actions.update.disabled = true;
        this.actions.cancel.disabled = true;
        showElement(this.actions.add);
        this.resetItemOnUI();
    }

    removeItem(index) {
        let confirm =  window.confirm("Youre about to delete this item, Are you sure?");
        if (!confirm){
            return;
        }
        let item = this.items.splice(index, 1);
        if (item){
            this.deleteItem(item[0]);
        }
    }

    saveItem() {
        let item = this.getItemFromUI();
        if (!this.isValid(item)) {
            alert("Item added is not valid!");
            return;
        }
        this.putItem(item);
        this.resetItemOnUI();
        showElement(this.actions.add);
        this.actions.update.disabled = true;
        this.actions.cancel.disabled = true;
    }

    
}



