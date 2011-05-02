from jinja2 import Environment, PackageLoader
templates = Environment(loader=PackageLoader('rodeo', 'views'))


