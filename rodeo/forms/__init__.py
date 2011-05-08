from rodeo.forms.validators import Validator

class Form(object):
    
    def __init__(self):
        self.validators = []
        self._is_valid = True
        self._needs_validation = True
    
    def addValidator(self, validator):
        self.validators.append(validator)
    
    def is_valid(self):
        if self._needs_validation:
            self.validate()
            
        return self._is_valid
        
    def validate(self):
        if len(self.validators) > 0:
            self._is_valid = False
            self.validate_form()
        
        self._needs_validation = False
        
    def validate_form(self):
        tmp_flag = True
        
        for validator in self.validators:
            validator.validate()
            
            if validator.required:
                tmp_flag = (tmp_flag and validator.is_valid())
                
        if tmp_flag is not self._is_valid:
            self._is_valid = tmp_flag
    