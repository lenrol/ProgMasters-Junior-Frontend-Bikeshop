import { RootModulModule } from './root-modul/root-modul.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { IntroComponent } from './root-modul/components/intro/intro.component';
import { InfoComponent } from './root-modul/components/info/info.component';
import { DelayDirective } from './root-modul/directive/delay.directive';
import { ProductFilterComponent } from './root-modul/components/product-filter/product-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModulModule } from './shared-modul/shared-modul.module';
import { AppRoutingModule } from './app-routing.module';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    InfoComponent,
    DelayDirective,
    ProductFilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RootModulModule,
    SharedModulModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
