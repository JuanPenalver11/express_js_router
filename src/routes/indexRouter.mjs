import { Router } from "express";
import carRouter from "./carRouter.mjs";
import disneyRouter from "./disneyRouter.mjs"



const router = Router()

router.use(carRouter)
router.use(disneyRouter)

export default router;