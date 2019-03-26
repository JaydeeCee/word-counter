
// Jquery codes for word count
$(document).ready(function() {

	$(".btn").click(function() {

		// declare and initialise variables
		var htmlText;
		var htmlArray= [];
		var tableArray = [];
		var sortArray = [];

		// get file from html input element
		var file = document.getElementById('count').files[0];
		
		// validate file is html type
		if(!file) {
			alert("No file was selected. Please select a file");
			return;
		} else if(file.type != "text/html"){
			console.log(file.type);
			alert("File must be a webpage. Please upload a webpage");
			return;
			
		// if html type, read file
		} else {
			var reader = new FileReader();
			
			reader.onload = function(e) {

				htmlText = this.result;

				// split file into lines, read each line, strip html tags, whitespaces, special xters and numbers
				var wstripped = htmlText.split('\n');
				for (var i = 0; i < wstripped.length; i++) {
					var stripped = wstripped[i].replace(/(<([^>]+)>)/ig,"");
					var strip = stripped.replace(/[ \t\r\n]/ig, " ");
					var hstring = strip.trim();
					if(hstring.length > 0) {
						var res = hstring.split(" ");

						for (var j = 0; j < res.length; j++) {
							var stripp = res[j].replace(/[^A-Z | a-z]/ig, "");
							if(stripp != "") {
								
								// store stripped words in an array and set all words to lower caser
								htmlArray.push(stripp);
							}
							
						}
					}
				}
				
				// loop through array to determine number of occurrences
				var arrayLength = htmlArray.length;
				for (var i = 0; i < htmlArray.length; i++) {
					var counter = 0;
					//check to ensure a word is newly selected for occurences
					if(!sortArray.includes(htmlArray[i])) {
						counter++
						// check number of occurrences of a word throughout the array
						for (var j = arrayLength; j > i; j--) {

							if(htmlArray[j] === htmlArray[i]) {
								counter++;
							}
						}
					}
					// ensure no word is duplicated by checking counter
					if(counter !== 0) {
						//set result as a JSON object and push into array
						var tableJson = {
							"Word": htmlArray[i],
							"Occurence(s)": counter
						}
						tableArray.push(tableJson);					
					}
					
					// set in a seperate array every word already checked 
					sortArray.push(htmlArray[i]);
			
				}
				
				// make a dynamic table for final result
				convertToTable(tableArray);

			}
			reader.readAsText(file);
		}
	});

		// function to convert JSON array to dynamic table
		function convertToTable(jsonData) {
		var arrJSON = jsonData;

		console.log(arrJSON);

		var $table = $('<table id="tempTable"/>');
		var $tHead = $('<thead/>')
		var $headerTr = $('<tr/>');
		var $tFoot = $('<tfoot/>')

		var $tBody = $('<tbody/>')

		for (var index in arrJSON[0]) {
	    $headerTr.append($('<th/>').html(index));
	    }
	    $tHead.append($headerTr)
	    $table.append($tHead);

		for (var i = 0; i < arrJSON.length; i++) {
		   var $tableTr = $('<tr/>');
		    for (var index in arrJSON[i]) {
		      $tableTr.append($('<td/>').html(arrJSON[i][index]));
		    }
		    $tBody.append($tableTr)
		    $table.append($tBody);
		    $table.append($tFoot);
		  }
		document.getElementById("wordTable").innerHTML = '';
		$('#wordTable').append($table);
		$('#tempTable').DataTable();
	}
});