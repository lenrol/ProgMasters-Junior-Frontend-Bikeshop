import { Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, deleteDoc, getDoc, setDoc, addDoc, DocumentData } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { TicketModel } from '../../model/ticket.model';


@Injectable({
  providedIn: 'root'
})
export class TicketListService {

  private readonly ticketsCollectionRef = collection(this.firestore, 'ticket');

  constructor(private firestore: Firestore) { }

  getTickets(): Observable<TicketModel[]> {
    return collectionData(this.ticketsCollectionRef, { idField: 'id' }) as Observable<TicketModel[]>
  }

  deleteTicket(ticketId: string): Observable<void> {
    const ticketDoc = doc(this.firestore, `ticket/${ticketId}`);
    return from(deleteDoc(ticketDoc));
  }

  getTicketWithGetDoc(id: string) {
    const ticketDoc = doc(this.firestore, `ticket/${id}`);
    return from(getDoc(ticketDoc)).pipe(
      map(doc => {
        const ticketData: TicketModel = doc.data() as TicketModel;
        ticketData.id = doc.id;
        return ticketData
      })
    )
  }

  updateTicket(ticket: TicketModel): Observable<void> {
    const ticketDoc = doc(this.firestore, `ticket/${ticket.id}`);
    return from(setDoc(ticketDoc, ticket));
  }

  addTicket(ticket: TicketModel): Observable<DocumentData> {
    return from(addDoc(this.ticketsCollectionRef, ticket))
  }


}
