export class customerInvoice {
    constructor(InvoiceID, OrderID, InvoiceDate, ExpPaymentDate, ShipCost, TotalSum) {
        this._id = InvoiceID;
        this.InvoiceID = InvoiceID;
        this.OrderID = OrderID;
        this.InvoiceDate = InvoiceDate;
        this.PaymentDelay = 30;
        this.ExpPaymentDate = ExpPaymentDate;
        //this.ExpPaymentDate = OrderDate.setDate(OrderDate.getDate() + this.PaymentDelay);
        this.Taxes = 17;
        this.ShipCost = ShipCost;
        this.TotalSum = TotalSum;

    }

}