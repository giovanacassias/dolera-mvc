import Trip from "./Trip";

export default class Business extends Trip {

    private companyName!: string;

    /* FORMA 1     

        constructor(companyName: string){
        super();
        this.companyName = companyName;
        } 
    
    */


    constructor(){
        super();
    }    

    public getCompanyName(): string {
        return this.companyName;
    }

    public setCompanyName(companyName: string): void {
        this.companyName = companyName;
    } 
}