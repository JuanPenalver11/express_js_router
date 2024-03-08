import express from "express";
import carRouter from "./routes/carRouter.mjs";
import disneyRouter from "./routes/disneyRouter.mjs"

const app = express();

app.use(express.json());
app.use(carRouter);
app.use(disneyRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`PORT in ${PORT}`);
});
