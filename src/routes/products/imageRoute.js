import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("Product Image Route");
});

export default router;