export default class Traveler {
    private travelerName!: string;

    public getName(): string {
        return this.travelerName;
    }

    public setName(travelerName: string): void {
        this.travelerName = travelerName;
    }
}