import axios from "axios";

export const addEvent = async (payload) => {
  const response = await axios.post(
    "https://hub47webservices.raideit.net/api/Hub47/addEvent",
    payload
  );

  return response.data;
};

export const getEvent = async () => {
  const response = await axios.get(
    "https://hub47webservices.raideit.net/api/Hub47/getEventDetailsList"
    
  );

  return response.data;
};
