import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, IsEmail } from 'class-validator';
import { Trim } from 'class-sanitizer';

export class UpdateUserDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  @Length(0, 50)
  @Trim()
  public readonly username: string;
}