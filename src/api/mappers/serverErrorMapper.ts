import { type ServerError } from 'src/models/serverError';

import { type ServerErrorDto } from '../dtos/serverErrorDto';

export namespace ServerErrorsMapper {

  /**
   * Maps server errors from dto.
   * @param dto Server errors dto.
   */
  export function fromDto(dto: ServerErrorDto[]): ServerError[] {
    const errorMap = new Map<string, string[]>();
    dto.forEach(error => {
      let errorField = error.attr;
      if (!errorMap.has(errorField)) {
        if (error.attr === null) {
          errorField = 'form';
        }
        errorMap.set(errorField, []);
      }
      errorMap.get(errorField)?.push(error.detail);
    });
    const result: ServerError[] = [];
    errorMap.forEach((controlErrors, controlName) => {
      result.push({ controlName, controlErrors });
    });
    return result;
  }
}
