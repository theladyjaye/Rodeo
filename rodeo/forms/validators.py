import re

class Validator(object):
    
    def validate(self): pass
    def is_valid(self): pass
    
    def update_required_flag(self, value):
        if len(self.value) > 0 and self.should_require:
            self.required = True
        else:
            self.required = False if self.should_require else True
    
class PatternValidator(Validator):
    def __init__(self, value, pattern, required=False, tag=None):
        self.value = value
        self.tag = tag
        self.pattern = re.compile(pattern)
        self.required  = required
        self.should_require = False if required is True else True
        self._is_valid = False
        
    def validate(self):
        self.update_required_flag(self.value)
        
        if self.pattern.match(self.value):
            self._is_valid = True
    
    def is_valid(self):
        return self._is_valid
        
class EmailValidator(PatternValidator):
    def __init__(self, value, required=False, tag=None):
        PatternValidator.__init__(self, value, "", required)
        
        # https://code.djangoproject.com/browser/django/trunk/django/core/validators.py ~line 135 - 137
        self.pattern =  re.compile(r"(^[-!#$%&'*+/=?^_`{}|~0-9A-Z]+(\.[-!#$%&'*+/=?^_`{}|~0-9A-Z]+)*"  # dot-atom
                       r'|^"([\001-\010\013\014\016-\037!#-\[\]-\177]|\\[\001-011\013\014\016-\177])*"' # quoted-string
                       r')@(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,6}\.?$', re.IGNORECASE)