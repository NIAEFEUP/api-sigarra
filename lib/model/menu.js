export class Menu {
    constructor(monday, tuesday, wednesday, thursday, friday, dates, dinner) {
        this.monday = monday;
        this.tuesday = tuesday;
        this.wednesday = wednesday;
        this.thursday = thursday;
        this.friday = friday;
        this.startingDay = dates[0];
        this.lastDay = dates[1];
        this.dinner = dinner;
    }
}
