import React from 'react';
import { Box, TextField, MenuItem, Button } from '@mui/material';
import { CSVLink } from 'react-csv';

const headers = [
  { label: "Name", key: "name" },
  { label: "Status", key: "status" },
  { label: "Start Date", key: "startDate" },
  { label: "End Date", key: "endDate" },
  { label: "Target Audience", key: "targetAudience" },
  { label: "Sends", key: "sends" },
  { label: "Clicks", key: "clicks" }
];


function CampaignListFilters({ handleOpenModal, campaignList, statusFilter, setStatusFilter, dateFilter, setDateFilter }) {  
  return (
    <Box className="filter-controls">
      <TextField
        className="filter-control"
        name="statusFilter"
        select
        label="Status Filter"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <MenuItem value="">All Status</MenuItem>
        <MenuItem value="active">Active</MenuItem>
        <MenuItem value="inactive">Inactive</MenuItem>
        <MenuItem value="completed">Completed</MenuItem>
        <MenuItem value="draft">Draft</MenuItem>
      </TextField>

      <TextField
        className="filter-control"
        type="date"
        name="date"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
      />

      <Box sx={{ marginLeft: 'auto', display: 'flex', gap: 2 }}>
        <Button
          variant='outlined'
          size='small'
          color='primary'
          sx={{
            textTransform: 'none'
          }}
          onClick={handleOpenModal}
        >
          New Compose
        </Button>

        <Button variant='contained' size='small' sx={{textTransform: 'none'}}>
          <CSVLink
            data={campaignList}
            headers={headers}
            filename="campaign_report.csv"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Export Report
          </CSVLink>
        </Button>
      </Box>
    </Box>
  );
}

export default CampaignListFilters;
