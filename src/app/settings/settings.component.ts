import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public area;
  public sub;
  public price;


  constructor(public fbdb: AngularFireDatabase) {
  }

  ngOnInit() {
  }

  addRider() {
    this.fbdb.list('/Riders').push({
      'rider_name': 'Ziyad',
      'rider_contact': '0753576874'
    });
  }

  addItems(form: NgForm) {
    this.fbdb.list('/Areas').push({
      'area': this.area,
      'sub': this.sub,
      'price': this.price
    });
    form.resetForm();

  }

  addArea() {

  }
}
