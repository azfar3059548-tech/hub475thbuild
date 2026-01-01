 import axios from "axios";

const BASE_URL =
  "https://hub47webservices.raideit.net/api/Hub47";

export const addPodcast = async (payload: {
  ID: number;
  Title: string;
  Description: string;
  EntryDate: string;
  PodcastDate: string;
  EmbedCode: string;
  Thumbnail: string;
  IsActive: boolean;
  CreatedbyEmpNo: string;
  Notes: string;
}) => {
  const response = await axios.post(
    `${BASE_URL}/AddPodcast`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  return response.data;
};
