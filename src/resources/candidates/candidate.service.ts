import CandidateModel from '@/resources/candidates/candidate.model';
import Candidate from './candidate.interface';

class CandidateService {
    private candidate = CandidateModel;

    /**
     * Register a new candidate
     */
    public async register(
        name: string,
    ): Promise<Candidate | Error> {
        try {
            const candidate = await this.candidate.create({
                name,
            });
            return candidate;
        } catch (error) {
            throw new Error(error.message);
        }
    }

}

export default CandidateService;
