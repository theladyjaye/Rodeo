var rodeo = rodeo || { }
rodeo.notifications = { }
rodeo.notifications.alert = function(object)
{
	var template = $("#modal-alert").html();
	var model = {"title"   : "Alert",
	             "message" : "Something happened. Just letting ya know about it",
	             "label"   : "Ok"};
	if(object)
	{
		model.title = (typeof object.title       == "undefined" ? model.title : object.title)
		model.title = (typeof object.message     == "undefined" ? model.message : object.message)
		model.title = (typeof object.buttonLabel == "undefined" ? model.buttonLabel : object.buttonLabel)
	}
	
	var view = $(Mustache.to_html(template, model));
	
	view.modal({closeClass:".actions .button",
		        opacity:80,
		        overlayCss: {backgroundColor:"#000"}});
}

rodeo.notifications.confirmation = function(object)
{
	var template = $("#modal-confirmation").html();
	alert(object.message);
}