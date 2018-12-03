import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelProperty()
  public readonly username: string;

  @ApiModelProperty()
  public readonly email: string;
}