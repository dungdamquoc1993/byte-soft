import { Document, Schema } from 'mongoose';

export default interface Vote extends Document {
    user_id: Schema.Types.ObjectId,
    candidate_id: Schema.Types.ObjectId
}
