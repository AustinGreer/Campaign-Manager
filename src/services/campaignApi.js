import api from "./api";
import { getFCMToken } from "./firebaseConfig";

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

export const sendCampaignNotification = async (campaignData) => {
  try {
    const fcmToken = await getFCMToken();
    
    // Create a separate fetch call for Firebase (don't use your api instance)
    const response = await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `key=BEgBNK4z-G_B2SHVEcfrrZwdfsJS4d8_3_1RfaAfN0hVb8BDqMWOwzvgq-AwL8_y6ycGRL5l9ahPZFr3hLS9vVw`
      },
      body: JSON.stringify({
        to: fcmToken,
        notification: {
          title: campaignData.name,
          body: campaignData.notificationMessage
        },
        data: {
          campaignId: campaignData.id,
          targetAudience: campaignData.targetAudience
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Firebase FCM responded with ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

// extra function to combine post request for campaign with notification
export const createCampaignWithNotification = async (campaignData) => {
  try {
    const newCampaign = await createCampaign(campaignData);
    
    await sendCampaignNotification({
      ...campaignData,
      id: newCampaign.id
    });

    return newCampaign;
  } catch (error) {
    throw error;
  }
}