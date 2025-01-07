import express from "express";
import {Error} from "mongoose";
import User from "../models/User";

const userRouter = express.Router();

userRouter.post("/", async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });

        await user.save();
        res.send(user);

    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

export default userRouter;