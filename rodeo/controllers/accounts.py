import rodeo
import rodeo.controllers
import uuid
import json

class RegisterController (rodeo.controllers.DefaultController):
	
	def get(self):
		self.write(json.dumps({"ok":True, "uuid":str(uuid.uuid4())}))
		
