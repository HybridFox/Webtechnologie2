class Weather
{
    constructor(options) {
        this.init();

        this.latitude = "";
        this.longtitude = "";
        this.apiKey = options.apiKey;
    }

    init() {
        this.getMyLocation();
    }

    getMyLocation() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log(position);
            })
        }
    }

    getWeather() {

    }
}

const options = {
    apiKey: "6aa61f5a137c11f355d7afb722dcbc2a"
};

let w = new Weather(options);