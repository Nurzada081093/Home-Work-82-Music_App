import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        unique: true,
    },
    description: {
        type: String,
        default: null,
    },
    image: String,
});

const Artist = mongoose.model('Artist', ArtistSchema);
export default Artist;

