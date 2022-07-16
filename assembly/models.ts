
@nearBindgen
export class Ticket_detail{
    private  _owner : string;
    private  _name : string;
    private  _time : string;
    private  _special_code : i32;
    private  _price : f32;
    public ticket_sold : i32;
    public ticket_available :i32;
    private _buyer : string;

    constructor(owner : string, name : string, time: string, price : f32, ticket_available :i32) {
        this._price = price;
        this._time = time;
        this._owner = owner;
        this._name = name;
        this.ticket_available = ticket_available;
        this._special_code = i32(Math.floor(Math.random() * 1000));
        this.ticket_sold = 0;
    }

    get owner(): string {
        return this._owner;
    }

    get name(): string {
        return this._name;
    }

    get time(): string {
        return this._time;
    }

    get price(): f32 {
        return this._price;
    }

    get special_code(): i32 {
        return this._special_code;
    }

    get buyer(): string {
        return this._buyer;
    }

    @mutateState()
    set buyer(value: string) {
        this._buyer = value;
    }
}
