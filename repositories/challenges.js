const CyclicDB = require('@cyclic.sh/dynamodb');
const db = CyclicDB("expensive-yak-waistcoatCyclicDB")
const data = db.collection("challenges");
// data={
//     list:function(){return new Promise((resolve)=>resolve([]));},
//     get:function(id){return new Promise((resolve)=>resolve({}));},
//     set:function(id,item){return new Promise((resolve)=>resolve(item));},
//     remove:function(id){return new Promise((resolve)=>resolve({}));}
// }
const getAll = (() => {
    return new Promise((resolve)=>{
        let items=[];
        data.list().then(async (keys)=>{
            for (let item of keys.results){
                let result =await data.get(item.key);
                if (result && result.props){ 
                    items.push(result.props);
                }
            }
            resolve(items);
        })
    });
});

const get = ((id) => {
    return new Promise(async (resolve,reject)=>{
         let result = await data.find({ key: id });
         if (result && result.props){
            resolve(result.props);
         }
         reject("item "+id+" not found");
    });
});

const add = ((item) => {
    return data.set(item.id, item);
});

const update = ((item) => {
    return data.set(item.id, item);
});

const remove = ((id) => {
    return data.delete(id)
});

module.exports = {
    getAll,
    get,
    add,
    update,
    remove
}