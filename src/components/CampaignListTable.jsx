import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper
} from '@mui/material';

function CampaignListTable({ campaignList, orderBy, order, handleSort }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'name'}
                direction={orderBy === 'name' ? order : 'asc'}
                onClick={() => handleSort('name')}
              >
                Campaign Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'status'}
                direction={orderBy === 'status' ? order : 'asc'}
                onClick={() => handleSort('status')}
              >
                Status
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'startDate'}
                direction={orderBy === 'startDate' ? order : 'asc'}
                onClick={() => handleSort('startDate')}
              >
                Start Date
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'endDate'}
                direction={orderBy === 'endDate' ? order : 'asc'}
                onClick={() => handleSort('endDate')}
              >
                End Date
              </TableSortLabel>
            </TableCell>
            <TableCell>Target Audience</TableCell>
            <TableCell>Sends</TableCell>
            <TableCell>Clicks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {campaignList?.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell>{campaign.name}</TableCell>
              <TableCell>{campaign.status}</TableCell>
              <TableCell>
                {new Date(campaign.startDate).toLocaleDateString('en-US', { timeZone: 'UTC' })}
              </TableCell>
              <TableCell>
              {new Date(campaign.endDate).toLocaleDateString('en-US', { timeZone: 'UTC' })}
              </TableCell>
              <TableCell>{campaign.targetAudience}</TableCell>
              <TableCell>{campaign.sends}</TableCell>
              <TableCell>{campaign.clicks}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CampaignListTable;
