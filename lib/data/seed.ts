import { faker } from "@faker-js/faker";
import { subDays } from "date-fns";
import fs from "fs";
import path from "path";

import { studentNames, subjects } from "./data";

const today = new Date();
const lastMonth = subDays(today, 30);

const perfs = Array.from({ length: 100 }, () => ({
  id: `${faker.number.int({ min: 1000, max: 9999 })}`,
  fullName: faker.helpers.arrayElement(studentNames),
  subject: faker.helpers.arrayElement(subjects).slug,
  perf: faker.number.int({ min: 0, max: 100 }),
  date: faker.date.between({ from: lastMonth, to: today }),
}));

fs.writeFileSync(
  path.join(__dirname, "perfs.json"),
  JSON.stringify(perfs, null, 2)
);

console.log("✅ Tasks data generated.");
