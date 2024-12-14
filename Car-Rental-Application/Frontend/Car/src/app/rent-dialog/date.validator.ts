import { AbstractControl } from "@angular/forms";

export class DateValidator{
    static validateDate(control: AbstractControl): { [key: string]: boolean} | null{
        const selectedDate= control.value;
        const currentDate= new Date();

        if(selectedDate<currentDate){
            return {'PastDate':true};
        }
        return null;
    }
}