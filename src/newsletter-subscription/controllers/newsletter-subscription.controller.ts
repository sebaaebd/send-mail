/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { SendMailService } from '../services/sendMail.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDto } from '../dto/register.dto';
import { CalendarEventDto } from '../dto/calendarEvent.dto';

@ApiTags('Newsletter')
@Controller('newsletter')
export class NewsletterSubscriptionController {
  constructor(
    private readonly sendMailService: SendMailService,
  ) {}

  @Post("/register")
  async register(@Body() registerDto: RegisterDto, @Body()calendarEventDto:CalendarEventDto) {
    await this.sendMailService.sendRegister(registerDto,calendarEventDto);
  }
}
