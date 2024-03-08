import { carData } from "../data/carData.mjs";

export const idCheck = (request, response, next) => {
  const { id } = request.params;
  const idParsed = parseInt(id);
  if (isNaN(idParsed)) return response.sendStatus(418);
  const carIndex = carData.findIndex((car) => car.id === idParsed);
  if (carIndex === -1) {
    return response.sendStatus(404);
  }
  request.carIndex = carIndex;
  next();
};
