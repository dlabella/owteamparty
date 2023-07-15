class ItemCollection {
    constructor(baseUrl) {
        this.items = [];
        this.api = baseUrl;
        this.onPostItem=null;
        this.onPutItem=null;
        this.onDeleteItem=null;
    }
    getItems() {
        return new Promise((resolve)=>{
            apiCall(this.api, "GET").then(items=>{
                this.items=items;
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
}



