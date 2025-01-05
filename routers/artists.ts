import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import {IArtist} from "../types";
import mongoose from "mongoose";

const artistsRouter = express.Router();

artistsRouter.get("/", async (_req: express.Request, res: express.Response, next) => {
    try {
        const artist = await Artist.find();
        res.send(artist);
    } catch (e) {
        next(e);
    }
});

artistsRouter.post('/', imagesUpload.single('image'),  async (req, res, next) => {

    const newArtist: IArtist = {
        name: req.body.name,
        description: req.body.description || null,
        image: req.file ? 'images' + req.file.filename : null,
    };

    try {
        const artist = new Artist(newArtist);
        await artist.save();
        res.send(newArtist);
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

export default artistsRouter;