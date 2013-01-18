function getGAauthenticationToken(email, password) {
//Fetches GA authentication token, which can then be used to fetch data with the getGAdata function
//Created by Mikael Thuneberg
  
   
    try {
        if (typeof email == "undefined") {
            return "Email address missing";
        }
        if (typeof password == "undefined") {
            return "Password missing";
        }
        if (email.length == 0) {
            return "Email address missing";
        }
        if (password.length == 0) {
            return "Password missing";
        }
        password = encodeURIComponent(password);
        var responseStr
      /**/
       
      /**/
      var response = UrlFetchApp.fetch("https://www.google.com/accounts/ClientLogin", {
            method: "post",
            payload: "accountType=GOOGLE&Email=" + email + "&Passwd=" + password + "&service=analytics&Source=Mikael Thuneberg-GA Google Docs functions-1.0"
        });
        responseStr = response.getContentText();
        responseStr = responseStr.slice(responseStr.search("Auth=") + 5, responseStr.length);
        return responseStr;
    } catch (e) {
        if (e.message.indexOf("CaptchaRequired") != -1) {
            return "Complete CAPTCHA at http://www.google.com/accounts/" + e.message.slice(e.message.indexOf("CaptchaUrl=") + 11, e.message.length);
        } else {
            return "Authentication failed (" + e.message + ")";
        }
    }
}

function getGAaccountData(authToken, dataType, includeHeaders, maxRows, startFromRow) {
//Fetches account data for the authenticated user
//Input authentication token produced by the getGAauthenticationToken function
//If dataType parameter is omitted, the functions fetches a list profiles to which the user has access
//By specifying the dataType parameters as "goals", the functions will fetch a list of goals by profile
//By specifying the dataType parameters as "segments", the functions will fetch a list of advanced segments
//Created by Mikael Thuneberg
  
  if (typeof authToken == "undefined") {
        return "Authentication token missing";
    }
    dataType = (typeof dataType == "undefined") ? "profiles" : dataType;
    maxRows = (typeof maxRows == "undefined") ? 200 : maxRows;
    maxRows = (typeof maxRows == "string") ? 200 : maxRows;
    startFromRow = (typeof startFromRow == "undefined") ? 1 : startFromRow;
    startFromRow = (typeof startFromRow == "string") ? 1 : startFromRow;
    if (authToken.length == 0) {
        return "Authentication token missing";
    }
    if (dataType.length == 0) {
        dataType = "profiles";
    }
    if (authToken.indexOf("Authentication failed") != -1) {
        return "Authentication failed";
    }
    try {
        authToken = authToken.replace(/\n/g, "");
        dataType = dataType.toLowerCase();
        //  var URL = "https://www.googleapis.com/analytics/v2.4/management/accounts/?start-index=" + startFromRow + "&max-results=" + maxRows; //"&key=API_KEY"
        var URL = "https://www.googleapis.com/analytics/v2.4/management/accounts/~all/webproperties/~all/profiles?start-index=" + startFromRow + "&max-results=" + maxRows; 
        var responseStr;
      
    
        var response = UrlFetchApp.fetch(URL, {
            method: "get",
            headers: {
                "Authorization": "GoogleLogin auth=" + authToken,
                "GData-Version": "2"
            }
        });
        responseStr = response.getContentText();
        var XMLdoc = Xml.parse(responseStr);
        var lapset2;
        var TempArray = [];
        var RowArray = [];
        var HeaderArray = [];
        if (includeHeaders == true) {
            var rivi = 1;
            if (dataType == "segments") {
                HeaderArray[0] = "Segment ID";
                HeaderArray[1] = "Segment Name";
                HeaderArray[2] = "Segment Definition";
            } else {
                HeaderArray[0] = "Account Name";
                HeaderArray[1] = "Profile Title";
                HeaderArray[2] = "Profile Number";
            }
            TempArray[0] = HeaderArray;
        } else {
            var rivi = 0;
        }
        var sar = 0;
        var lapset;
        var dataFound = false;
        // datatype = profiles 
            lapset = XMLdoc.getElement().getElements("entry");
            for (i = 0; i < lapset.length; i++) {
                sar = 0;
                lapset2 = lapset[i].getElements();
                for (j = 0; j < lapset2.length; j++) {
                    if (lapset2[j].getName().getLocalName() == "title") {
                        RowArray[0] = " " + lapset2[j].getText();
                        dataFound = true;
                    } else {
                        if (lapset2[j].getName().getLocalName() == "property") {
                            if (lapset2[j].getAttribute("name").getValue() == "ga:webPropertyId") {
                                RowArray[1] = lapset2[j].getAttribute("value").getValue();
                            }
                            if (lapset2[j].getAttribute("name").getValue() == "ga:profileId") {
                                RowArray[2] = lapset2[j].getAttribute("value").getValue();
                                break;
                            }
                        }
                    }
                }
                TempArray[rivi] = RowArray;
                RowArray = [];
                dataFound = true;
                rivi++;
                if (rivi == maxRows) {
                    return TempArray;
                }
            }
        
        if (dataFound == false) {
            return 0;
        }
        return TempArray;
    } catch (e) {
        return "Fetching account data failed (" + e.message + ")";
    }
}

