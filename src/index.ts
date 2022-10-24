import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';
import UserController from '@/resources/user/user.controller';
import CandidateControler from '@/resources/candidates/candidate.controller'
import VoteController from '@/resources/votes/vote.controller'

validateEnv();

const app = new App(
    [new UserController(), new CandidateControler(), new VoteController()],
    Number(process.env.PORT)
);

app.listen();
