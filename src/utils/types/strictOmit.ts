/** A wrapper over `Omit` that allows you to use autocomplete. */
export type StrictOmit<T, K extends keyof T> = Omit<T, K>;
