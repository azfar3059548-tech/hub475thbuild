import axios from "axios";

export const addMemberShip = async (payload) => {
    const response = await axios.post(
      "https://hub47webservices.raideit.net/api/Hub47/AddMembership",
      payload,
    
        
    );
  
    return response.data;
  };
  