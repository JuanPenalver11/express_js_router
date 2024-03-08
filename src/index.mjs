import express from "express";
import { carData } from "./data/carData.mjs";

const app = express();

app.get("/", (request, response) => {
  response.send(carData);
});

app.get("/api/cars", (request, response) => {
  const { filter, value } = request.query;
  if (filter && value) {
    const listFiltered = carData.find((car) => car[filter].includes(value));
    response.send(listFiltered);
  } else {
    response.status(200).send(carData);
  }
});

app.get("/api/cars/:id", (request, response) => {
  const { id } = request.params;
  const idParsed = parseInt(id);
  if (isNaN(idParsed)) return response.sendStatus(418);
  const carIndex = carData.findIndex((car) => car.id === idParsed);
  if (carIndex === -1) {
    return response.sendStatus(404);
  } else {
    response.status(200).send(carData[carIndex])
  }
});

app.post("/api/cars/", (request, response)=>{
    const { body } = request;
    const idGenerator = carData[carData.length - 1].id + 1;
    const newCar = {id:idGenerator, ...body}
    carData.push(newCar);
    response.status(201).send(newCar)
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`PORT in ${PORT}`);
});
