import { Router } from "express";
import { disneyData } from "../data/disneyData.mjs";
import { idCheck } from "../middleware/disneyDataMiddleware.mjs";
import { createDisneyValidationSchema } from "../validators.mjs/disneyValidation.mjs";
import {
  validationResult,
  matchedData,
  checkSchema,
} from "express-validator";

const router = Router();

router.get("/", (request, response) => {
    response.send(disneyData);
  });
  
  router.get("/api/disney", (request, response) => {
    const { filter, value } = request.query;
    if (filter && value) {
      const listFiltered = disneyData.find((char) => char[filter].includes(value));
      response.send(listFiltered);
    } else {
      response.status(200).send(disneyData);
    }
  });
  
  router.get("/api/disney/:id", idCheck, (request, response) => {
    const { disneyIndex } = request;
    response.status(200).send(disneyData[disneyIndex]);
  });
  
  router.post(
    "/api/disney",
    checkSchema(createDisneyValidationSchema),
    (request, response) => {
      const result = validationResult(request);
      if (!result.isEmpty()) {
        return response.status(400).send({ error: result.array() });
      }
      const data = matchedData(request);
      const idGenerator = disneyDataData[disneyData.length - 1].id + 1;
      const newChar = { id: idGenerator, ...data };
      disneyData.push(newChar);
      response.status(201).send(newChar);
    }
  );
  
  router.patch("/api/disney/:id", idCheck, (request, response) => {
    const {disneyIndex, body} = request;
    response
      .status(201)
      .send((disneyDataData[disneyIndex] = { ...disneyDataData[disneyIndex], ...body }));
  });
  
  router.put("/api/disney/:id", idCheck, checkSchema(createDisneyValidationSchema), (request, response) => {
    const result = validationResult(request);
    if(!result.isEmpty()) return response.status(400).send({error:result.array()});
    const data = matchedData(request);
    const { disneyIndex } = request;
    response
      .status(201)
      .send((disneyData[disneyIndex] = { id: disneyData[disneyIndex].id, ...data }));
  });
  
  router.delete("/api/disney/:id", idCheck, (request, response) => {
    const { disneyIndex } = request;
    const deletedChar = disneyData.splice(carIndex, 1);
    response.status(200).send(deletedChar);
  });


export default router;