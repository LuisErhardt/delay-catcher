import { writeCSV } from "./writeFiles.js";
import { parseDate } from "./util.js";
import dotenv from "dotenv";

dotenv.config();

/** * Fetches late arrivals at a specific station.
 * If the delay is 60 minutes or more for regional trains, it writes the data to a CSV file.
 * @param {Date} time - The time to check for arrivals.
 * @param {Object} client - The client to fetch arrivals from.
 * @param {string} stationCode - The code of the station to check.
 **/
async function getLateArrivalsAtStation(time, client, stationCode, path) {
  stationCode = stationCode.toString();

  const { arrivals, _ } = await client.arrivals(stationCode, {
    when: time,
    duration: 59,
  });

  if (!arrivals || arrivals.length === 0) {
    console.log("No arrivals found! Check the stationCode.");
  }

  const cutoffTime = new Date(time);
  cutoffTime.setHours(cutoffTime.getHours() + 1);

  for (const arrival of arrivals) {
    const delay = arrival.delay !== null ? arrival.delay : 0;

    const arrivalTime = new Date(arrival.when);

    if (
      arrival.line.mode === "train" &&
      arrival.line.product === "regional" &&
      delay >= 3600 &&
      arrivalTime < cutoffTime
    ) {
      const ankunft_plan = parseDate(arrival.plannedWhen);
      const ankunft_real = parseDate(arrival.when);
      const data = [
        {
          Startbahnhof: arrival.provenance,
          Zugnummer: `${arrival.line.name} (${arrival.line.fahrtNr})`,
          Zielbahnhof: arrival.stop.name,
          Ankunft_Plan: ankunft_plan,
          Ankunft_tatsächlich: ankunft_real,
          Verspätung: Math.round(delay / 60).toString(),
        },
      ];
      writeCSV(data, time, path);
    }
  }
}
