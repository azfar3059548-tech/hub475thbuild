import axios from "axios";


export const getBlogsList = async () => {
  const response = await axios.get(
    "https://hub47webservices.raideit.net/api/Blog/BlogList?id=0"
    
  );

  return response.data;
};
