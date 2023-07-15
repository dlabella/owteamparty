const repo = require('../repositories/assignments.js');

const getAll = ((req, res) => {
    repo.getAll().then((teams) => {
        res.json(teams)
    });
})

const get = ((req, res) => {
    const id = req.params.id;
    repo.get(id).then((team) => {
        res.json(team)
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
    const id = req.params.id;
    repo.remove(id).then((team) => {
        res.json(team);
    })
});

const getItemFromBody = (req) => {
    const id = req.body.id;
    const teamId = req.body.teamId;
    const challengeId = req.body.challengeId;
    const completed = req.body.completed;
    const completionText = req.body.completionText;

    return {
        id: id,
        teamId: teamId,
        challengeId: challengeId,
        completed: completed,
        completionText: completionText
    };
};

module.exports = {
    getAll,
    get,
    add,
    update,
    remove
}