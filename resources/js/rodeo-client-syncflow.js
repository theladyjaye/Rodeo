var rodeo = rodeo || { }
rodeo.client = rodeo.client || { }
rodeo.client.SyncFlow = function(id)
{
	this.TRANSITION_TIME = 350;
	this.TOKEN_TIMEOUT   = 120;
	
	this.id = id ? id : null;
	this.offset = 0;
	var html = $("#modal-sync").html();
	var view = $(html);
	this.actionContext = view.find("ul");
	this.initializeStartActions();
	
	view.modal({opacity:80,
				overlayCss: {backgroundColor:"#000"},
				});
	
	this.actionContext.delegate(".button.cancel", "click", function(){
		$.modal.close();
	});
	
	var firstChild = this.actionContext.find("li:first-child");
	this.pageSize  = parseInt(firstChild.width(), 10) + parseInt(firstChild.css("margin-right"), 10);
}

rodeo.client.SyncFlow.prototype.initializeStartActions = function()
{
	var startActions = this.actionContext.find("#start .choice .actions");
	var scope = this;
	startActions.find(".account-device").click(function(e){ scope.syncToDevice() });
	startActions.find(".device-account").click(function(e){ scope.syncToAccount() });
}

rodeo.client.SyncFlow.prototype.syncToDevice = function(e)
{
	var scope = this;
	var target = this.actionContext.find("li#account-device");
	target.show();
	this.left();
	
	target.find(".actions .button.get-token").click(function(e){ scope.getToken() })
}

rodeo.client.SyncFlow.prototype.syncToAccount = function()
{
	var target = this.actionContext.find("li#device-account");
	target.show();
	this.left();
}

rodeo.client.SyncFlow.prototype.getToken = function(e)
{
	var target = this.actionContext.find("li#account-device-token");
	var scope = this;
	
	target.show();
	this.left();
	
	if(this.id != null)
	{
		$.ajax({"url":"/register/" + this.id + "/sync-token/",
		        "dataType": "json",
		        "success": function(data){
		                       scope.getTokenComplete(target, data.token);
		                   }
		       });
	}
	else
	{
		var tokenPlaceholder = target.find(".token");
		target.find("img.loader").hide();
		tokenPlaceholder.text("UNABLE TO RETRIEVE SYNC TOKEN");
		tokenPlaceholder.show();
	}
}

rodeo.client.SyncFlow.prototype.getTokenComplete = function(target, token)
{
	var tokenPlaceholder = target.find(".token");
	//artifically delay for effect:
	setTimeout(function(){
		target.find("img.loader").hide();
		tokenPlaceholder.text(token);
		tokenPlaceholder.show();
	}, 2000);
	
}

rodeo.client.SyncFlow.prototype.submitToken = function(e)
{
	
}

rodeo.client.SyncFlow.prototype.left = function()
{
	this.offset = this.offset + (-1 * this.pageSize)
	this.actionContext.animate({"left": this.offset + "px",
						   "useTranslate3d": true,
						   "leaveTransforms":true}, this.TRANSITION_TIME);
}

rodeo.client.SyncFlow.prototype.right = function()
{
	this.offset = this.offset + this.pageSize
	this.actionContext.animate({"left": this.offset + "px",
						   "useTranslate3d": true,
						   "leaveTransforms":true}, this.TRANSITION_TIME);
}