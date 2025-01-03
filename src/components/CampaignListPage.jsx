import React, { useState, useEffect } from 'react';
import { Alert, Box, CircularProgress } from '@mui/material';

import useTableFilters from '../hooks/useTableFilters';
import useFetchCampaigns from '../hooks/useFetchCampaigns';
import CampaignListTable from './CampaignListTable';
import CampaignListFilters from './CampaignListFilters';
import ComposeModal from './ComposeModal';

function CampaignListPage() {
  const [openModal, setOpenModal] = useState(false);
  const { campaignList, fetchCampaignList, isLoading, error } = useFetchCampaigns();
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

  const handleRefresh = () => {
    setOpenModal(false);
    fetchCampaignList()
  }

  useEffect(() => {
    fetchCampaignList();
  }, [fetchCampaignList]); // fetchCampaignList is wrapped in useCallback which avoids infinite loop here

  return (
    <Box className="container">
      <CampaignListFilters
        handleOpenModal={() => setOpenModal(true)}
        campaignList={filteredCampaigns}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />
      {isLoading ?
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
        : error ?
        <Alert severity="error">{error}</Alert>
        :
        <CampaignListTable
          campaignList={filteredCampaigns}
          orderBy={orderBy}
          order={order}
          handleSort={handleSort}
        />
      }

      <ComposeModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        handleRefresh={handleRefresh}
      />
    </Box>
  );
}

export default CampaignListPage;
