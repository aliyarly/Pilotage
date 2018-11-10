# coding: utf-8
from django.urls import re_path
from .views import *

app_name = 'input_plan'

urlpatterns = [

    re_path(r'^$', PlanListView.as_view(),
            name='input_plan'),
    re_path(r'detail/(?P<plan_id>[0-9]+)/$', PlanDetailView.as_view(),
            name='input_plan_detail'), 
    re_path(r'^require/$', PilotRequireView.as_view(),
            name='input_pilot_require'), 
    re_path(r'^deep/$', PilotWaterDeepView.as_view(),
            name='input_pilot_shuishen'),      
            
]