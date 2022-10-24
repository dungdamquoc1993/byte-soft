import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/votes/vote.validation';
import VoteService from '@/resources/votes/vote.service';
import VoteModel from '@/resources/votes/vote.model';
import authenticated from '@/middleware/authenticated.middleware';
var mongoose = require('mongoose');


class VoteController implements Controller {
    public path = '/votes';
    public router = Router();
    private VoteService = new VoteService();
    private vote = VoteModel;

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/voting`,
            validationMiddleware(validate.createVote),
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
            const { candidate_id, user_id } = req.body;
            const user_object_id = new mongoose.Types.ObjectId(user_id)
            const candidate_object_id = new mongoose.Types.ObjectId(candidate_id)
            console.log(user_object_id)
            console.log(candidate_object_id)
            const existVote = await this.vote.findOne({
                user_id: user_object_id,
                candidate_id: candidate_object_id,
            });
            console.log(existVote);
            if (!existVote) {
                const vote = await this.VoteService.voting(
                    candidate_id,
                    user_id
                );
                res.status(201).json({ vote });
            } else {
                res.status(400).json({ message: 'user have already vote' });
            }
        } catch (error) {
            next(new HttpException(400, 'Unable to register'));
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
