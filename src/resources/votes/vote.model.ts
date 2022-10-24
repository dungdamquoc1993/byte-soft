import { Schema, model } from 'mongoose';
import User from '@/resources/votes/vote.interface';

const VoteSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        candidate_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Candidate'
        }

    },
    { timestamps: true }
);


export default model<User>('Vote', VoteSchema);
