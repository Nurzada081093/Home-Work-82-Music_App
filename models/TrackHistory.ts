import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TrackHistorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
    },
    track: {
        type: Schema.Types.ObjectId,
        ref: 'Track',
        required: [true, 'Track is required'],
    },
    datetime: {
        type: String,
        default: () => new Date().toISOString(),
    }
});

const TrackHistory = mongoose.model("TrackHistory", TrackHistorySchema);
export default TrackHistory;