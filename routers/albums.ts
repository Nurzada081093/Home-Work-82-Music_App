import express from "express";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import {IAlbum} from "../types";
import Artist from "../models/Artist";
import mongoose from "mongoose";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
    const artistIdQuery = req.query.artist;

    try {
        const filter = artistIdQuery ? {artist: artistIdQuery} : {};
        const albums = await Album.find(filter);
        res.send(albums);
    } catch (e) {
        next(e);
    }
});

albumsRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;

    if (!req.params.id) {
        res.status(404).send({error: 'Album id not found!'});
    }

    try {
        const album = await Album.findById(id).populate("artist");

        if (!album) {
            res.status(404).send({error: 'Album not found'});
        }

        res.send(album);
    } catch (e) {
        next(e);
    }
});

albumsRouter.post('/', imagesUpload.single('image'),  async (req, res, next) => {

    if (req.body.artist) {
        const artist = await Artist.findById(req.body.artist);

        if (!artist) {
            res.status(404).send({error: 'Not found this artist!'});
            return;
        }
    }

    const newAlbum: IAlbum = {
        artist: req.body.artist,
        title: req.body.title,
        releaseDate: req.body.releaseDate,
        image: req.file ? 'images' + req.file.filename : null,
    };

    try {
        const album = new Album(newAlbum);
        await album.save();
        res.send(album);
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

export default albumsRouter;