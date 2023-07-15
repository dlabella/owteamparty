const repo = require('../repositories/assignments.js');

const getAll = ((req, res) => {
    repo.getAll().then((teams) => {
        res.json(teams)
    });
})

const get = ((req, res) => {
    const id = Number(req.params.id)
    repo.get(id).then((team) => {
        res.json(team)
    });
})

const add = ((req, res) => {
    const item = getItemFromBody(req);
    repo.add(item).then((addedItem) => {
        debugger;
        res.json(addedItem)
    });
})

const update = ((req, res) => {
    const item = getItemFromBody(req);
    repo.update(item).then((updatedItem) => {
        debugger;
        res.json(updatedItem)
    });
});

const remove = ((req, res) => {
    const id = Number(req.params.id)
    repo.remove(id).then((team) => {
        res.json(team);
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