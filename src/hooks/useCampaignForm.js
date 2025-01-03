import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import campaignSchema from '../utils/campaignSchema';
import { createCampaign } from '../services/campaignApi';

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

      await createCampaign(payload);

      toast.success(`Added campaign ${values.name} successfully.`);
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
