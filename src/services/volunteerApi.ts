 // volunteerApi.ts


import axios from "axios";

 export const addVolunteer = async (payload) => {
  const response = await axios.post(
    "https://hub47webservices.raideit.net/api/Hub47/addvolunteer",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};