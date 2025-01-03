import { useState, useCallback } from 'react';

import { getAllCampaigns } from '../services/campaignApi';

function useFetchCampaigns() {
  const [campaignList, setCampaignList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)

  const fetchCampaignList = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getAllCampaigns();
      setCampaignList(response);
    } catch (error) {
      setError(`Error occurred while fetching campaigns: ${error}`)
    } finally {
      setIsLoading(false);
    }
  }, [])

  return {
    campaignList,
    fetchCampaignList,
    isLoading,
    error
  }
}

export default useFetchCampaigns;