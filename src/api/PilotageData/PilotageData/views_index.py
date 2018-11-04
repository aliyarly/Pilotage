import os
import logging
from django.conf import settings
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
logger = logging.getLogger('__file__')


@api_view(['HEAD'])
def health(request):
    """check whether end server work healthy"""
    print('health of server check pass !')
    logger.info('health of server check pass !')
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def index(request):
    """Return html for main application page."""
    abspath = open(os.path.join(settings.BASE_DIR, 'dist/index.html'), 'r')
    return HttpResponse(content=abspath.read())