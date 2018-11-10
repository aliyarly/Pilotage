from PilotageData.settings.base import *

WSGI_APPLICATION = 'PilotageData.wsgi.application'

# cors
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = (
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
    'VIEW'
)
from corsheaders.defaults import default_headers

CORS_ALLOW_HEADERS = default_headers + ('accept-language',)