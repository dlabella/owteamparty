const CyclicDB = require('@cyclic.sh/dynamodb');
const db = CyclicDB("expensive-yak-waistcoatCyclicDB")
const data = db.collection("items");
// data={
//     list:function(){return new Promise((resolve)=>resolve([]));},
//     get:function(id){return new Promise((resolve)=>resolve({}));},
//     set:function(id,item){return new Promise((resolve)=>resolve(item));},
//     remove:function(id){return new Promise((resolve)=>resolve({}));}
// }
const getAll = (() => {
    return data.list();
});

const get = ((id) => {
    return data.find({ key: id });
});

const add = ((item) => {
    debugger;
    return data.set(item.id, item);
});

const update = ((item) => {
    return data.set(item.id, item);
});

const remove = ((id) => {
    return data.remove(id)
});

module.exports = {
    getAll,
    get,
    add,
    update,
    remove
}