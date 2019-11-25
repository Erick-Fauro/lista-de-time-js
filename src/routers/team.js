import express from "express";
import storage from "../database";

const router = express.Router();

router.get("/list", function (request, response) {
    const teams = storage.teams;
    response.status(200).json(teams);
});

router.post("/create", function (request, response) {
    const {name, nationality, cup} = request.body;
    if (!name || !nationality || !cup) {
        response.status(403).json({
            message:"This text should not be blank."
        });
        return;
    } 
    storage.teams.push({name, nationality, cup});
    response.status(200).json({name, nationality, cup});
});

router.delete("/delete/:name", function (request, response){
    const teamsList = storage.teams;
    storage.teams = teamsList.filter((teams) => teams.name !== request.params.name);
    response.status(200).json({
        message: "This team has been delet."
    });
});

router.put("/update/:name", async function (request, response) {
    const teamsList = storage.teams;
    let teamsReturned = null;
    const newList = [];
    teamsList.map((team) => {
        let newTeam = team;
        if (team.name === request.params.name) {
            const {name, nationality, cup} = request.body;
            newTeam = {
                name: name,
                nationality: nationality,
                cup: cup,
            };
            teamsReturned = newTeam;
        };
        newList.push(newTeam);
    });
    storage.teams = newList;
    response.status(200).json(teamsReturned);
});

router.get("/show/:name", function (request, response) {
    const teamsList = storage.teams;
    const filteredTeams = teamsList.filter((team) => team.name === request.params.name);
    response.status(200).json(filteredTeams);
});

export default router;