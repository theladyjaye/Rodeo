var rodeo = rodeo || { }
rodeo.notifications = { }
rodeo.notifications.alert = function(object)
{
	var template = $("#modal-alert").html();
	var model = {"title"   : (typeof object.title       == "undefined" ? "Alert" : object.title),
	             "message" : (typeof object.message     == "undefined" ? "Something happened" : object.message),
	             "label"   : (typeof object.buttonLabel == "undefined" ? "Ok" : object.buttonLabel)}
	var view = $(Mustache.to_html(template, model));
	
	view.modal({closeClass:".actions .button",
		        opacity:80,
		        overlayCss: {backgroundColor:"#000"}});
}

rodeo.notifications.confirmation = function(object)
{
	alert(object.message);
}