import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TicketModel } from 'src/app/shared-modul/model/ticket.model';
import { TicketListService } from 'src/app/shared-modul/service/ticket/ticket-list.service';

@Component({
  selector: 'app-admin-tickets',
  templateUrl: './admin-tickets.component.html',
  styleUrls: ['./admin-tickets.component.scss']
})
export class AdminTicketsComponent implements OnInit {

  tickets$?: Observable<TicketModel[]>;

  constructor(private ticketListService: TicketListService, private router: Router) { }

  ngOnInit(): void {
    this.tickets$ = this.ticketListService.getTickets();
  }

  public async addTicket() {
    await this.router.navigate(['adminTickets/edit']);
  }

  public async updateTicket(ticketId: string) {
    await this.router.navigate(['adminTickets', ticketId, 'edit']);
  }

  public deleteTicket(ticketId: string): void {
    if (confirm(`Do you wanna delete this ticket with this ${ticketId}? ID?`)) {
      this.ticketListService.deleteTicket(ticketId).subscribe();
    }
  }



}
