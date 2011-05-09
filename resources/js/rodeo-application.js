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
			var data = {"notificationWillClose": function(alert){
				var email = alert.find("input").val();
				if(email.length > 0)
				{
					client.linkEmailAddress(email);
				}
			}}
			
			rodeo.notifications.alert(data, "#modal-welcome");
			// maybe here we provide the option of associating an email address with the uuid so recovery becomes possible.
		}
		
		$("#action-sync").click(function(e){
			client.beginSyncProcess();
		})
	}
	else
	{
		var data = {"message"     : "Sorry Hombre, your browser is not qualified to round up this application",
		            "buttonLabel" : "Close"}
		
		rodeo.notifications.alert(data);
	}
});