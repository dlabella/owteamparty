const repo = require('../repositories/teams.js');

const getAll = ((req, res) => {
    repo.getAll().then((items) => {
        res.json(items)
    });
})

const get = ((req, res) => {
    const id = req.params.id
    repo.get(id).then((item) => {
        res.json(item)
    });
})

const add = ((req, res) => {
    const item = getItemFromBody(req);
    repo.add(item).then((addedItem) => {
        res.json(addedItem)
    });
})

const update = ((req, res) => {
    const item = getItemFromBody(req);
    repo.update(item).then((updatedItem) => {
        res.json(updatedItem)
    });
});

const remove = ((req, res) => {
    const id = req.params.id
    repo.remove(id).then((item) => {
        res.json(item);
    })
});

const getItemFromBody = (req) => {
    const id = req.body.id;
    const name = req.body.name;
    const members = req.body.members;
    return {
        id: id,
        name: name,
        members: members
    };
};

module.exports = {
    getAll,
    get,
    add,
    update,
    remove
}