import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import { getAllCampaigns } from '../services/campaignApi';
import CampaignListTable from './CampaignListTable';
import CampaignListFilters from './CampaignListFilters';
import useTableFilters from '../hooks/useTableFilters';

function CampaignListPage() {
  const [campaignList, setCampaignList] = useState([]);

  const {
    orderBy,
    order,
    handleSort,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    filteredCampaigns
  } = useTableFilters(campaignList);

  useEffect(() => {
    const fetchCampaignList = async () => {
      const response = await getAllCampaigns();
      setCampaignList(response);
    };

    fetchCampaignList();
  }, []);

  return (
    <Box className="container">
      <CampaignListFilters
        campaignList={filteredCampaigns}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />
      <CampaignListTable
        campaignList={filteredCampaigns}
        orderBy={orderBy}
        order={order}
        handleSort={handleSort}
      />
    </Box>
  );
}

export default CampaignListPage;
