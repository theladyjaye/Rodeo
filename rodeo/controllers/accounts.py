import rodeo
import rodeo.controllers
import json
from rodeo.users import User

class RegisterController (rodeo.controllers.DefaultController):
	
	def get(self):
		user = User()
		user.add()
		self.write(json.dumps({"ok":True, "uuid":user.id}))
		
		
