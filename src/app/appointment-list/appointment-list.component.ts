import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit{

  appointmentTitle: string = '';
  appointmentDate: Date = new Date();

  /*appointments: Appointment[] = [
    {
      id: this.getUniqueId(),
      title: 'Check your BP',
      date: new Date('2023-07-30')
    },
    {
      id: this.getUniqueId(),
      title: 'Take a run',
      date: new Date('2023-07-30')
    },
  ];*/

  appointments: Appointment[] = [];

  ngOnInit(): void {
    const apts = localStorage.getItem('appointments');
    this.appointments = apts ? JSON.parse(apts) : [];
  }


  addAppointment() {
    if (this.appointmentTitle.trim().length && this.appointmentDate) {
      let appointment: Appointment = {
        id : this.getUniqueId(),
        title: this.appointmentTitle.trim(),
        date: new Date(this.appointmentDate)
      }

      this.appointments.push(appointment);
      this.appointmentTitle = '';
      this.appointmentDate = new Date();

      localStorage.setItem('appointments', JSON.stringify(this.appointments));
    }
  }

  getUniqueId() {
    return Math.floor(new Date().valueOf() * Math.random())
  }

  deleteAppointment(index: number) {
    if (this.appointments.length)
    {
      this.appointments.splice(index, 1);
      localStorage.setItem('appointments', JSON.stringify(this.appointments));
    }
  }
}
