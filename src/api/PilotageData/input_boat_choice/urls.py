# coding: utf-8
from django.urls import re_path
from .views import *

app_name = 'input_boat_choice'

urlpatterns = [

    re_path(r'^$', DemoDataView.as_view(),
            name='demo'),
    re_path(r'^prechoice/$', PreChoiceBoatlist.as_view(),
            name='boat_choice'),
    re_path(r'^date/$', BoatDatelist.as_view(),
            name='boat_date'),
    re_path(r'^group_valid/$', BoatGroupValidlist.as_view(),
            name='group_valid'),
    re_path(r'^group_unvalid/$', BoatGroupUnValidlist.as_view(),
            name='group_unvalid'),
    re_path(r'^plan/$', BoatPlanlist.as_view(),
            name='boat_plan'),        
]