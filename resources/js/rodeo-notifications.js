var rodeo = rodeo || { }
rodeo.notifications = { }
rodeo.notifications.alert = function(object, template_selector)
{
	var template = template_selector ? $(template_selector).text() : $("#modal-alert").text();
	var model = {"title"   : "Alert",
	             "message" : "Something happened. Just letting ya know about it",
	             "label"   : "Ok"};
	
	var notificationWillClose = null;
	var notificationDidClose = null;
	
	if(object)
	{
		model.title       = (typeof object.title       == "undefined" ? model.title : object.title)
		model.message     = (typeof object.message     == "undefined" ? model.message : object.message)
		model.buttonLabel = (typeof object.buttonLabel == "undefined" ? model.buttonLabel : object.buttonLabel)
		
		notificationWillClose = (typeof object.notificationWillClose == "undefined" ? null : object.notificationWillClose);
		notificationDidClose = (typeof object.notificationDidClose == "undefined" ? null : object.notificationDidClose);
	}
	
	var view = $(Mustache.to_html(template, model));
	
	view.modal({closeClass:".actions .button",
		        opacity:80,
		        overlayCss: {backgroundColor:"#000"},
		        onClose:function(notification){
		            if(notificationWillClose) notificationWillClose(notification.data);
		            $.modal.close();
		            if(notificationDidClose) notificationDidClose(notification.data);
		        }});
}

rodeo.notifications.confirmation = function(object)
{
	var template = $("#modal-confirmation").html();
	alert(object.message);
}