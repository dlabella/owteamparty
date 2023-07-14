class ItemManager {
    constructor() {
        let self = this;
        if (new.target === ItemManager) {
            throw new TypeError('Cannot instantiate abstract class.');
        }
        this.items = [];
        document.addEventListener('DOMContentLoaded', function () {
            self.initialize();
        }, false);
    }

    addItem(item) {
        this.items.push(item);
        this.render();
    }

    updateItem(index, item) {
        this.editingIndex = index;
        this.items[index] = item;
        this.render();
    }

    deleteItem(index) {
        this.items.splice(index, 1);
        this.render();
    }

    displayItems() {
        throw new TypeError('Method displayItems() must be implemented.');
    }

    initialize() {
        throw new TypeError('Method initialize() must be implemented.');
    }
}


