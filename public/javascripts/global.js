var userListData = [];
var currentUserId = '';

$(document).ready(function(){

	populateTables();

	$('#btnLogin').on('click', loginUser);

	$('#btnRegister').on('click', addUser);

	$('#btnAddBook').on('click', addBook);

});

function populateTables(){

	var cfcTableContent = '';
	var svmTableContent = '';
	var studentBooks = 0;
	var mikeBooks = 0;
	var readCFC = [];

	$.getJSON( '/users/userlist', function( data ) {

    	userListData = data;
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
        	if(this.username == "mkang"){
        		mikeBooks = this.books.length;
        	}
        	else{
        		studentBooks += this.books.length;
        	}
        	this.books.forEach(function(book){
        		if(book.title == "Case for Christmas"){
        			readCFC.push(this.fullname);
        		}
        	});

        });
        svmTableContent += '<tr>';
        svmTableContent += '<td>'+ studentBooks +'</td>';
        svmTableContent += '<td>' + mikeBooks + '</td>';
        svmTableContent += '</tr>';
        // Inject the whole content string into our existing HTML table
        $('#svmList table tbody').html(svmTableContent);
        readCFC.forEach(function(name){
        	cfcTableContent += '<tr>';
        	cfcTableContent += '<td>' + name + '</td>';
        	cfcTableContent += '</tr>';
        });
        $('#cfcList table tbody').html(cfcTableContent);
    });

}

function loginUser(event){
	event.preventDefault();
	var userName = $('#login input#loginUserName').val();
	var pass = $('#login input#loginPassword').val();
	var success = false;
	var hasPrompted = false;

	$.getJSON( '/users/userlist', function( data ) {
		userListData = data;

		$.each(data, function(i, item){
			if(item.username === userName && item.password === pass){
				currentUserId = item._id;
				window.location.href = "/home";
				success = true;
				return false;
			}
			else if(item.username === userName){
				window.alert("Incorrect Password");
				hasPrompted = true;
				return false;
			}
		});
		if(!success && !hasPrompted){
			window.alert("Incorrect User Name/Password combination");
			return false;
		}
	});
};

function addUser(event){

	event.preventDefault();

	var errorCount = 0;
	$('#register input').each(function(index, val){
		if($(this).val() === ''){
			errorCount++;
		}
	});
	$('#register select').each(function(index, val){
		if($(this).val() === null){
			errorCount++;
		}
	});

	if(errorCount === 0){
		var newUser = {
<<<<<<< HEAD
			'fullname': $('#register input#regFullName').val(),
			'username': $('#register input#regUserName').val(),
			'password': $('#register input#regPassword').val(),
			'email': $('#register input#regEmail').val(),
			'year': $('#register select#regYear').val(),
			'gender': $('#register select#regGender').val()
		}

		$.ajax({
			type: 'POST',
			data: newUser,
			url: '/users/registeruser',
			dataType: 'JSON'
		}).done(function(response){

			if(response.msg === ''){
				$('#register fieldset input').val('');
				populateTable();
			}
			else{
				alert('Error: ' + response.msg);
			}

		});

		window.location.href = "/home";

	}
	else{
		alert('Please fill in all fields');
		return false;
	}

};

function displayUserInfo(){
	event.preventDefault();

	//Populate Info Box
	$('#username').text(currentUserId.user);
	$('#userEmail').text(currentUserId.email);
	$('#userYear').text(currentUserId.year);
	$('#userGender').text(currentUserId.gender);
}

function displayBooksRead(){
	event.preventDefault();

	// Empty content string
	var tableContent = '';

	// jQuery AJAX call for JSON
	$.getJSON( '/profileInfo', function( data ) {

		userBookList = data;

		// For each item in our JSON, add a table row and cells to the content string
		$.each(data, function(){
			tableContent += '<tr>';
			tableContent += '<td>' + this.title + '</td>';
			tableContent += '<td>' + this.author + '</td>';
			tableContent += '</tr>';
		});

		// Inject the whole content string into our existing HTML table
		$('#bookTable table tbody').html(tableContent);

	});

}

function addBook(event){

	event.preventDefault();

	var errorCount = 0;
	$('#addBook input').each(function(index, val){
		if($(this).val() === ''){
			errorCount++;
		}
	});

	if(errorCount === 0){
		var newBook = {
			'title': $('#addBook input#bkTitle').val(),
			'author': $('#addBook input#bkAuthor').val(),
		}

		$.ajax({
			type: 'POST',
			data: newBook,
			url: '/profile/addbook',
			dataType: 'JSON'
		}).done(function(response){

			if(response.msg === ''){
				$('#register fieldset input').val('');
				populateTable();
			}
			else{
				alert('Error: ' + response.msg);
			}

		});

		window.location.href = "/home";
=======
            'fullname': $('#register input#regFullName').val(),
            'username': $('#register input#regUserName').val(),
            'password': $('#register input#regPassword').val(),
            'email': $('#register input#regEmail').val(),
            'year': $('#register select#regYear').val(),
            'gender': $('#register select#regGender').val(),
            'books': "[{'title' : 'Case For Christmas', 'author' : 'Lee Strobel'}{'title' : 'Mere Christianity', 'author' : 'C.S. Lewis'}]"
        }

        $.ajax({
        	type: 'POST',
        	data: newUser,
        	url: '/users/registeruser',
        	dataType: 'JSON'
        }).done(function(response){

        	if(response.msg === ''){
        		$('#register fieldset input').val('');
        		populateTable();
        	}
        	else{
        		alert('Error: ' + response.msg);
        	}

        });

        window.location.href = "/home";
>>>>>>> 329b420b3ebac31147ead9b2ef42c448e20a673c

	}
	else{
		alert('Please fill in all fields');
		return false;
	}

};

