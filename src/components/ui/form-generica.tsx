/* eslint-disable react/react-in-jsx-scope */
import { Formik, FormikProps, FormikValues } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { ZodSchema } from 'zod';

interface GenericFormProps<T> {
  initialValues: T;
  validationSchema: ZodSchema<T>;
  onSubmit: (values: T) => void;
  children: (formikProps: FormikProps<T>) => React.ReactNode;
}
export function GenericForm<T extends FormikValues>({
  initialValues,
  validationSchema,
  onSubmit,
  children,
}: GenericFormProps<T>) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={withZodSchema(validationSchema)}
    >
      {(formikProps) => (
        <>
          {children(formikProps)}
        </>
      )}
    </Formik>
  )
}
