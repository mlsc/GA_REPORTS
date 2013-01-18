(function(window) {

	/**
	* Account.
	* The account class uses a static interface and should not be instantiated.
	* @class Account
	* @static
	**/
	Account = function() {
		throw "Account cannot be instantiated"; 
	}
	

	/**
	* Get Account list from GA
	* @method getAccountList
	* @static
	**/
	Account.getAccountList = function(auth) {

        Debug.log(auth);
		
        if (typeof auth == null) {
            alert("Authentication token missing");
            return false;
        }
        if (auth.length == 0) {
            alert("Authentication token missing");
            return false;
        }

        auth = encodeURIComponent(auth);

        var query = "use 'https://raw.github.com/mlsc/GA_REPORTS/master/js/gaCore/ga.xml' as ga; select * from ga where auth='" + auth + "'";
		var yql = "http://query.yahooapis.com/v1/public/yql?q="+ query +"&format=json";

		Debug.log(yql);

		$.getJSON( yql, function(data){
			Debug.log(data);
		});
		



	}
	
	
	window.Account = Account;

}(window));
