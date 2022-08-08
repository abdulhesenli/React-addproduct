import * as yup from 'yup';

const Addvalidation = yup.object().shape({
    title: yup.string().required(),
    about: yup.string().required(),
    price: yup.string().required(),
    images:yup.string()
   
  });

  export default Addvalidation;