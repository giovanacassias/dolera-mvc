export default class Trip {
    private name!: string;
    private currency!: string;
    private startDate!: string;
    private finishDate!: string;
    private budget!: string;

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getCurrency(): string {
        return this.currency;
    }

    public setCurrency(currency: string): void {
        this.currency = currency;
    }

    public getStartDate(): string {
        return this.startDate;
    }

    public setStartDate(startDate: string): void {
        this.startDate = startDate;
    }

    public getFinishDate(): string {
        return this.finishDate;
    }

    public setFinishDate(finishDate: string): void {
        this.finishDate = finishDate;
    }

    public getBudget(): string {
        return this.budget;
    }

    public setBudget(budget: string): void {
        this.budget = budget;
    }

    public displayTrip(trip: Trip): void {
        console.log("Método padrão que será sobrescrito pelos métodos das classes filhas!")
    }

}