import express from "express";
import indexRouter from "./routes/indexRouter.mjs";


const app = express();

app.use(express.json());
app.use(indexRouter)



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`PORT in ${PORT}`);
});