function getGAdata(authToken, profileNumber, metrics, startDate, endDate, filters, dimensions, segment, sort, includeHeaders, maxRows, startFromRow) {
//Fetches data from the GA profile specified, using the authentication token generated by the getGAauthenticationToken function
//For instructions on the parameters, see http://bit.ly/bUYMDs
//Created by Mikael Thuneberg
  
  
  var randnumber = Math.random()*1000;

  Utilities.sleep(randnumber); 
//  Utilities.sleep(randnumber); 
//  Utilities.sleep(randnumber); 
//  Utilities.sleep(randnumber); 

 

  
  try {
        startDate.getYear();
    } catch (e) {
        return "Invalid start date";
    }
    try {
        endDate.getYear();
    } catch (e) {
        return "Invalid end date";
    }
    try {
        if (typeof authToken == "undefined") {
            return "Authentication token missing";
        }
        if (typeof profileNumber == "undefined") {
            return "Profile number missing";
        }
        if (typeof metrics == "undefined") {
            return "Specify at least one metric";
        }
        if (profileNumber != parseInt(profileNumber)) {
            return "Invalid profile number";
        }
        filters = (typeof filters == "undefined") ? "" : filters;
        dimensions = (typeof dimensions == "undefined") ? "" : dimensions;
        segment = (typeof segment == "undefined") ? "" : segment;
        maxRows = (typeof maxRows == "undefined") ? 100 : maxRows;
        maxRows = (typeof maxRows == "string") ? 100 : maxRows;
        startFromRow = (typeof startFromRow == "undefined") ? 1 : startFromRow;
        startFromRow = (typeof startFromRow == "string") ? 1 : startFromRow;
        if (authToken.length == 0) {
            return "Authentication token missing";
        }
        if (profileNumber.length == 0) {
            return "Profile number missing";
        }
        if (metrics.length == 0) {
            return "Specify at least one metric";
        }
        if (authToken.indexOf("Authentication failed") != -1) {
            return "Authentication failed";
        }
        authToken = authToken.replace(/\n/g, "");
        var startDateString
        var endDateString
        var dMonth
        var dDay
        if (startDate.getMonth() + 1 < 10) {
            dMonth = "0" + (startDate.getMonth() + 1);
        } else {
            dMonth = startDate.getMonth() + 1;
        }
        if (startDate.getDate() < 10) {
            dDay = "0" + startDate.getDate();
        } else {
            dDay = startDate.getDate();
        }
        startDateString = startDate.getYear() + "-" + dMonth + "-" + dDay
        if (endDate.getMonth() + 1 < 10) {
            dMonth = "0" + (endDate.getMonth() + 1);
        } else {
            dMonth = endDate.getMonth() + 1;
        }
        if (endDate.getDate() < 10) {
            dDay = "0" + endDate.getDate();
        } else {
            dDay = endDate.getDate();
        }
        endDateString = endDate.getYear() + "-" + dMonth + "-" + dDay
        if (startDateString > endDateString) {
            return "Start date should be before end date";
        }
        var URL = "https://www.google.com/analytics/feeds/data?ids=ga:" + profileNumber + "&start-date=" + startDateString + "&end-date=" + endDateString + "&max-results=" + maxRows + "&start-index=" + startFromRow;
        if (metrics.slice(0, 3) != "ga:") {
            metrics = "ga:" + metrics;
        }
        metrics = metrics.replace(/&/g, "&ga:");
        metrics = metrics.replace(/ga:ga:/g, "ga:");
        metrics = metrics.replace(/&/g, "%2C");
        URL = URL + "&metrics=" + metrics
        if (dimensions.length > 0) {
            if (dimensions.slice(0, 3) != "ga:") {
                dimensions = "ga:" + dimensions;
            }
            dimensions = dimensions.replace(/&/g, "&ga:");
            dimensions = dimensions.replace(/ga:ga:/g, "ga:");
            dimensions = dimensions.replace(/&/g, "%2C");
            URL = URL + "&dimensions=" + dimensions;
        }
        if (filters.length > 0) {
            if (filters.slice(0, 3) != "ga:") {
                filters = "ga:" + filters;
            }
            filters = filters.replace(/,/g, ",ga:");
            filters = filters.replace(/;/g, ";ga:");
            filters = filters.replace(/ga:ga:/g, "ga:");
            filters = encodeURIComponent(filters);
            URL = URL + "&filters=" + filters;
        }
        if (typeof(segment) == "number") {
            segment = "gaid::" + segment;
        }
        if (segment.length > 0) {
            if (segment.indexOf("gaid::") == -1 && segment.indexOf("dynamic::") == -1) {
                if (segment.slice(0, 3) != "ga:") {
                    segment = "ga:" + segment;
                }
                segment = "dynamic::" + segment;
            }
            segment = encodeURIComponent(segment);
            URL = URL + "&segment=" + segment;
        }
        if (sort == true) {
            URL = URL + "&sort=-" + metrics;
        }
    }
    catch (e) {
        return "Fetching data failed (" + e.message + ")";
    }
    try {
        var response = UrlFetchApp.fetch(URL, {
            method: "get",
            headers: {
                "Authorization": "GoogleLogin auth=" + authToken,
                "GData-Version": "2"
            }
        });
    } catch (e) {
        if (e.message.indexOf("Timeout") != -1) {
            response = UrlFetchApp.fetch(URL, {
                method: "get",
                headers: {
                    "Authorization": "GoogleLogin auth=" + authToken,
                    "GData-Version": "2"
                }
            });
        } else {
            return "Fetching data failed (" + e.message + ")";
        }
    }
    try {
        var responseStr = response.getContentText();
        var XMLdoc = Xml.parse(responseStr);
        var lapset = XMLdoc.getElement().getElements("entry");
        var lapset2;
        var TempArray = [];
        var RowArray = [];
        var HeaderArray = [];
        if (includeHeaders == true) {
            var rivi = 1;
        } else {
            var rivi = 0;
        }
        var sar = 0;
        var dataFound = false;
        for (i = 0; i < lapset.length; i++) {
            sar = 0;
            lapset2 = lapset[i].getElements();
            for (j = 0; j < lapset2.length; j++) {
                if (lapset2[j].getName().getLocalName() == "dimension") {
                    RowArray[sar] = lapset2[j].getAttribute("value").getValue();
                    if (rivi == 1) {
                        HeaderArray[sar] = lapset2[j].getAttribute("name").getValue();
                    }
                    sar++;
                }
                if (lapset2[j].getName().getLocalName() == "metric") {
                    RowArray[sar] = Number(lapset2[j].getAttribute("value").getValue());
                    if (rivi == 1) {
                        HeaderArray[sar] = lapset2[j].getAttribute("name").getValue();
                    }
                    sar++;
                }
            }
            TempArray[rivi] = RowArray;
            RowArray = [];
            dataFound = true;
            rivi++;
        }
        if (dataFound == false) {
            return 0;
        }
        if (includeHeaders == true) {
            TempArray[0] = HeaderArray;
        }
        return TempArray;
    } catch (e) {
        return "Fetching data failed (" + e.message + ")";
    }
  
  
  
}
