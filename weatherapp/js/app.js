class Weather
{
    constructor(options) {
        this.init();

        this.latitude = "";
        this.longtitude = "";
        this.weather = {};
        this.backgroundColor = "";
        this.apiKey = options.apiKey;
    }

    init() {
        console.log(this.checkIfCached());
        if (this.checkIfCached()) {
            this.loadCache();
        } else {
            this.getMyLocation();
        }
    }

    loadCache() {
        this.weather = localStorage.getItem("temperature");
        this.updateUI();
    }

    getMyLocation() {
        let that = this;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                that.latitude = position.coords.latitude;
                that.longtitude = position.coords.longitude;
                that.getWeather();
            })
        }
    }

    getWeather() {
        let that = this;
        const call = `https://api.darksky.net/forecast/${this.apiKey }/${this.latitude},${this.longtitude}?units=ca`;
        $.ajax({
            url: call,
            method: "GET",
            dataType: "jsonp"
        }).done(function(res) {
            that.weather = res.currently.temperature;
            that.updateUI();
            that.cache();
        });
    }

    updateUI() {
        if (this.weather < 10) {
            this.backgroundColor = "#3498db";
        } else if (this.weather > 10 && this.weather < 20) {
            this.backgroundColor = "#e67e22";
        } else {
            this.backgroundColor = "#e74c3c";
        }
        $("body").css({backgroundColor: this.backgroundColor});
        $("h1").html(this.weather + " °C");
    }

    checkIfCached() {
        let lastFetch = localStorage.getItem("lastFetch");
        if (lastFetch === null) {
            return false;
        } else {
            let date = new Date();
            let currentHour = date.getHours();
            return currentHour == lastFetch;
        }
    }

    cache() {
        let date = new Date();
        let currentHour = date.getHours();
        localStorage.setItem("lastFetch", currentHour);
        localStorage.setItem("temperature", this.weather)
    }
}

const options = {
    apiKey: "6aa61f5a137c11f355d7afb722dcbc2a"
};

let w = new Weather(options);