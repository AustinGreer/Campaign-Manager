import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, Checkbox, FormControlLabel, FormControl, InputLabel, Select, MenuItem, OutlinedInput, ListItemText } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import dayjs from 'dayjs';
import { toast } from 'react-toastify';
// import { createCampaign, sendNotification } from '../services/campaignApi';

// Example audiences
const availableAudiences = [
  { label: 'Mobile Users', value: 'mobile-users' },
  { label: 'Email Subscribers', value: 'email-subscribers' },
  { label: 'Push Notification Users', value: 'push-users' }
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#2c2c2c',
  color: '#fff',
  p: '2rem',
  width: '500px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0,0,0,0.7)',
  boxSizing: 'border-box',
}

function NewComposureModal({ open, onClose, onCreated }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // const validateForm = () => {
  //   if (!name.trim()) {
  //     toast.error('Campaign Name is required');
  //     return false;
  //   }
  //   if (!notificationMessage.trim()) {
  //     toast.error('Notification Message is required');
  //     return false;
  //   }
  //   return true;
  // };

  // const handleSubmit = async () => {
  //   if (!validateForm()) return;
  //   setSubmitting(true);

  //   const payload = {
  //     name: name.trim(),
  //     description: description.trim(),
  //     targetAudience,
  //     startDate: startDate ? startDate.format('YYYY-MM-DD') : null,
  //     endDate: endDate ? endDate.format('YYYY-MM-DD') : null,
  //     notificationMessage: notificationMessage.trim(),
  //     status: 'draft', // default status, can be changed as needed
  //     sends: 0,
  //     clicks: 0
  //   };

  //   try {
  //     const newCampaign = await createCampaign(payload);
  //     toast.success('Campaign created successfully!');

  //     // Optionally, send push notifications after creation:
  //     // if (targetAudience.length > 0) {
  //     //   await sendNotification({ campaignId: newCampaign.id, audience: targetAudience });
  //     //   toast.success('Notifications sent successfully!');
  //     // }

  //     onCreated(newCampaign);
  //   } catch (error) {
  //     console.error(error);
  //     toast.error('Failed to create campaign');
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleAudienceChange = (event) => {
    const value = event.target.value;
    setTargetAudience(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6">New Campaign</Typography>

        <TextField
          label="Campaign Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!name.trim()}
        // helperText={!name.trim() ? "Required" : ""}
        />

        <TextField
          label="Description"
          multiline
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <FormControl>
          <InputLabel id="target-audience-label">Target Audience</InputLabel>
          <Select
            labelId="target-audience-label"
            multiple
            value={targetAudience}
            onChange={handleAudienceChange}
            input={<OutlinedInput label="Target Audience" />}
            renderValue={(selected) =>
              selected
                .map((val) => availableAudiences.find(a => a.value === val)?.label)
                .join(', ')
            }
          >
            {availableAudiences.map((aud) => (
              <MenuItem key={aud.value} value={aud.value}>
                <Checkbox checked={targetAudience.indexOf(aud.value) > -1} />
                <ListItemText primary={aud.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
        /> */}

        <TextField
          label="Notification Message"
          required
          multiline
          value={notificationMessage}
          onChange={(e) => setNotificationMessage(e.target.value)}
          error={!notificationMessage.trim()}
          helperText={!notificationMessage.trim() ? "Required" : ""}
        />

        <Box display="flex" justifyContent="flex-end" gap="1rem">
          <Button onClick={onClose} variant="outlined" disabled={submitting}>Cancel</Button>
          <Button onClick={() => { }} variant="contained" color="primary" disabled={submitting}>
            {submitting ? 'Saving...' : 'Save'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default NewComposureModal;
