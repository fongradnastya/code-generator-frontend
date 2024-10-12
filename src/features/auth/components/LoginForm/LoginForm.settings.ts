import * as Yup from 'yup';

import { type Login } from 'src/models/loginValues';

/** Login form. */
export type LoginFormValue = Login;

/** Login form initial values. */
export const initValues: LoginFormValue = {
  email: '',
  password: '',
};

/** Login form schema. */
export const loginFormSchema: Yup.Schema<LoginFormValue> = Yup.object().shape({
  email: Yup.string().email('Invalid email')
    .required('Required'),
  password: Yup.string().required(),
});
