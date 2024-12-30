import api from "./api";

export const getAllCampaigns = async () => {
  try {
    const response = await api.get("/campaigns");
    return response.data;
  } catch(error) {
    throw error;
  }
}

export const createCampaign = async (newCampaign) => {
  try {
    const response = await api.post("/campaigns", newCampaign);
    return response.data;
  } catch (error) {
    throw error;
  }
}