import { type MessageSeverity } from './messageSeverity';

/** Alert message. */
export type AlertMessage = {

  /** Alert message severity. */
  readonly severity: MessageSeverity;

  /** Alert message text. */
  readonly message: string;
};
