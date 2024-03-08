import { Router } from "express";
import { carData } from "../data/carData.mjs";
import { idCheck } from "../middleware/carDataMiddlware.mjs";
import { createCarValidationSchema } from "../validators.mjs/carValidation.mjs";
import {
  validationResult,
  matchedData,
  checkSchema,
} from "express-validator";

const router = Router();
  
  router.get("/api/cars", (request, response) => {
    const { filter, value } = request.query;
    if (filter && value) {
      const listFiltered = carData.find((car) => car[filter].includes(value));
      response.send(listFiltered);
    } else {
      response.status(200).send(carData);
    }
  });
  
  router.get("/api/cars/:id", idCheck, (request, response) => {
    const { carIndex } = request;
    response.status(200).send(carData[carIndex]);
  });
  
  router.post(
    "/api/cars",
    checkSchema(createCarValidationSchema),
    (request, response) => {
      const result = validationResult(request);
      if (!result.isEmpty()) {
        return response.status(400).send({ error: result.array() });
      }
      const data = matchedData(request);
      const idGenerator = carData[carData.length - 1].id + 1;
      const newCar = { id: idGenerator, ...data };
      carData.push(newCar);
      response.status(201).send(newCar);
    }
  );
  
  router.patch("/api/cars/:id", idCheck, (request, response) => {
    const {carIndex, body} = request;
    response
      .status(201)
      .send((carData[carIndex] = { ...carData[carIndex], ...body }));
  });
  
  router.put("/api/cars/:id", idCheck, checkSchema(createCarValidationSchema), (request, response) => {
    const result = validationResult(request);
    if(!result.isEmpty()) return response.status(400).send({error:result.array()});
    const data = matchedData(request);
    const { carIndex } = request;
    response
      .status(201)
      .send((carData[carIndex] = { id: carData[carIndex].id, ...data }));
  });
  
  router.delete("/api/cars/:id", idCheck, (request, response) => {
    const { carIndex } = request;
    const deletedCar = carData.splice(carIndex, 1);
    response.status(200).send(deletedCar);
  });


export default router;