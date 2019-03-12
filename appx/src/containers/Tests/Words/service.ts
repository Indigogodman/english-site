import fetchJSON from "../../../utils/fetchJSON";
import config from "../../../config";

export default async (user: string, game: number, token: string) => {
  return await fetchJSON(`${config.api.auth.address}/api/statistic`, {
    method: "POST",
    body: JSON.stringify({
      user,
      game
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`
    }
  });
};
