import { getState } from "~/redux/store";
import { fetchData } from '~/services/api';

const userLoader = async ({ params }) => {
  try {
    const state = getState();
    const accessToken = state.auth.accessToken;

    if (!accessToken) {
      throw new Error("Access token is missing. Please log in again.");
    }

    const { id } = params;

    const userInfo = await fetchData(`/users/${id}`, accessToken);

    return {
      userInfo,
    };
  } catch (error) {
    console.error("Error in userLoader:", error.message);
    throw new Response("Failed to load user data", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};

export default userLoader;