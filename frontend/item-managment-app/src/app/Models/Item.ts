export class Item {
    id: String;
    name: String;
    amount: Number
    description: String
    constructor(id: String, name: String, amount: Number, description: String) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.description = description;
    }
}