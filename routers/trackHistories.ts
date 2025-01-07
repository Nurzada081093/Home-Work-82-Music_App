import express from "express";
import User from "../models/User";
import Track from "../models/Track";
import TrackHistory from "../models/TrackHistory";
import {Error} from "mongoose";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', async (req, res, next) => {
    const token = req.get('Authorization');

    if (!token) {
        res.status(401).send({error: "No token present!"});
        return;
    }

    const user = await User.findOne({token: token});

    if (!user) {
        res.status(401).send({error: "Unauthorized!"});
        return;
    }

    if (req.body.track) {
        const track = await Track.findById(req.body.track);

        if (!track) {
            res.status(404).send({error: 'Not found this track!'});
            return;
        }
    }

    const newTrackHistory = {
        user,
        track: req.body.track
    };

    try {
        const trackHistory = new TrackHistory(newTrackHistory);
        await trackHistory.save();
        res.send(trackHistory);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

export default trackHistoryRouter;