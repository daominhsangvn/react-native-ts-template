import {ValidationError} from 'yup';

export const yupResolver = (validationSchema: any) => async (data: any) => {
  try {
    const values = await validationSchema.validate(data, {
      abortEarly: false,
    });

    return {
      values,
      errors: {},
    };
  } catch (errors: any) {
    return {
      values: {},
      errors: errors.inner.reduce(
        (allErrors: any, currentError: ValidationError) => ({
          ...allErrors,
          [currentError.path as keyof ValidationError]: {
            type: currentError.type ?? 'validation',
            message: currentError.message,
          },
        }),
        {},
      ),
    };
  }
};
