import { Router } from "express"
import passport from "passport"
import * as TaskController from "../controllers/task.controller"
import * as UserController from "../controllers/user.controller"

const router = Router()

router.get("/tasks", passport.authenticate('jwt', { session: false }),  TaskController.fetchAllTasks)

router.post("/tasks", passport.authenticate('jwt', { session: false }), TaskController.createTask)

router.put("/tasks/:id", passport.authenticate('jwt', { session: false }), TaskController.updateTask)

router.delete("/tasks/:id", passport.authenticate('jwt', { session: false }), TaskController.deleteTask)

// user
router.post("/user/signup", UserController.signup)

router.post("/user/signin", UserController.signin)

export default router
