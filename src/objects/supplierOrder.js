export class supplierOrder {
    constructor(_id, SuppOrderID, SupplierID, OrderDate, ShippingDate, ExpPaymentDate, CustomerOrderID, PaymentDelay, Summ, TotalSumm, OrderDetails) {
        // this.date = new Date()
        this._id = _id;
        this.SuppOrderID = SuppOrderID;
        this.SupplierID = SupplierID;
        this.OrderDate = OrderDate;
        this.ShippingDate = ShippingDate;
        // this.ShippingDate = this.OrderDate.setDate(this.OrderDate.getDate() + 3);
        this.CustomerOrderID = CustomerOrderID;
        this.PaymentDelay = PaymentDelay;
        this.ExpPaymentDate = ExpPaymentDate;
        //this.ExpPaymentDate = OrderDate.setDate(OrderDate.getDate() + this.PaymentDelay);
        this.VAT = 17;
        this.DriverID = "10";
        this.Summ = Summ;
        this.TotalSumm = this.Summ * (this.VAT / 100 + 1);
        this.PmtID = "None";
        this.OrderDetails = [];


    }

}