window.onload = function() { 
    
    // LIBRARY

    let switcher1 = true;
    let switcher2 = true;
    let api = "";
    let selLoc = "Deira";
    let loadedData = false;
    let changelocationbutton = document.getElementById("changelocationbutton");
    let popup = document.getElementById("changelocationpopupcanvas");
    let closepopup = document.getElementById("closechangelocationpopup");
    let settingsbutton = document.getElementById("settingsbutton");
    let settingscanvas = document.getElementById("settingscanvas");
    let closesettingspopup = document.getElementById("closesettingspopup");
    let changelocationtext = document.getElementById("changelocationtext");
    let changelocationconfirm = document.getElementById("changelocationconfirm");
    let currentlocation = document.getElementById("currentlocation");
    let apifetchallowed = true;

    let matchers = // if "Sunny" then sunnyicon blah blah
            {
                "Sunny": "./src/sunnyicon.png",
                "Partly Cloudy": "",
                "Cloudy": "",
                "Overcast": "",
                "Mist": "",
                "Patchy rain possible": "",
                "Patchy snow possible": "",
                "Patchy sleet possible": "",
                "Patchy freezing drizzle possible": "",
                "Thundery outbreaks possible": "",
                "Blowing snow": "",
                "Blizzard": "",
                "Freezing fog": "",
                "Light drizzle": "",
                "Freezing drizzle": "",
                "Heavy freezing drizzle": "",
                "Patchy light rain": "",
                "Light rain": "",
                "Moderate rain at times": "",
                "Moderate rain": "",
                "Heavy rain at times": "",
                "Heavy rain": "",
                "Light freezing rain": "",
                "Moderate or heavy freezing rain": "",
                "Light sleet": "",
                "Moderate or heavy sleet": "",
                "Patchy light snow": "",
                "Light snow": "",
                "Patchy moderate snow": "",
                "Moderate snow": "",
                "Patchy heavy snow": "",
                "Heavy snow": "",
                "Ice pellets": "",
                "Light rain shower": "",
                "Moderate or heavy rain shower": "",
                "Torrential rain shower": "",
                "Light sleet showers": "",
                "Moderate or heavy sleet showers": "",
                "Light snow showers": "",
                "Moderate or heavy snow showers": "",
                "Light showers of ice pellets": "",
                "Moderate or heavy showers of ice pellets": "",
                "Patchy light rain with thunder": "",
                "Moderate or heavy rain with thunder": "",
                "Patchy light snow with thunder": "",
                "Moderate or heavy snow with thunder": "",
            };

    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

    // all data values

    //backgrounds
    abackdrop = document.getElementById("sunny");
    agradient = document.getElementById("sunnyOverlay");
    //buttons
    achangelocation = document.getElementById("changelocationbutton");
    asettings = document.getElementById("settingsbutton");
    // day list icons
    atodicon = document.getElementById("todweekdayicon");
    atomicon = document.getElementById("tomweekdayicon");
    atom1icon = document.getElementById("tom1weekdayicon");
    atom2icon = document.getElementById("tom2weekdayicon");
    //day list day names
    atodname = document.getElementById("todweekday");
    atomname = document.getElementById("tomweekday");
    atom1name = document.getElementById("tom1weekday");
    atom2name = document.getElementById("tom2weekday");
    // day list temps
    atodtemp = document.getElementById("todweekdaytemp");
    atomtemp = document.getElementById("tomweekdaytemp");
    atom1temp = document.getElementById("tom1weekdaytemp");
    atom2temp = document.getElementById("tom2weekdaytemp");
    // mains
    aday = document.getElementById("day");
    adate = document.getElementById("date");
    alocation = document.getElementById("location");
    aicon = document.getElementById("sunnyicon")
    astatus = document.getElementById("weathertype");
    atemp = document.getElementById("temp");
    //values
    aprecip = document.getElementById("PRECIPITATIONVALUE");
    ahumid = document.getElementById("HUMIDITYVALUE");
    awind = document.getElementById("WINDVALUE");
    aveiwdis = document.getElementById("VIEWDIST");

    // buttons

    changelocationconfirm.onclick = function() {
        currentlocation.innerHTML = "Current Location: " + String(changelocationtext.value);
        selLoc = String(changelocationtext.value);
        changelocationtext.value = "";
        sendreq();
    } 

    changelocationbutton.onclick = function() {
        if (switcher1 == true) { // open
            popup.style.visibility = "visible"; 
            switcher1 = false;
            settingscanvas.style.visibility = "hidden"; 
            switcher2 = true;
        }

        else if (switcher1 == false) { // close
            popup.style.visibility = "hidden";
            switcher1 = true;
        }

        else {
            console.log("Error js switcher bool fail")
        } // end of switcher1 if statements
    } // end of onclick

    closepopup.onclick = function() {
        popup.style.visibility = "hidden";
        switcher1 = true;
    };

    settingsbutton.onclick = function() { //open
        if (switcher2 == true) {
            settingscanvas.style.visibility = "visible"; 
            switcher2 = false;
            popup.style.visibility = "hidden"; 
            switcher1 = true;
        }
        
        else if (switcher2 == false) { //close
            settingscanvas.style.visibility = "hidden"; 
            switcher2 = true;  
        }

        else {
            console.log("Error js switcher bool fail")
        } // end of switcher2 if statements
    };
    
    closesettingspopup.onclick = function() {
        settingscanvas.style.visibility = "hidden";
        switcher2 = true;
    };

    // api fetch

    function sendreq() {
        if (apifetchallowed == true) {
            const apikey = "YOUR_KEY";
            let query = "&q="
            let url = "https://api.weatherapi.com/v1/current.json?key=" + apikey + query + selLoc + "&aqi=yes";
            let get = async () => {
                let response = await fetch(url);
                api = JSON.stringify(await response.json());
                console.log(api);
                if (api != "") {
                    loadedData = true;
                    callback();
                }
            }
            get();
        }
    }

    sendreq();
    
    //api logic

    const callback = async () => {
        await sleep(50);
        if (loadedData == true) {
            // logic updates
            
            console.log("Live");
            
            let weatherstatus = "";
            let time = "";
            let curtemp = "? ";
            let timestat = "";
            let sunrise = "";
            let sunset = "";
            let month = "";
            let season = ""; 
            let curlocation = "Unknown, Unknown";

            // non programmed display finders
            month = Number(api.slice(api.indexOf("\"localtime\":\"") + 18, api.indexOf("\"},\"current\":{\"last") - 9));
            time = api.slice(api.indexOf("\"localtime\":\"") + 13, api.indexOf("\"},\"current\":{\"last"));
            weatherstatus = api.slice(api.indexOf("text\":\"") + 7, api.indexOf("\",\"icon\":\"//cdn.we"));
            
            // fully functional displayers
            curtemp = api.slice(api.indexOf("\"temp_c\":") + 9, api.indexOf(",\"temp_f\":"));
            curlocation = api.slice(api.indexOf("{\"name\":\"") + 9, api.indexOf("\",\"region\":"));

            // display filters
            if (curtemp != "" && curtemp != "? ") {
                curtemp = String(parseInt(curtemp)); // removing decimals on end 
            }   

            if (curlocation != "" && curlocation != "Unknown, Unknown") { // concatenator "a" >> "a, b"=
                if (curlocation.indexOf("1006") != -1) {
                    curlocation = `"${selLoc}" couldn't be found`;
                }
                else {
                    curlocation = curlocation + `, ${api.slice(api.indexOf("\",\"region\":") + 12, api.indexOf("\",\"country\":\""))}`;
                } 
            }

            // day date logic

            console.log(time);

            let ddl_year = time.slice(0, 4);
            let ddl_month = time.slice(5, 7);
            let ddl_date = time.slice(8, 10);
            let ddl_time = time.slice(11,16);
            let ddl_suffix = "th"
            
            let ddl_months = ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
           
            if (ddl_date == "1") {
                ddl_suffix = "st";
            }
            else if (ddl_date == "2") {
                ddl_suffix = "nd";
            }
            else if (ddl_date == "3") {
                ddl_suffix = "rd";
            }
            
            if (ddl_month.indexOf("0") == 0) {
                ddl_month = ddl_month[1]
            }

            if (ddl_date.indexOf("0") == 0) {
                ddl_date = ddl_date[1]
            } 

            // resume display filters below



            // displayers
            atemp.innerHTML = `${curtemp}℃`;
            alocation.innerHTML = curlocation;
            astatus.innerHTML = weatherstatus;
            currentlocation.innerHTML = `Current location: ${curlocation}`;
            adate.innerHTML = `${ddl_time} ${ddl_date}${ddl_suffix} ${ddl_months[Number(ddl_month) - 1]} ${ddl_year}`
            
            if (month != "") { // season sorter
                if (month == 12 || month < 3) {
                    season = "Winter";
                    sunrise = "09";
                    sunset = "18"
                }

                else if (month > 2 && month < 6) {
                    season = "Spring";
                    sunrise = "08";
                    sunset = "20";
                }

                else if (month > 5 && month < 9) {
                    season = "Summer";
                    sunrise = "06";
                    sunset = "22";
                }

                else if (month > 8 || month < 12) {
                    season = "Autumn";
                    sunrise = "07";
                    sunset = "19";
                }
            }

            if (time != "" && sunrise != "" && sunset != "") { // day or night sorter
                if (Number(time.slice(0, 2)) >= sunrise || Number(time.slice(0, 2)) <= sunset) { // day
                    timestat = "Day"
                }

                else if (Number(time.slice(0, 2)) <= sunrise || Number(time.slice(0, 2)) >= sunset) {
                    timestat = "Night"
                }
            }

            if (timestat == "Day") { // if weather sunny then load sunny icon
                if (weatherstatus == "Sunny") {
                    
                }
        }   
        
        
        } // if loaded data is true ^STAY INSIDE
    } // sleep bit (dont go outside for api logic)
    

} // end of window onload   

