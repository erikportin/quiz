import { fetchAsJSON } from "./fetch";
import { NOBLE_PRIZE_CATEGORY, TIME_PERIOD } from "./config";
import { NobelPrize } from "../typings/api";

const NOBEL_PRIZE_API_PATH = "https://api.nobelprize.org/2.1/nobelPrizes";

async function getNobelPrizes(): Promise<NobelPrize[]> {
  const res = await fetchAsJSON(
    `${NOBEL_PRIZE_API_PATH}?nobelPrizeYear=${TIME_PERIOD.FROM}&yearTo=${TIME_PERIOD.TO}}&nobelPrizeCategory=${NOBLE_PRIZE_CATEGORY}`
  );

  if (res) {
    return res.nobelPrizes as NobelPrize[];
  }

  return [];
}

//TODO handle names
function mapToWinner({ awardYear, laureates }: NobelPrize): Winner {
  return {
    name: laureates[0].knownName?.en || laureates[0].orgName?.en || "UNKOWN",
    year: awardYear,
  };
}

export async function getWinners(): Promise<Winner[]> {
  const nobelPrizes = await getNobelPrizes();

  return nobelPrizes.map(mapToWinner);
}
