
$(document).on('ready', function(){
	
	$("#trip-select").hide();

	populateDriversList();

	$("#driver_list").change(function () {
        
        var selectedDriver = $('#driver_list').val();
        populateTripsList(selectedDriver);
        $("#trip-select").show()
    });

    $("#trip_list").change(function () {
        console.log("trip list changed");
        var selectedTrip = $('#trip_list').val();
        console.log(selectedTrip);
        populateTripDetails(selectedTrip);
    });

});

function populateDriversList() {
    
    console.log("entered populateDriversList");
    var url = "/driverlist";
    $.get(url, function(response) {
        $container = $('.driver_list');

        var i = 0;

        if (response.length > 0) { 
            $container.html("");

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

function populateTripsList(id) {
    
    console.log("entered populateTripsList");
    var url = "/triplist/" + id;
    $.get(url, function(response) {
        $container = $('.trip_list');
        console.log("response returned");

        var i = 0;

        if (response.length > 0) { 
            $container.html("");

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

        e = response.events;
        obj = typeof(e);

        s = Object.keys(e).length;

        console.log(s);


        var i = 0;

        if (response != null) {

        	console.log("entered if"); 
            $container.html("");

            var labels_size = Object.keys(response.events).length;

            var event_labels = [];
            var i = 0;

            for(i=0; i<labels_size; i++){
            	event_labels[i] = response.events[i].label;
            }

			var event_values = [];
            
            for(i=0; i<labels_size; i++){
            	event_values[i] = response.events[i].value;
            }            



   			$(function () { 
			   	$('#trip-details').highcharts({
			        chart: {
			            type: 'bar'
			        },
			        title: {
			            text: 'Events'
			        },
			        xAxis: {
			            // categories: [response.events[0].label, response.events[1].label, response.events[2].label]
			            categories: event_labels
			        },
			        yAxis: {
			            title: {
			                text: 'Value'
			            }
			        },
			        series: [{
			            // name: 'Jane',
			            // data: [response.events[0].value, response.events[1].value, response.events[2].value]
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