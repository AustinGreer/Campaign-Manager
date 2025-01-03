import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Button,
  Box
} from '@mui/material';
import { Controller } from 'react-hook-form';

import { availableAudiences } from '../utils/constants';
import useCampaignForm from '../hooks/useCampaignForm';

function ComposeModal({ open, onClose, handleRefresh }) {
  const { control, handleSubmit, onSubmit, errors, isSubmitting } = useCampaignForm(handleRefresh)

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#2c2c2c',
          color: '#fff'
        }
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>New Campaign</DialogTitle>

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Campaign Name"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                multiline
              />
            )}
          />

          <Controller
            name="targetAudience"
            control={control}
            render={({ field }) => (
              <FormControl>
                <InputLabel id="target-audience-label">
                  Target Audience
                </InputLabel>
                <Select
                  {...field}
                  labelId="target-audience-label"
                  input={<OutlinedInput label="Target Audience" />}
                >
                  {availableAudiences.map((aud, index) => (
                    <MenuItem key={index} value={aud}>
                      {aud}
                    </MenuItem>
                  ))}
                </Select>

                {errors.targetAudience && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.targetAudience.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="date"
                  label="Start Date"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />

            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="date"
                  label="End Date"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Box>

          <Controller
            name="notificationMessage"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Notification Message"
                multiline
                error={!!errors.notificationMessage}
                helperText={errors.notificationMessage?.message}
              />
            )}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="outlined" disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ComposeModal;