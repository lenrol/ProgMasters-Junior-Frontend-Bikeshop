import { Timestamp } from "@angular/fire/firestore";

export interface TicketModel {
  status: string;
  userID: number;
  date: string;
  date2: string;
  msg: string;
  id: string;
}
