 // volunteerApi.ts


import axios from "axios";

 export const addVolunteer = async (payload) => {
  const response = await axios.post(
    "https://hub47webservices.raideit.net/api/Hub47/addvolunteer",
    payload,
  
      
  );

  return response.data;
};

export const uploadVolunteerFile = async ({
  volunteerId,
  file,
  fileSubtype, // optional
}: {
  volunteerId: number;
  file: File;
  fileSubtype?: string;
}) => {

  const formData = new FormData();
  formData.append("Id", volunteerId.toString());
  formData.append("FileType", "volunteer");
  formData.append("file", file);
  console.log("---- FormData entries ----");
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }
  if (fileSubtype) {
    formData.append("fileSubtype", fileSubtype);
  }

  const response = await axios.post(
    "https://hub47webservices.raideit.net/api/General/ManageFile",
    formData
  );

  return response.data;
};
