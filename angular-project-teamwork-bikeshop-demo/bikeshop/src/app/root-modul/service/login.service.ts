import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, from, Observable, tap } from 'rxjs';
import { Auth, signInWithEmailAndPassword, UserCredential } from "@angular/fire/auth";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedInStatus: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);

  public validMail: boolean = true;

  public get loggedInStatus$(): Observable<boolean | null> {
    return this.loggedInStatus.asObservable();
  }

  constructor(private router: Router, private auth: Auth) { }

  public login(loginData: any): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, loginData.email, loginData.password)).pipe(
      tap((userCredential) => {
        console.log('user adatok: ', userCredential);
        this.loggedInStatus.next(true);
        this.validMail = true;
        this.router.navigate(['adminProducts']);
      }),
      catchError((error) => {
        console.log(error);
        this.validMail = false;
        return error;
      })
    ) as Observable<UserCredential>;
  }

  public checkAuthState(): void {
    this.auth.onAuthStateChanged({
      next: (user) => {
        if (user) {
          console.log('van user initkor: ', user);
          this.loggedInStatus.next(true);
        }
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => { },
    })
  }

  public async logout(): Promise<void> {
    await this.auth.signOut();
    this.loggedInStatus.next(false);
  }
}
