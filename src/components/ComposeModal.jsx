import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Button,
  Box
} from '@mui/material';

import useCampaignForm from '../hooks/useCampaignForm';

const availableAudiences = [
  'Mobile Users',
  'Email Subscribers',
  'Push Notification Users'
];

function ComposeModal({ open, onClose }) {
  const {
    formValues,
    errors,
    submitting,
    handleChange,
    handleDateChange,
    handleSubmit,
  } = useCampaignForm();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: '#2c2c2c',
          color: '#fff',
          '& .MuiFormLabel-root, & .MuiInputBase-root, & .MuiOutlinedInput-notchedOutline, & .MuiSelect-icon,& .MuiOutlinedInput-input': {
            color: '#fff',
          },
        },
      }}
    >
      <DialogTitle>New Campaign</DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          name="name"
          label="Campaign Name"
          required
          value={formValues.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
        />

        <TextField
          name="description"
          label="Description"
          multiline
          value={formValues.description}
          onChange={handleChange}
        />

        <FormControl>
          <InputLabel id="target-audience-label">Target Audience</InputLabel>
          <Select
            labelId="target-audience-label"
            name="targetAudience"
            value={formValues.targetAudience}
            onChange={handleChange}
            input={<OutlinedInput label="Target Audience" />}
          >
            {availableAudiences.map(aud => (
              <MenuItem key={aud} value={aud}>
                {aud}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            name="startDate"
            type="date"
            label="Start Date"
            value={formValues.startDate || ''}
            onChange={(e) => handleDateChange('startDate', e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="endDate"
            type="date"
            label="End Date"
            value={formValues.endDate || ''}
            onChange={(e) => handleDateChange('endDate', e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        <TextField
          name="notificationMessage"
          label="Notification Message"
          required
          multiline
          value={formValues.notificationMessage}
          onChange={handleChange}
          error={!!errors.notificationMessage}
          helperText={errors.notificationMessage}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined" disabled={submitting}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ComposeModal;