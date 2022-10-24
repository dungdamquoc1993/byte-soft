import { Schema, model } from 'mongoose';
import Candidate from '@/resources/candidates/candidate.interface';

const CandidateSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default model<Candidate>('Candidate', CandidateSchema);
