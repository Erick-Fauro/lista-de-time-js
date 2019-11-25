import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import soccerRouter from "./routers/soccerplayer";
import teamRouter from "./routers/team";

const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: function(origin, callback){
        return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true
}));
app.use("/soccer-players", soccerRouter);
app.use("/teams", teamRouter);

app.listen(3000, function () {
    console.log("app funcionando")
});

