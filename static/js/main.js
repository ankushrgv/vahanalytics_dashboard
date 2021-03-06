
$(document).on('ready', function(){
	
	// $("#trip-select").hide();

	populateDriversList();

	$("#driver_list").change(function () {
        
        var selectedDriver = $('#driver_list').val();
        
        $('#acceleration-container').html("");
        $('#events-container').html("");
        $('#scores-container').html("");

        populateDriverDetails(selectedDriver);
        populateTripsList(selectedDriver);
        // $("#trip-select").show()
    });

    $("#trip_list").change(function () {
        console.log("trip list changed");
        var selectedTrip = $('#trip_list').val();
        console.log(selectedTrip);
        populateTripDetails(selectedTrip);
    });

});

function populateDriversList() {
    
    var url = "/driverlist";
    $.get(url, function(response) {
        $container = $('.driver_list');

        var i = 0;
        $container.html("");
        if (response.length > 0) { 

            $container.append("<option value=''>None</option>");
			
            var f = document.createDocumentFragment();
            
            $.each(response,function(){

            	var opt = document.createElement('option');
            	$(opt).attr('value', response[i].id);
            	$(opt).text(response[i].first_name);

            	f.appendChild(opt);

            	i++;
            });

            $container.append(f);
            
        } else {
            $container.html("");
            $container.append("<option>No Driver Found</option>");
        }
    });
}


function populateDriverDetails(id) {

	var url = "/driverdetails/" + id;
    $.get(url, function(response) {
    	$container = $('.driver-details');

        $container.html("");

        if (response != null) { 
            
            $container.css('background-image', 'none');

            var f = document.createDocumentFragment();

            var heading = document.createElement('div');
	        $(heading).attr('class', 'driver-heading');
    	    $(heading).append($("<h2>").text(" Driver Details"));            

            var f_name = document.createElement('div');
	        $(f_name).attr('class', 'first-name');
    	    $(f_name).append($("<h3>").text(" First Name "));
    	    $(f_name).append($("<h4>").text(" : "));
    	    $(f_name).append($("<h5>").text(response.first_name));


    	    var l_name = document.createElement('div');
	        $(l_name).attr('class', 'last-name');
    	    $(l_name).append($("<h3>").text(" Last Name "));
    	    $(l_name).append($("<h4>").text(" : "));
    	    $(l_name).append($("<h5>").text(response.last_name));


    	    var age = document.createElement('div');
	        $(age).attr('class', 'age');
    	    $(age).append($("<h3>").text(" Age "));
    	    $(age).append($("<h4>").text(" : "));
    	    $(age).append($("<h5>").text(response.age));


    	    var contact = document.createElement('div');
	        $(contact).attr('class', 'contact');
    	    $(contact).append($("<h3>").text(" Contact No "));
    	    $(contact).append($("<h4>").text(" : "));
    	    $(contact).append($("<h5>").text(response.contact_no));


    	    var city = document.createElement('div');
	        $(city).attr('class', 'city');
    	    $(city).append($("<h3>").text(" City "));
    	    $(city).append($("<h4>").text(" : "));
    	    $(city).append($("<h5>").text(response.city));


    	    f.appendChild(heading);
    	    f.appendChild(f_name);
    	    f.appendChild(l_name);
    	    f.appendChild(age);
    	    f.appendChild(contact);
    	    f.appendChild(city);

	        $('.driver-details').append(f);

        } else {
            $container.html("");
            $container.append("<option>Driver Details Not Found</option>");
        }

    });
}


function populateTripsList(id) {
    
    console.log("entered populateTripsList");
    var url = "/triplist/" + id;
    $.get(url, function(response) {
        $container = $('.trip_list');
        console.log("response returned");

        var i = 0;
        $container.html("");

        if (response.length > 0) { 

            $container.append("<option value='None'>None</option>");
			
            var f = document.createDocumentFragment();
            
            $.each(response,function(){

            	var opt = document.createElement('option');
            	$(opt).attr('value', response[i].id);
            	$(opt).text(response[i].id);

            	f.appendChild(opt);

            	i++;
            });

            $container.append(f);
            
        } else {
            $container.html("");
            $container.append("<option>No Trips Found</option>");
        }
    });
}

