const repo = require('../repositories/teams.js');

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
    const team = getTeamFromBody(req);
    repo.add(team).then((team) => {
        res.json(team)
    });
})

const update = ((req, res) => {
    const team = getTeamFromBody(req);
    repo.update(team).then((team) =>
        res.json(team)
    )
});

const remove = ((req, res) => {
    const id = Number(req.params.id)
    repo.remove(id).then((team) => {
        res.json(team);
    })
});

const getTeamFromBody = (req) => {
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