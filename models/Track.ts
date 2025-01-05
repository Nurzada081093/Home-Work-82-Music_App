import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: [true, 'Album is required']
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    trackDuration: {
        type: String,
        required: [true, 'Track duration is required'],
    }
});

const Track = mongoose.model('Track', TrackSchema);
export default Track;