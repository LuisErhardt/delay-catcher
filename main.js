#!/usr/bin/env node

import { getLateArrivalsAtStation } from "./src/checkArrivals.js";
import { createClient } from "db-vendo-client";
import { profile as dbProfile } from "db-vendo-client/p/db/index.js";
import dotenv from "dotenv";
import { DateTime } from "luxon";
import { retry } from "./src/util.js";

dotenv.config();

// 8000207 Köln Hbf
// 8000086 Duisburg Hbf

const stationCode = parseInt(process.argv[2], 10);

if (isNaN(stationCode)) {
  console.error("Please provide a valid stationCode as argument, e.g.: node main.js 8000207");
  process.exit(1);
}

const path = process.argv[3] || "";

try {
  const userAgent = process.env.USERAGENT; // adapt this to your project!
  const client = createClient(dbProfile, userAgent);

  console.log(`Checking for delays with stationCode: ${stationCode}`);

  const germanDate = DateTime.now().setZone("Europe/Berlin");
  const time = germanDate.toJSDate();

  time.setDate(time.getDate() - 1);

  for (let i = 0; i <= 23; i++) {
    time.setHours(i, 0, 0, 0);
    console.log(`Checking arrivals on ${time.toLocaleString("de-DE")}`);
    await retry(() => getLateArrivalsAtStation(time, client, stationCode, path));
  }
} catch (error) {
  console.error("An error occurred:", error);
}
