/* eslint-disable prettier/prettier */
import { IsArray, IsString } from "class-validator";
interface Guest {
    name: string;
    email: string;
}
/* eslint-disable prettier/prettier */
export class CalendarEventDto{
    @IsString()
    id: string;
    @IsString()
    start: string;
    @IsString()
    end: string;
    @IsString()
    description: string;
    @IsString()
    location: string;
    @IsString()
    title: string;
    @IsString()
    url: string;
    @IsArray()
    attendees: Guest[];
    @IsString()
    rrule: string;
    @IsString()
    timeZoneStart: string;
    @IsString()
    timeZoneEnd: string;
    @IsString()
    timeZone: string;
    @IsString()
    organizerName: string;
    @IsString()
    organizerMail: string;

}

