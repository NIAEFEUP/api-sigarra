export class Meal {
    constructor(soup, meat_plate, fish_plate, veggie_plate, day) {
        this.soup = soup;
        this.meat_plate = meat_plate;
        this.fish_plate = fish_plate;
        this.veggie_plate = veggie_plate;
        this.day = day;
    }
    getSoup() {
        return this.soup;
    }
    getMeat() {
        return this.meat_plate;
    }
    getFish() {
        return this.fish_plate;
    }
    getVeggie() {
        return this.veggie_plate;
    }
}
