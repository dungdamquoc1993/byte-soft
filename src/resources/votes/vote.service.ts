import VoteModel from '@/resources/votes/vote.model';
import Vote from '@/resources/votes/vote.interface';

class VoteService {
    private vote = VoteModel;

    public async voting({
        user_id,
        candidate_id,
    }: {
        user_id: string;
        candidate_id: string;
    }): Promise<Vote | Error> {
        try {
            const vote = await this.vote.create({
                user_id,
                candidate_id,
            });

            return vote;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default VoteService;
