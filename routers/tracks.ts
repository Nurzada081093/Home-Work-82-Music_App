import express from "express";
import Album from "../models/Album";
import mongoose from "mongoose";
import {ITrack} from "../types";
import Track from "../models/Track";
import Artist from "../models/Artist";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
    const albumIdQuery = req.query.album;
    const artistIdQuery = req.query.artist;

    try {
        if (albumIdQuery) {
            const tracks = await Track.find({album: albumIdQuery});
            res.send(tracks);
            return;
        }

        if (artistIdQuery) {
            const artist = await Artist.findById(artistIdQuery);

            if (!artist) {
                res.status(404).send({error: 'Not found this artist!'});
                return;
            }

            const albums = await Album.find({artist: artistIdQuery});
            const albumsId = albums.map(album => album._id);
            const tracks = await Track.find({album: {$in: albumsId}});
            res.send(tracks);
            return;
        }

        const tracksAll = await Track.find().populate({
            path: 'album',
            populate: {
                path: 'artist',
                model: 'Artist'
            }
        });
        res.send(tracksAll);

    } catch (e) {
        next(e);
    }
});

tracksRouter.post('/', async (req, res, next) => {

    if (req.body.album) {
        const album = await Album.findById(req.body.album);

        if (!album) {
            res.status(404).send({error: 'This album is not found!'});
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