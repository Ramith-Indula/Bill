import {Component, OnInit} from '@angular/core';
import {UserSessionService} from '../user-session.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  public userName;
  public items = [{itemName: '', QTY: '', unitPrice: ''}];
  public itemName;
  public QTY;
  public unitPrice;

  constructor(private user: UserSessionService) {

  }

  ngOnInit() {
    this.userName = this.user.getUserLoggedInUserName();
  }

  addItems() {
    this.items.push({itemName: this.itemName, QTY: this.QTY, unitPrice: this.unitPrice});
  }

  editItems(itemName) {
  }

}
