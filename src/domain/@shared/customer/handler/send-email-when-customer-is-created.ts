import EventHandlerInterface from "../../event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendEmailWhenProductIsCreated
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log(`Sending email to ...`);
  }
}
