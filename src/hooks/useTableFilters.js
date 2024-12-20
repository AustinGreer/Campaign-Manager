import { useState, useMemo } from 'react';

export default function useTableFilters(campaignList) {
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredCampaigns = useMemo(() => {
    if (!campaignList) return [];

    let filtered = campaignList.filter(campaign => {
      const matchesStatus = !statusFilter || campaign.status === statusFilter;
      const matchesDate = !dateFilter ||
        campaign.startDate.includes(dateFilter) ||
        campaign.endDate.includes(dateFilter);

      return matchesStatus && matchesDate;
    });

    return filtered.sort((a, b) => {
      if (orderBy === 'startDate' || orderBy === 'endDate') {
        return order === 'asc'
          ? new Date(a[orderBy]) - new Date(b[orderBy])
          : new Date(b[orderBy]) - new Date(a[orderBy]);
      }

      return order === 'asc'
        ? (a[orderBy] < b[orderBy] ? -1 : 1)
        : (b[orderBy] < a[orderBy] ? -1 : 1);
    });
  }, [campaignList, orderBy, order, statusFilter, dateFilter]);

  return {
    orderBy,
    order,
    handleSort,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    filteredCampaigns
  };
}
