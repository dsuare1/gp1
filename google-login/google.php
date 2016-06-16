<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<b>Please disable popup blocker as this will ask for permission in a popup</b><br />
<script src="https://apis.google.com/js/client.js?onload=init"></script>

<input type='button' onclick='gSignIn()' value='Login with Google'>
<br />
<br />
<div id="ids"></div>
<div id="name"></div>
<div id="email"></div>

<Script>
function gSignIn(){
    
	gapi.load('auth2', function() {
				  auth2 = gapi.auth2.init({
				    client_id: '<client id>'
				  });
				  auth2.signIn().then(function() {
				  	onSignIn();
				  });
				});
}

  function onSignIn(googleUser) {
  	var profile = auth2.currentUser.get().getBasicProfile();
  	var userDetails = new Object();
		var id = profile.getId();
		var name = profile.getName();
		var email = profile.getEmail();        
        $("#ids").html("Id is <b>"+id+"</b>");
        $("#name").html("Name is <b>"+name+"</b>");
        $("#email").html("Email is <b>"+email+"</b>");
        
    
}
</script>