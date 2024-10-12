import { type PropsWithChildren, useEffect } from 'react';
import { type FormikConfig, FormikProvider, useFormik } from 'formik';

import type { AppError } from 'src/models/appError';
import { typedMemo } from 'src/utils/types/typedMemo';

type Props<T extends object> = {

  /** Formik config. */
  readonly formikConfig: FormikConfig<T>;

  /** Error. */
  readonly error?: AppError<T>;
};

/** App form component. */
const AppFormComponent = <T extends object>({
  children, error, formikConfig,
}: PropsWithChildren<Props<T>>) => {
  const formik = useFormik(formikConfig);

  useEffect(() => {
    if (error != null) {
      formik.setErrors({ ...error.validationData });
    }
    formik.setSubmitting(false);

  // formik is not in deps, because `setSubmitting` and `setError` cause formik update
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <FormikProvider value={formik}>
      {children}
    </FormikProvider>
  );
};

/** App form component. */
export const AppForm = typedMemo(AppFormComponent);
