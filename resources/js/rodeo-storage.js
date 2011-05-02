var rodeo = rodeo || { }
rodeo.Storage = function()
{
	this.identificationKey = "uuid";
}

rodeo.Storage.prototype.setId = function(value)
{
	localStorage[this.identificationKey] = value;
}

rodeo.Storage.prototype.getId = function()
{
	return localStorage[this.identificationKey]
}