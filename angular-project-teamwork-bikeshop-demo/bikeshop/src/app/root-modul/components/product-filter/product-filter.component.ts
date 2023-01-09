import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TicketModel } from '../../../shared-modul/model/ticket.model';
import { TicketListService } from '../../../shared-modul/service/ticket/ticket-list.service';


@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {

  searchInput = '';


  constructor(private ticketListService: TicketListService) { }

  ticketList: TicketModel[] = []
  ticketSub?: Subscription;
  filterList?: TicketModel[] = [];

  ngOnInit(): void { }

  searchTicket() {
    this.ticketSub = this.ticketListService.getTickets().subscribe({
      next: (tickets: TicketModel[]) => {
        this.ticketList = tickets;
        this.filterList = this.ticketList.filter(ticket => ticket.userID === +(this.searchInput))
      }
    })
  }
}
