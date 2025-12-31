import axios from "axios";

export const addStartup = async (payload) => {
    const response = await axios.post(
      "https://hub47webservices.raideit.net/api/Hub47/addstartup",
      payload,
    
        
    );
  
    return response.data;
  };
  