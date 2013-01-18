
//https://developers.google.com/analytics/resources/articles/gdataCommonQueries

//http://stackoverflow.com/questions/3638672/how-to-set-a-custom-header-using-yahoo-pipes

google.load('visualization', '1.0', {'packages':['corechart']});
//google.setOnLoadCallback(drawChart);

      



$(document).ready(function() {
   
	$("form#login").submit(function() {
		var user = $('#user').val();
		var pwd =  $('#pwd').val();
		Login.getGAauthenticationToken(user, pwd);
		return false;
	});
	
	$("form#account").submit(function() {
    var token = $('#token').val();
    Account.getAccountList(token);
    return false;
  });
   
	

/*
 	function drawChart() {
	    // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Mushrooms', 3],
          ['Onions', 1],
          ['Olives', 1],
          ['Zucchini', 1],
          ['Pepperoni', 2]
        ]);

        // Set chart options
        var options = {'title':'How Much Pizza I Ate Last Night',
                       'width':400,
                       'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }

	drawChart();
*/

});
 

	



