import uuid from 'uuid-js'; // eslint-disable-line
import ApplicationEntity from './ApplicationEntity';

export default class CapitalTransaction extends ApplicationEntity {
  static types = ['income', 'loss'];

  static constraints = {
    ticket: {
      presence: true,
    },
    cost: {
      presence: true,
      numericality: true,
    },
    type: {
      presence: true,
      inclusion: CapitalTransaction.types,
    },
  };

  constructor(ticket, type) {
    // BEGIN (write your solution here)
    super();
    this.id = uuid.create().hex;
    this.ticket = ticket;
    this.cost = (type === 'income' ? ticket.cost : -ticket.cost);
    this.type = type;
    this.createdAt = new Date();
    // END
  }
}

