import sys
import os

import tornado.ioloop
import tornado.web

from rodeo.controllers.main import MainController
from rodeo.controllers.accounts import RegisterController


settings = {
	"static_path": os.path.join(os.path.dirname(__file__), "resources"),
	"static_url_prefix":"/resources/"
}

application = tornado.web.Application([
	(r"/", MainController),
	(r"/register", RegisterController),
	(r"/register/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})", RegisterController),
	#(".*", CatchAllHandler),
], **settings)

if __name__ == "__main__":
	application.listen(8080)
	tornado.ioloop.IOLoop.instance().start()
	
	
	