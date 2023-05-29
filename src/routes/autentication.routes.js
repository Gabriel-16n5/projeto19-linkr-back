import { Router } from "express";
import { createAccount, loginAccount } from "../controllers/autenticationController.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import {signinSchema} from "../schemas/signin.schema.js";
import {signupSchema} from "../schemas/signup.schema.js";

const autenticationRouter = Router()

autenticationRouter.post("/signup", validateSchema(signupSchema), createAccount);
autenticationRouter.post("/signin", validateSchema(signinSchema), loginAccount);

export default autenticationRouter;