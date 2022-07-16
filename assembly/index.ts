import { PersistentMap, Context, ContractPromiseBatch, u128} from "near-sdk-as";
import {Ticket_detail} from "./models";

@nearBindgen
export class tickets{
    public map : PersistentMap<string, Ticket_detail>;
    public tickets_size : i32;
    constructor() {
        let map = new PersistentMap<string, Ticket_detail>("m");
        let tickets_size  = 0;
    }

  @mutateState()
  create_1ticket(owner : string, name : string, time: string, price : f32, ticket_available :i32): void{
     let t : Ticket_detail = new Ticket_detail(owner, name, time, price, ticket_available);
     this.map.set(name, t);
     this.tickets_size += 1;
  }

  @mutateState()
  buy_ticket (name_ticket : string) : string{
      let msg : string;
      let obj = this.map.get(name_ticket);
      if(obj != null){
          // @ts-ignore
          if(obj.ticket_available > 0){
              // @ts-ignore
              if(Context.attachedDeposit == u128.fromF32(obj.price)){
                  // @ts-ignore
                  obj.buyer = Context.sender;
                  // @ts-ignore
                  ContractPromiseBatch.create(obj.owner).transfer(Context.attachedDeposit);
                  // @ts-ignore
                  msg = "ticket is sold for " + Context.sender + "special code for ticket is " +  obj.special_code.toString();
                  // @ts-ignore
                  obj.ticket_sold += 1;
                  // @ts-ignore
                  obj.ticket_available -= 1;
              }
              else{
                  msg = "sorry, your Balance less then ticket price";
              }
          }
          else{
              msg = "sorry, All tickets are sold, no more tickets";
          }
      }

      else{
          msg = "wrong name";
      }
      return msg;
  }

    get_ticket(name_ticket : string) : Ticket_detail | null {
        // @ts-ignore
        return this.map.get(name_ticket);
    }

    get_num_tickets(): i32{
        return this.tickets_size;
    }
}