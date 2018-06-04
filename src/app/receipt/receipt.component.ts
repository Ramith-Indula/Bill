import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {UserSessionService} from '../user-session.service';
import {NgForm} from '@angular/forms';
import {AngularFireDatabase} from 'angularfire2/database';
import {Router} from '@angular/router';


@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  public userName;
  public itemName;
  public QTY;
  public unitPrice;
  public items = [];
  public deliveryAgents: Array<any>;
  public newBill;
  public billKey;



  constructor(private user: UserSessionService, public fbdb: AngularFireDatabase, public router: Router) {
  }

  ngOnInit() {
    this.userName = this.user.getUserLoggedInUserName();
  }

  addItems(form: NgForm) {
    this.items.push({itemName: this.itemName, QTY: this.QTY, unitPrice: this.unitPrice});
    form.resetForm();
  }

  saveBill() {
    this.newBill = this.fbdb.list('/Bills').push({
      'Items': this.items
    });
    this.billKey = this.newBill.key;
    this.navigate(this.billKey);
  }

  navigate(key: string) {
    this.router.navigate(['/generate-bill'], {queryParams: {key: key}});
  }


  editItems(itemName) {
  }

  deleteItem(itemName) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].itemName === itemName) {
        this.items.splice(i, 1);
      }
    }
  }


}
