import json
import rodeo
import rodeo.controllers
from rodeo.users import User
from rodeo.forms import Form
from rodeo.forms.validators import EmailValidator



class RegisterController (rodeo.controllers.DefaultController):

    def prepare(self):
        self.set_header("Content-Type", "text/json")
        
    def get(self):
        user = User()
        user.add()
        self.write(json.dumps({"ok":True, "uuid":user.id}))
        
    def post(self, uuid):
        user = User(uuid)
        if user.id is not None:
            email = self.get_argument("email")
            form = Form()
            form.addValidator(EmailValidator(value=email, required=True))
            
            if form.is_valid():
                if user.linkEmailAddress(email) is False:
                    self.write(json.dumps({"ok":False, "message":"email address is already taken"}))
                    return
                                    
                self.write(json.dumps({"ok":True, "email":email}))
            else:
                self.write(json.dumps({"ok":False, "message":"could not link email address. invalid format"}))
        else:
            self.write(json.dumps({"ok":False, "message":"invalid user"}))
