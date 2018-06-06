import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {UserSessionService} from '../user-session.service';
import * as pdfmake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import {forEach} from '@angular/router/src/utils/collection';
import {skipUntil} from 'rxjs/internal/operators';


@Component({
  selector: 'app-bill-print',
  templateUrl: './bill-print.component.html',
  styleUrls: ['./bill-print.component.css']
})
export class BillPrintComponent implements OnInit {

  public key;
  public selectedRider;
  public selectedArea;
  public clientName;
  public clientAddress;
  public clientContact;
  public details = [];
  public deliveryAgents: Array<any>;
  public Areas: Array<any>;
  public deliveryDetails = [];
  public deliveryAgent = [];
  public deliveryArea = [];
  public addedItems = [];
  public addedItemsList: any;
  public client = [];
  public userName;
  public subtotal = 0;


  constructor(public user: UserSessionService, public fbdb: AngularFireDatabase, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.userName = this.user.getUserLoggedInUserName();
    this.activatedRoute.queryParams.subscribe(params => {
      this.key = params.key;
    });
    this.getAddedItemsList(this.key);
    this.getRiders();
    this.getAreas();

  }

  getRiders() {
    this.fbdb.list('/Riders').valueChanges().subscribe(data => {
      this.deliveryAgents = data;
    });

  }

  getAreas() {
    this.fbdb.list('/Areas').valueChanges().subscribe(data => {
      this.Areas = data;
    });
  }

  addItems(form: NgForm) {
    this.details.push({
      clientName: this.clientName,
      clientAddress: this.clientAddress,
      clientContact: this.clientContact
    });
    this.deliveryDetails.push({Rider: this.selectedRider, Area: this.selectedArea});
    form.control.disable();
    this.getDeliveryAgentDetails(this.deliveryDetails[0].Rider);
    this.getAreaCharge(this.deliveryDetails[0].Area);
    this.addDetails(this.key);
    this.getClient(this.key);
    this.getAddedItems(this.key);
  }

  addDetails(key) {
    this.fbdb.object('/Bills/' + key).update({Delivery: {Client: this.details[0], Delivery: this.deliveryDetails[0]}});
  }

  getDeliveryAgentDetails(da) {
    this.fbdb.list('/Riders', ref => ref.orderByChild('rider_name').equalTo(da)).valueChanges().subscribe(data => {
      this.deliveryAgent = data;
    });

  }

  getAreaCharge(area) {
    this.fbdb.list('/Areas', ref => ref.orderByChild('area').equalTo(area)).valueChanges().subscribe(data => {
      this.deliveryArea = data;
    });

  }

  getAddedItemsList(key) {
    this.fbdb.list('/Bills/' + key).valueChanges().subscribe(data => {
      this.addedItems = data;
    });

    console.log('Data Fetched....' + key);
  }


  getClient(key) {
    this.fbdb.list('/Bills/' + key).valueChanges().subscribe(data => {
      this.client = data;
    });
  }


  getAddedItems(key) {
    this.fbdb.list('/Bills/' + key).valueChanges().subscribe(data => {
      this.addedItemsList = data;
    });

  }


  getSubTotal(): number {
    let subTotal = 0;
    this.addedItems.forEach(function (item) {
      subTotal += item.QTY * item.price;
    });
    if (isNaN(subTotal)) {
      return 0;
    } else {
      return subTotal;
    }

  }


  PDF() {


    pdfmake.vfs = pdfFonts.pdfMake.vfs;
    let docDefinition = {
      content: [
        {
          alignment: 'center',
          columns: [
            {text: 'Metro Monkey \n Delivery ', fontSize: 50}

          ]
        },
        {canvas: [{type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 1}]},
        {
          alignment: 'justify',
          columns: [
            {
              alignment: 'center',
              text: '\n\nBill to - ',
              fontSize: 20
            },
            {
              text: ['\n\n', this.client[0].Client.clientName, '\n', this.client[0].Client.clientAddress, '\n',
                this.client[0].Client.clientContact]
              , fontSize: 20
            }
          ]
        },
        {canvas: [{type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 1}]},
        {
          text: 'Another text',
          style: 'anotherStyle',
          table: {
            headerRows: 1,
            widths: [200, 80, 80, 120],
            body: [
              [

                {
                  border: [false, false, false, true],
                  text: 'Item', style: 'tableHeader',
                  fontSize: 20
                },
                {
                  border: [false, false, false, true],
                  text: 'Unit Price', style: 'tableHeader',
                  fontSize: 20
                },
                {
                  border: [false, false, false, true],
                  text: 'Qty', style: 'tableHeader',
                  fontSize: 20
                },
                {
                  border: [false, false, false, true],
                  text: 'Price', style: 'tableHeader',
                  fontSize: 20
                }
              ]
            ]
          },
          layout: {},
        },
        {canvas: [{type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 1}]},
        '\n\n\n\n\n\n',
        {
          table: {
            widths: [88, 80, 80, 250],
            body: [
              [{text: [], border: [false, false, false, false]},
                {text: [], border: [false, false, false, false]},
                {text: [], border: [false, false, false, false]},
              ]
            ]
          },
          layout: {},
        },

        /*'\n\n\n',
        {
          alignment: 'right',
          columns: [
            {},
            {},
            {
              style: 'tableExample',
              table: {
                widths: ['auto', 'auto', 130],
                body: [
                  [
                    { text: [], border: [false, false, false, false] },
                    { text: [], border: [false, false, false, false] },
                    {
                      text: [
                        ['Paid:', '000'],
                        ['\n\nBalance Paid:', '000']
                      ],
                      fillColor: '#eeeeee',
                      border: [false, false, false, false]
                    }
                  ],

                ]
              }
            },
          ],

        },*/
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        bigger: {
          fontSize: 15,
          italics: true
        }
      },
      defaultStyle: {
        columnGap: 20
      },
      anotherStyles: {
        italics: true,
        alignment: 'right',
        margin: [0, 80, 0, 0],
      },
      tableHeader: {
        bold: true,
        ontSize: 13,
        color: 'black'
      },
      tableExample: {
        margin: [0, 10, 0, 15]
      },
    } as any;


    this.addedItems[1].forEach(item => {
      let row = [
        {
          border: [false, false, false, false],
          text: item.itemName,
          fontSize: 20
        },
        {
          border: [false, false, false, false],
          text: item.unitPrice,
          fontSize: 20

        },
        {
          border: [false, false, false, false],
          text: item.QTY,
          fontSize: 20

        },
        {
          border: [false, false, false, false],
          text: item.QTY * item.unitPrice,
          fontSize: 20
        },
      ];


      this.subtotal += (item.QTY * item.unitPrice);
      docDefinition.content[4].table.body.push(row);


    });
    let deliveryCharges = Number(this.deliveryArea[0].price);
    let subTotal = Number(this.subtotal);
    let grandTotal = subTotal + deliveryCharges;
    let row2 = {
      border: [false, false, false, false],
      text: ['SubTotal: ' + subTotal, '\n\n', 'Delivery Charges: ' + this.deliveryArea[0].price, '\n\n', 'Grand Total: ' + grandTotal ],
      fontSize: 25
    };
    docDefinition.content[7].table.body[0].push(row2);
    console.log('Sub Total  ' + this.subtotal);
    /*pdfmake.createPdf(docDefinition).open();*/
    pdfmake.createPdf(docDefinition).print();
  }
}

