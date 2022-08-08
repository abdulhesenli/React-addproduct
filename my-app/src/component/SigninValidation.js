import * as yup from 'yup';

const Signinvalidation = yup.object().shape({
    email: yup.string().email('Duzgun email daxil edin').required('daxil edin'),
    password:yup.string().required('Daxil edin'),
  });

  export default Signinvalidation;