import moment from 'moment';

class Order {
    constructor(id, items, status, date, totalAmount, UserId){
        this.id = id;
        this.items = items;
        this.status = status;
        this.date = date;
        this.totalAmount = totalAmount;
        this.UserId = UserId;
    }
    get readableDate(){
        return moment(this.date).format('MMMM Do YYYY, hh:mm')
    }
}

export default Order;