(function(window) {

	/**
	* Login.
	* The login class uses a static interface and should not be instantiated.
	* @class Login
	* @static
	**/
	Login = function() {
		throw "Test cannot be instantiated"; 
	}
	

	/**
	* Get Auth token from GA
	* @method getToken
	* @static
	**/
	Login.getGAauthenticationToken = function(email, password) {

        if (typeof email == null) {
            $('#login_result').html("Email address missing");
            return false;
        }
        if (typeof password == null) {
            $('#login_result').html("Password missing");
            return false;
        }
        if (email.length == 0) {
            $('#login_result').html("Email address missing");
            return false;
        }
        if (password.length == 0) {
        	$('#login_result').html("Password missing");
        	return false;
        }

        var responseStr;

        var accountType = "GOOGLE";
        var service = "analytics";
        var Source = "Cesare";
        var Email = email;
        var Passwd = password;

		//var query = "use 'http://github.com/yql/yql-tables/raw/master/google/google.analytics.xml' as ga; select * from ga where Email='" + Email + "' and Passwd='" + password + "'";
        var query = "use 'https://raw.github.com/mlsc/GA_REPORTS/master/js/gaCore/ga.xml' as ga; select * from ga where Email='" + Email + "' and Passwd='" + password + "'";
		var yql = "http://query.yahooapis.com/v1/public/yql?q="+encodeURIComponent(query)+"&format=json";
		
		
		$.getJSON( yql, function(data){
			Debug.log(data);
			responseStr = data.query.results.result;
		
			if(responseStr != 'Error=BadAuthentication\n') {
				responseStr = responseStr.slice(responseStr.search("Auth=") + 5, responseStr.length);
				$('#token').val(responseStr);
			}else{
				$('#login_result').html(responseStr);
			}

		});

	}
	
	
	window.Login = Login;

}(window));
