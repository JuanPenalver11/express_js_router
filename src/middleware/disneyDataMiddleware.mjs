import { disneyData } from "../data/disneyData.mjs";

export const idCheck = (request, response, next) => {
  const { id } = request.params;
  const idParsed = parseInt(id);
  if (isNaN(idParsed)) return response.sendStatus(418);
  const disneyIndex = disneyData.findIndex((car) => car.id === idParsed);
  if (disneyIndex === -1) {
    return response.sendStatus(404);
  }
  request.disneyIndex = disneyIndex;
  next();
};
