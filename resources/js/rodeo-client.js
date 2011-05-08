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
		this.cleanup()
		this.sync()
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

rodeo.client.Client.prototype.cleanup = function()
{
	// check our persistent store for any expired events
	// if we find some, kill em
}

rodeo.client.Client.prototype.sync = function()
{
	// check the server for any new event id's
	// if we have new stuff update the persistentStore with that info.
	// set last login here
}

rodeo.client.Client.prototype.createAccount = function()
{
	var scope = this;
	$.ajax({"url":"/register",
	        "dataType": "json",
	        "success": function(data){
	                       scope.persistentStore.setId(data.uuid);
                           scope.id = data.uuid;
	                   }
	       });
}

rodeo.client.Client.prototype.linkEmailAddress = function(email)
{
	var scope = this;
	$.ajax({"url":"/register/" + scope.id,
	        type:"POST",
	        data: {"email":email},
	        "dataType": "json",
	       });
}