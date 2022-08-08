import * as yup from 'yup';

const validation = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string().email('Duzgun email daxil edin').required('daxil edin'),
    password:yup.string().required('Daxil edin'),
  });

  export default validation;