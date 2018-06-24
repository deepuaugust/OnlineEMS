import {
  Component,
  OnInit,
  Input
} from '@angular/core';

import {
  Employee
} from './employee';

import {
  NgbModal,
  NgbActiveModal
} from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute, Router } from '@angular/router';

import {
  EmployeeService
} from './employee.service';

import {
  AddEmployeeComponent
} from './newemployee.component';


@Component({
  selector: 'ngbd-modal-content',
  template: `
      <div class="modal-header" style="background-color:lightgrey">
        <h4 class="modal-title">Edit Form</h4>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form #employeeForm="ngForm" (ngSubmit)="update(data)">
      <div class="form-group">
        <label for="fname">First Name:</label>
        <input type="text" [(ngModel)]="data.firstname" required class="form-control" id="fname" placeholder="Enter First Name" name="fname" #fname="ngModel">
        <div [hidden]="fname.valid || fname.pristine" class="alert alert-danger">
        First name is required
      </div>
        </div>
      <div class="form-group">
        <label for="lname">Last Name:</label>
        <input type="text" [(ngModel)]="data.lastname" required class="form-control" id="lname" placeholder="Enter Last Name" name="lname" #lname="ngModel">
        <div [hidden]="lname.valid || lname.pristine" class="alert alert-danger">
        Last name is required
      </div>
        </div>
      <div class="form-group">
          <label for="gender">Gender:</label>
          <select [(ngModel)]="data.genderval" required class="form-control" id="gender" name="gender" #gender="ngModel"><option value="Male">Male</option><option value="Female">Female</option></select>
          <div [hidden]="gender.valid || gender.pristine" class="alert alert-danger">
          Gender is required
        </div>
          </div>
        <div class="form-group">
          <label for="dob">DOB:</label>
          <input [(ngModel)]="data.dobval" required type="date" class="form-control" id="dob" placeholder="Enter DOB" name="dob" #dob="ngModel">
          <div [hidden]="dob.valid || dob.pristine" class="alert alert-danger">
          Date of Birth is required
        </div>
          </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" [(ngModel)]="data.emailval" required class="form-control" id="email" placeholder="Enter Email" name="email" #email="ngModel">
          <div [hidden]="email.valid || email.pristine" class="alert alert-danger">
          Email is required
        </div>
          </div>
      <div class="form-group">
        <label for="phone">Phone:</label>
        <input type="text" [(ngModel)]="data.phoneval" required class="form-control" id="phone" placeholder="Enter Phone" name="phone" #phone="ngModel">
        <div [hidden]="phone.valid || phone.pristine" class="alert alert-danger">
        Phone is required
      </div>
        </div>
      <div class="form-group" *ngIf="!hide">
      <label for="phone">ID:</label>
      <input type="number" [ngModel]="data.id" required class="form-control" id="id" name="id">
    </div>
    </form>
      </div>
      <div class="modal-footer">
        <button [disabled]="!employeeForm.form.valid" type="button" class="btn btn-primary" (click)="update(data)">Update</button>
        <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
      </div>
    `,
    styleUrls: ['./employee.component.css']
})
export class NgbdModalContent implements OnInit {
  public hide = true;
  public table: Employee[]
  public errorMessage: string
  public updateData
  public tabledata: string

  constructor(private _router: Router,public activeModal: NgbActiveModal, private _employeeservice: EmployeeService) {}

  ngOnInit() {
    if (localStorage.getItem("employee") === null) {
      this._employeeservice.getActivities()
        .subscribe(products => {
            this.table = products;
            console.log(this.table);
            localStorage.setItem("employee", JSON.stringify(this.table));
          },
          error => this.errorMessage = < any > error);
    } else {
      this.tabledata = localStorage.getItem("employee")
      this.table = JSON.parse(this.tabledata)
    }
  }

  update(employeedata) {
    var newData = {
      id:employeedata.id,
      fname:employeedata.firstname,
      lname:employeedata.lastname,
      dob:employeedata.dobval,
      email:employeedata.emailval,
      gender:employeedata.genderval,
      phone:employeedata.phoneval
    }
    var newobj = this.table.filter(x => x.id == employeedata.id)[0]
    var table = this.table
    table.forEach(function(item,index) {
      if (newData.id === item.id) {
        table[index] = newData
      }
    });
    this.activeModal.close('Close click')
    localStorage.setItem("employee",JSON.stringify(table))
    window.location.reload();
  }
}

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  //   template: `
  //     <div>HELLO</div>
  //   `,
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  public table: Employee[]
  public errorMessage: string
  public updateData
  public empdata: string

  constructor(private modalService: NgbModal, private _employeeservice: EmployeeService) {}

  ngOnInit() {
    if (localStorage.getItem("employee") === null) {
      this._employeeservice.getActivities()
        .subscribe(products => {
            this.table = products
            console.log(this.table);
            localStorage.setItem("employee", JSON.stringify(this.table));
          },
          error => this.errorMessage = < any > error);
    } else {
      this.empdata = localStorage.getItem("employee")
      this.table = JSON.parse(this.empdata)
    }
  }

  open(data) {
    const modalRef = this.modalService.open(NgbdModalContent);
    var empData = {
      id:data.id,
      firstname: data.fname,
      lastname:data.lname,
      genderval:data.gender,
      dobval:data.dob,
      emailval:data.email,
      phoneval:data.phone
    }
    modalRef.componentInstance.data = empData;
  }

}
