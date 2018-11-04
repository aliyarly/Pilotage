from rest_framework import authentication


class NoAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        return None