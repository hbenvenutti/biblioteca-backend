import * as yup from 'yup';
import yupPassword from 'yup-password';

import { UserCreationRequest } from '@accounts:dtos/Users.dto';
import { ValidationProviderInterface } from '@shared:containers/providers/validation/Validation.provider.interface';
import { hasOnlyLetters } from '@shared:utils/hasOnlyLetters';
import { SessionCreationRequest } from '@accounts:dtos/Sessions.dto';
import { BookCreationData } from '@books:dtos/Book';

// ---------------------------------------------------------------------------------------------- //

export class YupValidationProvider implements ValidationProviderInterface {
  private nameMinimum = 3;
  private passwordMinimumLength = 8;
  private passwordMaximumLength = 30;
  private passwordMinimumUpper = 1;
  private passwordMinimumNumbers = 1;
  private passwordMinimumRepeating = 3;
  private passwordMinimumSymbols = 1;

  constructor() {
    yupPassword(yup);
  }

  async validateUserCreationData(data: UserCreationRequest): Promise<boolean> {
    const userCreationSchema = yup
      .object()
      .shape({
        name: yup
          .string()
          .strict()
          .min(this.nameMinimum)
          .required(),

        lastName: yup
          .string()
          .strict()
          .min(this.nameMinimum)
          .required(),

        email: yup
          .string()
          .email()
          .required(),

        password: yup
          .string()
          .password()
          .min(this.passwordMinimumLength)
          .max(this.passwordMaximumLength)
          .minUppercase(this.passwordMinimumUpper)
          .minNumbers(this.passwordMinimumNumbers)
          .minRepeating(this.passwordMinimumRepeating)
          .minSymbols(this.passwordMinimumSymbols)
          .required()
      });

    const nameHasNoNumbers = hasOnlyLetters(data.name);
    const lastNameHasNoNumbers = hasOnlyLetters(data.lastName);

    if (!nameHasNoNumbers || !lastNameHasNoNumbers) return false;

    return await userCreationSchema.isValid(data);
  }

  async validateSessionData(data: SessionCreationRequest): Promise<boolean> {
    const sessionCreationSchema = yup
      .object()
      .shape({
        email: yup
          .string()
          .email()
          .required(),

        password: yup
          .string()
          .strict()
          .required()
      });

    return await sessionCreationSchema.isValid(data);
  }

  async validateBookCreationData(data: BookCreationData): Promise<boolean> {
    const bookCreationSchema = yup
      .object()
      .shape({
        title: yup.string().strict().required(),
        author: yup.string().strict().required(),
        publisher: yup.string().strict().required(),
        edition: yup.string().strict().required(),
        synopsis: yup.string().strict().required()
      });

    return await bookCreationSchema.isValid(data);
  }

  async validateBookUpdateData(data: BookCreationData): Promise<boolean> {
    const bookUpdateSchema = yup
      .object()
      .shape({
        id: yup.string().strict().required(),
        title: yup.string().strict().required(),
        author: yup.string().strict().required(),
        publisher: yup.string().strict().required(),
        edition: yup.string().strict().required(),
        synopsis: yup.string().strict().required()
      });

    return await bookUpdateSchema.isValid(data);
  }
}
