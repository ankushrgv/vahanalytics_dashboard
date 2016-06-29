
$(document).on('ready', function(){

	populateDriversList();

	$("#driver_list").change(function () {
        
        var selectedDriver = $('#driver_list').val();
        console.log(selectedDriver);

        populateTripsList(selectedDriver);
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
