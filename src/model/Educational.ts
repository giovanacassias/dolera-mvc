import Trip from "./Trip";

export default class Educational extends Trip {
    
    private schoolName!: string;

    constructor(){
        super();
    }

    public getSchoolName(): string {
        return this.schoolName;
    }

    public setSchoolName(schoolName: string): void {
        this.schoolName = schoolName;
    }
}