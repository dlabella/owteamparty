// const teamsRepo = require('../repositories/teams.js');

// const getTeams = ((req, res) => {
//     teamsRepo.getAll().then((teams)=>{
//         res.json(teams)
//     });
// })

// const getTeam = ((req, res) => {
//     const id = Number(req.params.teamID)
//     teamsRepo.get(id).then((team)=>{
//         res.json(team)
//     });
// })

// const createTeam = ((req, res) => {
//     teamsRepo.create(id,name).then((team)=>{
//         res.json(team)
//     });
// })

// const updateTeam = ((req, res) => {
//     const id = req.params.teamID;
//     const name = req.params.name;
//     const members = req.params.members;
//     teamsRepo.update(id, name, members).then((team)=>
//         res.json(team)
//     )
// });

// const deleteTeam = ((req, res) => {
//     const id = Number(req.params.teamID)
//     teamsRepo.remove(id).then((team)=>{
//         res.json(team);
//     })
// })

// module.exports = {
//     getTeams,
//     getTeam,
//     createTeam,
//     updateTeam,
//     deleteTeam
// }