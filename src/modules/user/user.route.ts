import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

// router.get("/", (req, res) => {
//   console.log("req", req);
//   res.send("hello prisma");
// });
router.post("/create-user", UserController.insertIntoDB);
router.post("/profile", UserController.insertOrUpdateProfile);
router.get("/", UserController.getUsers);
router.get("/:id", UserController.getSingleUser);
export const UserRoutes = router;
