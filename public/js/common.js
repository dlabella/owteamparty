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
        return this.apiCall(this.api, "GET");
    }
    getItem(id) {
        return this.apiCall(this.api + "/" + id, "GET");
    }
    addItem(item) {
        return new Promise((resolve) => {
            item.id = generateGuid();
            this.items.push(item);
            this.apiCall(this.api, "POST", item).then(() => {
                this.render();
                resolve(item);
            });
        });
    }

    updateItem(index, item) {
        return new Promise((resolve) => {
            this.editingIndex = index;
            this.items[index] = item;
            this.apiCall(this.api, "PUT", item).then(() => {
                this.render();
                resolve(item);
            })
        });
    }

    deleteItem(index) {
        return new Promise((resolve) => {
            let item = this.items.splice(index, 1);
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

function generateGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return (
        s4() +
        s4() +
        '-' +
        s4() +
        '-' +
        s4() +
        '-' +
        s4() +
        '-' +
        s4() +
        s4() +
        s4()
    );
}

