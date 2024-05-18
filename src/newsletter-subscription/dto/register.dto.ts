/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

/* eslint-disable prettier/prettier */
export class RegisterDto{
    @IsString()
    email:string;
    @IsString()
    centerName:string;
    @IsString()
    inviteFile:string;

}