var rodeo = rodeo || { }
rodeo.utils = { }

rodeo.utils.localStorage = function()
{
	try 
	{
	  return 'localStorage' in window && window['localStorage'] !== null;
	} 
	catch(e) 
	{
	  return false;
	}
}