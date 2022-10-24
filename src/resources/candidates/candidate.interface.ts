import { Document } from 'mongoose';

export default interface Candidate extends Document {
    name: string;
}
