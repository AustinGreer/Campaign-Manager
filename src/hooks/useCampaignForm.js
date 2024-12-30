import { useState } from 'react';
import { toast } from 'react-toastify';
import { createCampaign } from '../services/campaignApi';

export default function useCampaignForm() {
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    targetAudience: '',
    startDate: '',
    endDate: '',
    notificationMessage: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.name.trim()) {
      newErrors.name = 'Campaign Name is required';
    }

    if (!formValues.notificationMessage.trim()) {
      newErrors.notificationMessage = 'Notification Message is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (fieldName, newValue) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: newValue,
    }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error('Please fix validation errors');
      return;
    }
    setSubmitting(true);

    try {
      const payload = {
        ...formValues,
        name: formValues.name.trim(),
        description: formValues.description.trim(),
        notificationMessage: formValues.notificationMessage.trim(),
        status: 'active',
        sends: 0,
        clicks: 0,
      };

      const newCampaign = await createCampaign(payload);

      toast.success('Campaign created successfully!');
      return newCampaign;
    } catch (error) {
      console.error(error);
      toast.error('Failed to create campaign');
    } finally {
      setSubmitting(false);
    }
  };

  return {
    formValues,
    errors,
    submitting,
    handleChange,
    handleDateChange,
    handleSubmit,
  };
}
