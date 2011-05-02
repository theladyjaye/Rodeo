import rodeo
import rodeo.controllers

class MainController (rodeo.controllers.DefaultController):
	
	def get(self):
		
		#if True:
		#	#raise tornado.web.HTTPError(404)
		#	self.write(self.get_error_html(404))
		#	return
		
		view = rodeo.templates.get_template("index.html")
		self.write(view.render({"name":"Lucy", "title":"Hello Tornado"}))
		
