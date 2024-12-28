/** User registration dto. */
export type RegistrationDto = {

  /** User's email. */
  readonly email: string;

  /** User's first name. */
  readonly firstname: string;

  /** User's last name. */
  readonly lastname: string;

  /** User's password. */
  readonly password: string;
};
