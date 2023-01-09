import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TicketModel } from 'src/app/shared-modul/model/ticket.model';
import { TicketListService } from 'src/app/shared-modul/service/ticket/ticket-list.service';

@Component({
  selector: 'app-admin-tickets-detail',
  templateUrl: './admin-tickets-detail.component.html',
  styleUrls: ['./admin-tickets-detail.component.scss']
})
export class AdminTicketsDetailComponent implements OnInit {

  ticketDetailsForm: FormGroup = new FormGroup({
    status: new FormControl('', [Validators.required]),
    userID: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    date2: new FormControl('', [Validators.required]),
    msg: new FormControl(''),
  })

  get status() { return this.ticketDetailsForm.get('status') };
  get userID() { return this.ticketDetailsForm.get('userID') };
  get date() { return this.ticketDetailsForm.get('date') };
  get date2() { return this.ticketDetailsForm.get('date2') };
  get msg() { return this.ticketDetailsForm.get('msg') };

  @ViewChild('submitBtn') btn?: ElementRef<HTMLButtonElement>;

  updateTicketId?: string;

  constructor(private activatedRoute: ActivatedRoute, private ticketListService: TicketListService, private router: Router) { }

  ngOnInit(): void {
    console.log('Betöltéskor a customer ID:' + this.updateTicketId);
    this.activatedRoute.paramMap.subscribe({
      next: (params: ParamMap) => {
        let ticketId = params.get('index');
        console.log('van customerId?' + ticketId);
        if (ticketId) {
          this.ticketListService.getTicketWithGetDoc(ticketId).subscribe({
            next: data => {
              this.ticketDetailsForm.patchValue(data);
              this.updateTicketId = data.id;
            }
          })
        }
      }
    })
  }

  submitDetailsForm() {
    console.log(this.ticketDetailsForm.value);
    console.log(this.btn?.nativeElement);                   // Kvázi hasonló, mint amikor getElementByID-val elkaptam a btn elemet
    this.btn?.nativeElement.setAttribute('style', 'color:orange');

    const newProduct: TicketModel = this.ticketDetailsForm.value;

    if (this.updateTicketId) {
      newProduct.id = this.updateTicketId;
      this.ticketListService.updateTicket(newProduct).subscribe();
    } else {
      this.ticketListService.addTicket(newProduct).subscribe({
        next: (docRef) => {
          console.log("Ticket saved with ID: ", docRef['id'])
        },
        error: err => console.error(err),
        complete: () => { }
      })
    }
    this.router.navigate(['adminTickets'])
  }

}
