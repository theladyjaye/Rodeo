var rodeo = rodeo || { }
rodeo.application = { }

$(document).ready(function()
{	
	var client = null;
	
	if(rodeo.utils.localStorage())
	{
		client = new rodeo.client.Client();
		if(client.isNewAccount())
		{
			// notify the user they need an account
			var data = {"message"     : "We noticed you don't have a Rodeo account. We've gone ahead and created one for you! Technology rules!",
			            "buttonLabel" : "Close"}
			
			rodeo.notifications.alert(data);
			// maybe here we provide the option of associating an email address with the uuid so recovery becomes possible.
		}
	}
	else
	{
		var data = {"message"     : "Sorry Hombre, your browser is not qualified to round up this application",
		            "buttonLabel" : "Close"}
		
		rodeo.notifications.alert(data);
	}
});