import { ChangePasswordDTO } from '@src/users/dto/change-password-dto';

export interface ChangePassWordType extends ChangePasswordDTO {
  userId: string;
}