function populateTripDetails(id){
	console.log("entered populateTripDetails");
    var url = "/tripdetails/" + id;
    $.get(url, function(response) {
        $container = $('.trip-details');
        console.log("trip detail response returned");

        var i = 0;

        $container.html("");
        if (response != null) {

            // getting value of event label and value
            var no_of_events = Object.keys(response.events).length;

            var event_labels = [];
            var event_values = [];
            var i = 0;

            for(i=0; i<no_of_events; i++){
            	event_labels[i] = response.events[i].label;
            	event_values[i] = response.events[i].value;
            }

            // getting value of acceleration and time
            var no_of_acceleration_instance = Object.keys(response.acceleration).length;

            var main_acceleration_array = [];
			var inner_acceleration_array = [];

			for(i=0; i<no_of_acceleration_instance; i++){
            	main_acceleration_array[i] = [response.acceleration[i].time_axis, response.acceleration[i].acc];
            }

            // getting value of score and time
            var no_of_score_instance = Object.keys(response.scores).length;

            var main_score_array = [];
			var inner_score_array = [];

			for(i=0; i<no_of_score_instance; i++){
            	main_score_array[i] = [response.scores[i].time_axis, response.scores[i].score];
            }

   			$(function () {
		        // Create the chart
		        $('#acceleration-container').highcharts('StockChart', {


		            rangeSelector : {
		                selected : 1
		            },

		            title : {
		                text : 'Acceleration vs Time Instance'
		            },
		            xAxis: {
			            title: {
			                text: 'Time'
			            }
			        },
		            yAxis: {
			            title: {
			                text: 'Acceleration'
			            }
			        },
		            series : [{
		                name : 'Acceleration',
		                data : main_acceleration_array,
		                type : 'areaspline',
		                threshold : null,
		                tooltip : {
		                    valueDecimals : 2
		                },
		                fillColor : {
		                    linearGradient : {
		                        x1: 0,
		                        y1: 0,
		                        x2: 0,
		                        y2: 1
		                    },
		                    stops : [
		                        [0, Highcharts.getOptions().colors[1]],
		                        [1, Highcharts.Color(Highcharts.getOptions().colors[5]).setOpacity(0).get('rgba')]
		                    ]
		                }
		            }]
		        });
		    });

		    $(function () {
		        // Create the chart
		        $('#scores-container').highcharts('StockChart', {


		            rangeSelector : {
		                selected : 1
		            },

		            title : {
		                text : 'Score vs Time Instance'
		            },
		            xAxis: {
			            title: {
			                text: 'Time'
			            }
			        },
		            yAxis: {
			            title: {
			                text: 'Score'
			            }
			        },
		            series : [{
		                name : 'Score',
		                data : main_score_array,
		                type : 'areaspline',
		                threshold : null,
		                tooltip : {
		                    valueDecimals : 2
		                },
		                fillColor : {
		                    linearGradient : {
		                        x1: 0,
		                        y1: 0,
		                        x2: 0,
		                        y2: 1
		                    },
		                    stops : [
		                        [0, Highcharts.getOptions().colors[1]],
		                        [1, Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0).get('rgba')]
		                    ]
		                }
		            }]
		        });
		    });

   			$(function () { 
			   	$('#events-container').highcharts({
			        chart: {
			            type: 'bar'
			        },
			        title: {
			            text: 'Events'
			        },
			        xAxis: {
			            categories: event_labels
			        },
			        yAxis: {
			            title: {
			                text: 'Value'
			            }
			        },
			        series: [{
			            data: event_values
			        }]
			    });
			});

        } else {
            $container.html("");
            $container.append("<h2>Trip Details Not Found</h2>");
        }
    });	
}