class ItemManager {
    constructor() {
        let self = this;
        if (new.target === ItemManager) {
            throw new TypeError('Cannot instantiate abstract class.');
        }
        this.items = [];
        this.api = "/api/";
        document.addEventListener('DOMContentLoaded', function () {
            self.initialize();
        }, false);
    }
    getItems() {
        return new Promise((resolve)=>{
            this.apiCall(this.api, "GET").then(items=>{
                this.items=items;
                resolve(items);
            });
        });
    }
    getItem(id) {
        return this.apiCall(this.api + "/" + id, "GET");
    }

    postItem(item) {
        return new Promise((resolve) => {
            item.id = generateGuid();
            this.items.push(item);
            this.apiCall(this.api, "POST", item).then(() => {
                this.render();
                resolve(item);
            });
        });
    }

    putItem(item) {
        return new Promise((resolve) => {
            this.apiCall(this.api + "/" + item.id, "PUT", item).then(() => {
                this.render();
                resolve(item);
            })
        });
    }

    deleteItem(item) {
        return new Promise((resolve) => {
            this.apiCall(this.api + "/" + item.id, "DELETE").then(() => {
                this.render();
                resolve(item);
            });
        });
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

    apiCall(url = "", method = "POST", data = null) {
        if (data) {
            return fetch(url, {
                method: method,
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(data),
            }).then(resp => resp.json());
        } else {
            return fetch(url, {
                method: method,
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                redirect: "follow",
                referrerPolicy: "no-referrer",
            }).then(resp => resp.json());
        }
    }
}


