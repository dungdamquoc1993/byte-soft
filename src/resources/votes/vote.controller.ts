import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/votes/vote.validation';
import VoteService from '@/resources/votes/vote.service';
import VoteModel from '@/resources/votes/vote.model';
import CandidateModel from '@/resources/candidates/candidate.model';
import authenticated from '@/middleware/authenticated.middleware';
var mongoose = require('mongoose');
class VoteController implements Controller {
    public path = '/votes';
    public router = Router();
    private VoteService = new VoteService();
    private candidate = CandidateModel;
    private vote = VoteModel;

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/voting`,
            validationMiddleware(validate.createVote),
            authenticated,
            this.voting
        );

        this.router.get(
            `${this.path}/getVotes`,
            validationMiddleware(validate.getVote),
            this.getVotes
        );
    }

    private voting = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { candidate_id } = req.body;
            const user_id = req.user._id;

            const _candidate = await this.candidate.findById(candidate_id);

            if (!_candidate) {
                return res
                    .status(400)
                    .json({ message: 'candidate does note exist' });
            }

            const existVote = await this.vote.findOne({
                user_id: user_id,
                candidate_id: candidate_id,
            });
            
            if (!existVote) {
                const vote = await this.VoteService.voting({
                    user_id,
                    candidate_id,
                });
                res.status(201).json({ vote });
            } else {
                res.status(400).json({ message: 'user have already vote' });
            }
        } catch (error) {
            console.log(error);
            next(new HttpException(400, 'Unable to vote'));
        }
    };

    private getVotes = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { candidate_id } = req.body;
            const votes = await this.vote
                .find({
                    candidate_id,
                })
                .populate({ path: 'user_id' })
                .populate({ path: 'candidate_id' });
            res.status(201).json(votes);
        } catch (error) {
            next(new HttpException(400, 'Unable to register'));
        }
    };
}

export default VoteController;
