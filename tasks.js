$(document).ready(function() {

	// read from localStorage
	let listOfTasks = JSON.parse( localStorage.getItem("tasklist") );
	if( !listOfTasks || listOfTasks == undefined ){
		listOfTasks = [];
	}
	

	// listing each task when the page loads
	$.each( listOfTasks, function(i){
		let text = listOfTasks[i];
		addTask(text);
	});
	// alternately, you can use a for() loop to do this same thing


	// adding items
    $("#add").click(function() {
		// note: I removed all the default code from here and wrote my own
		// That's mostly because I prefer my own code to some textbook author's
		// The code that was here worked fine, but I like mine better :)
		let text = $('#task').val();
		addTask(text);
		listOfTasks.push( text );
		localStorage.setItem("tasklist", JSON.stringify(listOfTasks));
    	$("#task").val("");
	});
	
	// deleting items
	$('body').on("click", ".delete", function(){
		let text = $(this).next().text();
		let index = listOfTasks.indexOf(text);

		// the array.splice() method removes an item. The first parameter is the
		// index of the item to splice. The second is *how many* items to splice
		// We are deleting one at a time, so the parameter is just 1
		listOfTasks.splice(index,1);
		localStorage.setItem("tasklist", JSON.stringify(listOfTasks));
		$(this).parent().remove();
	})
});

// I made a separate function to add tasks. Didn't want to repeat code.
function addTask( task ){
	let li = $('<li></li>');
	let button = $('<button></button>');
	let span = $('<span></span>')
	$(button).text("Task complete").addClass("delete");
	$(span).text( task );
	$(li).append(button).append(span);
	$('ul').append(li);
}