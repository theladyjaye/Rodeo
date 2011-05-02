var rodeo = rodeo || { }
rodeo.client = { }

rodeo.client.Client = function()
{
	this.id = null;
	this.eventStore = null;
	this.persistentStore = new rodeo.Storage();
	this._isNewAccount = true;
	
	if(this.hasAccount() == false)
	{
		this.createAccount();
	}
	else
	{
		this.id = this.persistentStore.getId();
		this._isNewAccount = false;
	}
}

rodeo.client.Client.prototype.isNewAccount = function()
{
	return this._isNewAccount;
}

rodeo.client.Client.prototype.hasAccount = function()
{
	return !(typeof this.persistentStore.getId() == "undefined");
}

rodeo.client.Client.prototype.createAccount = function()
{
	var scope = this;
	$.ajax({"url":"/register",
	        "dataType": "json",
	        "success": function(data){
	                       scope.persistentStore.setId(data.uuid);
	                   }
	       });
}