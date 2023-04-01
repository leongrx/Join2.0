export class Task {
  title?: string;
  assignedTo?: string;
  date?: Date = new Date();
  category?: string;
  urgency?: string;
  description?: string;
  id?: string;
  board?: string;

  constructor(
    id?: string,
    title?: string,
    description?: string,
    board?: string,
    assignedTo?: string,
    date?: Date,
    category?: string,
    urgency?: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.board = board;
    this.assignedTo = assignedTo;
    this.date = date;
    this.category = category;
    this.urgency = urgency
  }
}
