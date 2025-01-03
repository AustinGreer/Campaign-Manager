import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import campaignSchema from '../utils/campaignSchema';
import { createCampaign, sendCampaignNotification } from '../services/campaignApi';

export default function useCampaignForm(handleRefresh) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      targetAudience: '',
      startDate: '',
      endDate: '',
      notificationMessage: ''
    },
    resolver: yupResolver(campaignSchema),
    mode: 'onSubmit'
  });

  const onSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        name: values.name.trim(),
        description: values.description.trim(),
        notificationMessage: values.notificationMessage.trim(),
        status: 'active',
        sends: 0,
        clicks: 0
      };

      const newCampaign = await createCampaign(payload);

      try {
        await sendCampaignNotification({
          ...newCampaign, // Use the created campaign data
          notificationMessage: payload.notificationMessage
        });
        toast.success(`Campaign ${values.name} created and notification sent successfully.`);
      } catch (notificationError) {
        // Campaign was created but notification failed
        toast.warning(`Campaign created but notification failed: ${notificationError.message}`);
        console.error('Notification error:', notificationError);
      }

      handleRefresh();
      reset();
    } catch (error) {
      toast.error(`An error occurred while creating the campaign: ${error}`);
    }
  }

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting
  };
}
