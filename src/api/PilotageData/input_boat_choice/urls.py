# coding: utf-8
from django.urls import re_path
from .views import *

app_name = 'input_boat_choice'

urlpatterns = [

    re_path(r'^$', DemoDataView.as_view(),
            name='demo'),
    re_path(r'^boat/prechoice/$', PreChoiceBoatlist.as_view(),
            name='boat_choice'),
    re_path(r'^boat/date/$', BoatDatelist.as_view(),
            name='boat_date'),
]