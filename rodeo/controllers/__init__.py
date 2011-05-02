import tornado.web

class DefaultController(tornado.web.RequestHandler):
	
	def get_error_html(self, status_code, exception=None, **kwargs):
		self.write("We had a problem... very sad")