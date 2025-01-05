import express from "express";
import Album from "../models/Album";
import mongoose from "mongoose";
import {ITrack} from "../types";
import Track from "../models/Track";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
    const albumIdQuery = req.query.album;

    try {
        const filter = albumIdQuery ? {album: albumIdQuery} : {};
        const tracks = await Track.find(filter);
        res.send(tracks);
    } catch (e) {
        next(e);
    }
});

tracksRouter.post('/', async (req, res, next) => {

    if (req.body.album) {
        const album = await Album.findById(req.body.album);

        if (!album) {
            res.status(404).send('This album is not found!');
            return;
        }
    }

    const newTrack: ITrack = {
        album: req.body.album,
        title: req.body.title,
        trackDuration: req.body.trackDuration,
    }

    try {
        const track = new Track(newTrack);
        await track.save();
        res.send(track);
    } catch (error) {

        if (error instanceof mongoose.Error.ValidationError) {
            const ValidationErrors = Object.keys(error.errors).map((key) => ({
                field: key,
                message: error.errors[key].message,
            }));
            res.status(400).send({errors: ValidationErrors});
        }
        next(error);
    }
});

export default tracksRouter;