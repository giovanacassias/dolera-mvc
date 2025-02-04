export default class Expenses {
    private description!: string;
    private date!: Date;
    private amount!: number;
    //private category!: CategoryEnum; // OU category [] = ['accommodation', 'transportation', 'shopping', 'food', 'sightseeing', 'fees', 'others']
    //aí na screen, no switch case, ao escolher de 0 à 6 será o index do elemento no array?

    public getDescription(): string {
        return this.description;
    }

    public setName(description: string): void {
        this.description = description;
    }

    public getDate(): Date {
        return this.date;
    }

    public setDate(date: Date): void {
        this.date = date;
    }

    public getAmount(): number {
        return this.amount;
    }

    public setAmount(amount: number): void {
        this.amount = amount;
    }

/*     public getCategory(): number {
        return this.category;
    }

    public setCategory(category: CategoryEnum): void {
        this.category = category;
    } */
}