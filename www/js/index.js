var app = {
	initialize : function() {
		this.bind();
	},
	bind : function() {
		document.addEventListener('deviceready', this.deviceready, false);
	},
	onAccSuccess : function(acceleration) {
		$("#accX").html('Acceleration X: ' + acceleration.x);
		$("#accY").html('Acceleration Y: ' + acceleration.y);
		$("#accZ").html('Acceleration Z: ' + acceleration.z);
	},
	onAccError : function() {
		alert('ACC Error');
	},
	onContactsSuccess: function(contacts) {
	    $("#debug").html("Found: " + contacts.length);
	    $("#deviceContacts").empty();
	    var items = [];
	    for (var i = 0; i < contacts.length; i++) {
	    	items.push("<li><a href='#'>" + contacts[i].displayName + "</a></li>");
	    }
	    $("#deviceContacts").append(items);
	    $("#deviceContacts").listview("refresh");	
	},
	onContactsError: function() {
	    $("#debug").html("error...");
	},	
	deviceready : function() {
		// note that this is an event handler so the scope is that of the event
		// so we need to call app.report(), and not this.report()
		// app.report('deviceready');
		console.log("deviceready1");
		console.log("deviceready2");
		navigator.accelerometer.watchAcceleration(app.onAccSuccess, app.onAccError, {frequency:100});

		$.getJSON("http://mobile-html5.rhcloud.com/rest/members", function(data) {
			$("#contacts").empty();
		    	var items = [];
		    	$.each(data, function(key, val) {
		    		console.log("item: " + key + " " + val.name);
		    		items.push("<li><a href='#"+ key + "'>" + val.name +"</a></li>");
		    	});
		    	$("#contacts").append(items);
		    	$("#contacts").listview("refresh");
		});    	

		
		$("#btnDeviceContacts").on("click", function(e) {
			   console.log("button clicked");
			   $("#debug").html("finding...");
			   var options      = new ContactFindOptions();
			   options.multiple = true;
			   var fields       = ["displayName", "name"];
			   navigator.contacts.find(fields, app.onContactsSuccess, app.onContactsError, options);
			});

	},
	report : function(id) {
		console.log("report:" + id);
		// hide the .pending <p> and show the .complete <p>
		document.querySelector('#' + id + ' .pending').className += ' hide';
		var completeElem = document.querySelector('#' + id + ' .complete');
		completeElem.className = completeElem.className.split('hide').join('');
	}
};
