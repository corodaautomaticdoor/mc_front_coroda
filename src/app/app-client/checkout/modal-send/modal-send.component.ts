import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CheckoutComponent } from '../checkout.component';

@Component({
  selector: 'app-modal-send',
  templateUrl: './modal-send.component.html',
  styleUrls: ['./modal-send.component.scss']
})
export class ModalSendComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CheckoutComponent>) { }
  ngOnInit(): void {
  }

}
