import * as Yup from 'yup';

const campaignSchema = Yup.object().shape({
  name: Yup.string().required("Please provide a name for this campaign"),
  description: Yup.string(),
  targetAudience: Yup.string().required("Please select a target audience"),
  startDate: Yup.string(),
  endDate: Yup.string(),
  notificationMessage: Yup.string().required("Please provide a notification message")
});

export default campaignSchema;