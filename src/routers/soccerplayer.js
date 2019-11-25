import express from "express";
import storage from "../database";

const router = express.Router();

router.get("/list", function (request, response) {
    const soccerPlayersList = storage.soccerPlayers;
    response.status(200).json(soccerPlayersList);
});

router.post("/create", function (request, response) {
    const {name, age, team} = request.body;
    if (!name || !age || !team) {
        response.status(403).json({
            message: "This text should not be blank."
        });
        return;
    }
    storage.soccerPlayers.push({name, age, team});
    response.status(200).json({name, age, team});
});

router.delete("/delete/:name", async function (request, response){
    const soccerPlayersList = storage.soccerPlayers;
    storage.soccerPlayers = soccerPlayersList.filter((soccerPlayer) => soccerPlayer.name !== request.params.name);
    response.status(200).json({
        message: "This soccer player is deleted."
    });
});

router.put("/update/:name", async function (request, response) {
    const soccerPlayersList = storage.soccerPlayers;
    let soccerPlayerReturned = null;
    const newList = [];
    soccerPlayersList.map((soccerPlayer) => {
        let newSoccerPLayer = soccerPlayer
        if (soccerPlayer.name === request.params.name) {
            const {name, age, team} = request.body;
            newSoccerPLayer = {
                name: name,
                age: age,
                team: team,
            };
            soccerPlayerReturned = newSoccerPLayer;
        }
        newList.push(newSoccerPLayer);
    });
    storage.soccerPlayers = newList;
    response.status(200).json(soccerPlayerReturned);
});

router.get("/show/:name", function (request, response) {
    const soccerPlayersList = storage.soccerPlayers;
    const filteredSoccers = soccerPlayersList.filter((soccerPlayer) => soccerPlayer.name === request.params.name);
    response.status(200).json(filteredSoccers);
});

export default router;