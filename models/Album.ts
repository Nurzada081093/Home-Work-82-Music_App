import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    artist: {
        type: Schema.Types.ObjectId,
        ref: "Artist",
        required: [true, 'Artist is required'],
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    releaseDate: {
        type: String,
        required: [true, 'Release date is required'],
    },
    image: String,
});

const Album = mongoose.model('Album', AlbumSchema);
export default Album;