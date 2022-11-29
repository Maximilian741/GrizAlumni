//Max Casteel
//Riley Marsden
//11/29/2022

//This is the javascript file for the alumni display page. It is used to display the alumni information in a table.
//It also contains the functions to make the Contact Us section work.

//This function is used to make the Contact us section on the index.html page work.
//It is called when the submit button is clicked.  Furthermore, the name, email, and message fields must be filled out.
//It then sends the information to the specified email address.
function sendEmail() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    var body = "Name: " + name + "From: " + email + "Message: " + message;
    if (name == "" || email == "" || message == "") {
        alert("Please Fill All Fields");
    }
    else {
        Email.send({
            Host: "smtp.gmail.com",
            Username: "
            Password: "
            To: "
            From: "
            Subject: "New message from contact form",
            Body: body
        }).then(
            message => alert("mail sent successfully")
        );
    }
}