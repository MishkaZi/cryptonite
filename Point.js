/* this class Point is for the canvas i make the
   data property in options is array of point*/
class Point {
    constructor(name) {
        this.type = "spline";
        this.showInLegend = true;
        this.xValueFormatString = "hh:mm:ss";
        this.dataPoints = [];
        this.name = name;
    }

    
    get getDataPoints() {
        
        return this.dataPoints;
    }
    set setDataPoints(value) {
        this.dataPoints.push(value);
    }


    
    async makeAnApiCall() {
        try {
            const data = await Api.getApi(`https://min-api.cryptocompare.com/data/price?fsym=${this.name}&tsyms=USD`);
            this.dataPoints.push({ x: new Date(), y: data.USD });
        }
        catch (e) {
            console.log(e);
            console.log(this.dataPoints);
            console.log("error");
        }
    }
}
