var rodeo = rodeo || { }
rodeo.notifications = { }
rodeo.notifications.alert = function(object)
{
	alert(object.message);
}

rodeo.notifications.confirmation = function(object)
{
	alert(object.message);
}