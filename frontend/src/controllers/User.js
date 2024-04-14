import axios from "axios";

// Config
import { BASE_URL } from "../utils/config";

export const updatedUser = async (details) => {
  console.log(details);
  const { data } = await axios.post(BASE_URL + "users/update/", details);
  return data;
};
