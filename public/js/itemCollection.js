class ItemCollection {
    constructor(baseUrl) {
        this.items = [];
        this.api = baseUrl;
        this.onPostItem = null;
        this.onPutItem = null;
        this.onDeleteItem = null;
        this.onClear= null;
    }

    getItems() {
        return new Promise((resolve) => {
            apiCall(this.api, "GET").then(items => {
                this.items = items;
                resolve(items);
            });
        });
    }

    getItem(id) {
        return apiCall(this.api + "/" + id, "GET");
    }

    postItem(item) {
        return new Promise((resolve) => {
            item.id = generateGuid();
            this.items.push(item);
            apiCall(this.api, "POST", item).then(() => {
                if (this.api.onPostItem) this.onPostItem(item);
                resolve(item);
            });
        });
    }

    putItem(item) {
        return new Promise((resolve) => {
            apiCall(this.api + "/" + item.id, "PUT", item).then(() => {
                if (this.api.onPutItem) this.onPutItem(item);
                resolve(item);
            })
        });
    }

    deleteItem(item) {
        return new Promise((resolve) => {
            apiCall(this.api + "/" + item.id, "DELETE").then(() => {
                if (this.api.onDeleteItem) this.onDeleteItem(item);
                resolve(item);
            });
        });
    }

    clear() {
        var doIt = window.confirm("YOURE ABOUT TO CLEAR ALL DATA, ARE YOU SURE!!!");
        if (!doIt){
            return;
        }
        this.getItems().then(async items => {
            for (var item of items) {
                await this.deleteItem(item);
            }
            if (this.onClear) this.onClear();
        });
    }
}



