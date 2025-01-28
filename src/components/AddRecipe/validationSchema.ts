import * as Yup from 'yup';

export const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  ingredients: Yup.array()
    .of(Yup.string().required('Ingredient is required'))
    .min(1, 'At least one ingredient is required'),
  steps: Yup.array()
    .of(Yup.string().required('Step is required'))
    .min(1, 'At least one step is required'),
  preparationTime: Yup.number()
    .typeError('Preparation time must be a number')
    .required('Preparation time is required'),
  image: Yup.string().required('Image is required'),
});
