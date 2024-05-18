/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { RegisterDto } from '../dto/register.dto';
import { readFileSync } from 'fs';
import * as hbs from 'handlebars';
import { join } from 'path';
import { CalendarEventDto } from '../dto/calendarEvent.dto';

@Injectable()
export class SendMailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendRegister(registerDto:RegisterDto, calendarEventoDto:CalendarEventDto) {
    const {centerName, email} = registerDto;
    const calendarFile = this.generateIcalString(calendarEventoDto)

    await this.sendMailTemplate(
      email, 
      `Bienvenido ${centerName}`, 
      'register', 
      calendarFile,
      registerDto
      )
  }

  generateIcalString(calendarEvent:CalendarEventDto) {
    const {
      id, 
      start, 
      end, 
      description, 
      location, 
      title, 
      url, 
      attendees, 
      rrule, 
      timeZoneStart, 
      timeZoneEnd, 
      timeZone, 
      organizerName,
      organizerMail
    } = calendarEvent;

    let attends = '';
    rrule ? 'RRULE:' + rrule + '\n' : '';
    console.log('RRULE: ', rrule)

    attendees.forEach((attend, index) => {
      attends += `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN=${
        attend.name ?? attend.email
      };X-NUM-GUESTS=${index}:mailto:${attend.email}\n`;
    });
    /* if (attendees.length > 0) {
      attends +=
        `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;RSVP=TRUE;CN="${name}";X-NUM-GUESTS=0:mailto:${email}\n` +
        attends;
    } */

    console.log('attends ', ' ' , attends);

    console.log('start ', start, ' end ', end);

    function getTransformateDateToStringYYYYMMDDHHMMSSZ(date) {
      const pad = (num) => {
        return ('0' + num).slice(-2);
      }
    
      const dateObj = new Date(date);
      const year = dateObj.getUTCFullYear();
      const month = pad(dateObj.getUTCMonth());
      const day = pad(dateObj.getUTCDate());
      const hours = pad(dateObj.getUTCHours());
      const minutes = pad(dateObj.getUTCMinutes());
      const seconds = pad(dateObj.getUTCSeconds());
    
      return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
    }

    //const newStart = start.split('-')[0];
    //const newEnd = end.split('-')[0];

    const newStart = start.replace(/[-:]/g, '');
    const newEnd = end.replace(/[-:]/g, '');

    console.log('new ', newStart,' ' ,'end ',newEnd);

    const now = getTransformateDateToStringYYYYMMDDHHMMSSZ(new Date());
    console.log(now);
    return (
      'BEGIN:VCALENDAR\n' +
      'PRODID:-//TherappyHub.com//TherappyHub Workspace //ES\n' +
      'VERSION:2.0\n' +
      'CALSCALE:GREGORIAN\n' +
      'METHOD:REQUEST\n' +
      'BEGIN:VTIMEZONE\n' +
      'TZID:'+timeZone+'\n' +
      'X-LIC-LOCATION:'+timeZone+'\n' +
      'BEGIN:STANDARD\n' +
      'TZOFFSETFROM:'+timeZoneStart+'\n' +
      'TZOFFSETTO:'+timeZoneEnd+'\n' +
      'TZNAME:-04\n' +
      'DTSTART:19700405T000000\n' +
      'RRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU\n' +
      'END:STANDARD\n' +
      'BEGIN:DAYLIGHT\n' +
      'TZOFFSETFROM:'+timeZoneStart+'\n' +
      'TZOFFSETTO:'+timeZoneEnd+'\n' +
      'TZNAME:-03\n' +
      'DTSTART:19700906T010000\n' +
      'RRULE:FREQ=YEARLY;BYMONTH=9;BYDAY=1SU\n' +
      'END:DAYLIGHT\n' +
      'END:VTIMEZONE\n' +
      'BEGIN:VEVENT\n' +
      'DTSTART;TZID='+timeZone+':' + newStart + '\n' +
      'DTEND;TZID='+timeZone+':' + newEnd + '\n' +
      'DTSTAMP:' + newStart + 'Z\n' +
      'ORGANIZER;CN="'+organizerName+'":mailto:'+organizerMail+'\n' +
      `UID:${id}@${url}\n` +
      'RRULE:' + rrule + '\n' + 
      attends + 
      'X-MICROSOFT-CDO-OWNERAPPTID:374832394\n' +
      'CREATED:' + now + '\n' +
      'LOCATION;LANGUAGE=es-419:' + location + '\n' +
      'DESCRIPTION:' + description + '\n' +
      'LAST-MODIFIED:' + now + '\n' + 
      'SEQUENCE:0\n' +
      'STATUS:CONFIRMED\n' +
      'SUMMARY:' + title + '\n' +
      'TRANSP:OPAQUE\n' +
      'BEGIN:VALARM\n' +
      'ACTION:DISPLAY\n' +
      'DESCRIPTION:This is an event reminder\n' +
      'TRIGGER:-P0DT0H30M0S\n' +
      'END:VALARM\n' +
      'END:VEVENT\n' +
      'END:VCALENDAR'
    );
  }
  

  async sendMailTemplate(to: string,
    subject: string,
    template: string,
    calendarFile: string,
    context: any,
  ) {
    const templatePath = join(__dirname, 'template', `${template}.hbs`);
    const source = readFileSync(templatePath, 'utf-8').toString();
    const compiledTemplate = hbs.compile(source);

    const mailOptions = {
      to,
      subject,
      html: compiledTemplate(context),
      icalEvent:{
        filename:'TherappyHub-workspace.ics',
        method:'request',
        content:calendarFile,
      }
    };

    const alternatives = {
      'Content-Type': 'text/calendar',
      method: 'REQUEST',
      content: Buffer.from(calendarFile),
      component: 'VEVENT',
      'Content-Class': 'urn:content-classes:calendarmessage',
    };

    mailOptions['alternatives'] = alternatives;
    mailOptions['alternatives']['contentType'] = 'text/calendar';
    mailOptions['alternatives']['contentDisposition'] = 'attachment';
    mailOptions['alternatives']['content'] = Buffer.from(calendarFile);

    await this.mailerService
    .sendMail(mailOptions)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  }
}
