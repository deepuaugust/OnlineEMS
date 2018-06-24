import {
  BrowserModule
} from '@angular/platform-browser';
import {
  NgModule
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  RouterModule
} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {
  NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import {
  NgbModal,
  NgbActiveModal
} from '@ng-bootstrap/ng-bootstrap';
import {
  AppComponent
} from './app.component';
import {
  NgbdModalContent
} from './employee/employee.component';
import {
  EmployeeComponent
} from './employee/employee.component';
import {
  AddEmployeeComponent
} from './employee/newemployee.component';
import { EmployeeService } from './employee/employee.service'

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    NgbdModalContent,
    AddEmployeeComponent
  ],
  entryComponents: [
    NgbdModalContent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([{
        path: 'employee',
        component: EmployeeComponent
      },
      {
        path: '',
        redirectTo: 'employee',
        pathMatch: 'full'
      },
      { path: 'add',
      component: AddEmployeeComponent},
    ],{onSameUrlNavigation: 'reload'}),
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
