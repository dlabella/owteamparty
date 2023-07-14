const db = require('@cyclic.sh/dynamodb');
const data = db.collection("challenges");

const getAll = (() => {
    return data.list();
});

const get = ((id) => {
    return data.find({ key: id });
});

const add = ((item) => {
    data.set(item.id, item);
});

const update = ((id, item) => {
    data.set(id, item);
});

const remove = ((id) => {
    data.remove(id)
});

module.exports = {
    getAll,
    get,
    add,
    update,
    remove
}

module.exports = {
    getAll,
    get,
    add,
    update,
    remove
}