import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/candidates/candidate.validation';
import CandidateService from '@/resources/candidates/candidate.service';
import CandidateModel from '@/resources/candidates/candidate.model';

class CandidateController implements Controller {
    public path = '/candidates';
    public router = Router();
    private CandidateService = new CandidateService();
    private candidate = CandidateModel;

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.register),
            this.register
        );
        this.router.get(`${this.path}`, this.getCandidates);
    }

    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { name } = req.body;

            const candidate = await this.CandidateService.register(name);

            res.status(201).json( candidate );
        } catch (error) {
            next(new HttpException(400, 'Unable to register'));
        }
    };

    private getCandidates = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const candidates = await this.candidate.find()
            res.status(200).send(candidates );
        } catch (error) {
            next(new HttpException(404, "Unable to find candidates"))
        }

    };
}

export default CandidateController;
