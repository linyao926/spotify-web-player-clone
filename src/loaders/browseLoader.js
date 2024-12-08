import { getState } from "~/redux/store";
import { fetchData } from '~/services/api';

const browseLoader = async ({ params }) => {
  try {
    const state = getState();
    const accessToken = state.auth.accessToken;

    if (!accessToken) {
      throw new Error("Access token is missing. Please log in again.");
    }

    const browse = await fetchData('/browse/categories', accessToken, 50);
    return {browse: browse};
  } catch (error) {
    console.error("Error in browseLoader:", error.message);
    throw new Response("Failed to load browse data", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};

export default browseLoader;