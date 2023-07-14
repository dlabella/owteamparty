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
    getItems(){
        return this.apiCall(this.api, "GET");
    }

    addItem(item) {
        this.items.push(item);
        this.apiCall(this.api, "POST", item);
        this.render();
    }

    updateItem(index, item) {
        this.editingIndex = index;
        this.items[index] = item;
        this.apiCall(this.api, "PUT", item);
        this.render();
    }

    deleteItem(index) {
        let item = this.items.splice(index, 1);
        this.apiCall(this.api + "/" + item.id, "DELETE");
        this.render();
    }

    displayItems() {
        throw new TypeError('Method displayItems() must be implemented.');
    }

    initialize() {
        throw new TypeError('Method initialize() must be implemented.');
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
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            }).then(resp => resp.json());
        } else {
            return fetch(url, {
                method: method,
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            }).then(resp => resp.json());
        }
    }
}


