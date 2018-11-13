# coding: utf-8
from django.urls import re_path
from .views import *

app_name = 'input_pilot_rank'

urlpatterns = [

    re_path(r'^$', PilotRankListView.as_view(),
            name='input_pilot_rank_left'),
    re_path(r'detail/(?P<plan_id>[0-9]+)/$', PilotRankDetailView.as_view(),
            name='input_pilot_rank_detail'),     
    re_path(r'^pilot/$', PilotListView.as_view(),
            name='input_pilot_rank_right'), 
    re_path(r'^pilot/status/$', PilotStatusView.as_view(),
            name='input_pilot_status'),  
    re_path(r'^pilot/detail/up/(?P<pilot_id>[0-9]+)/$', PilotDetailUpView.as_view(),
            name='input_pilot_detail_up'),
    re_path(r'^pilot/detail/down/(?P<pilot_id>[0-9]+)/$', PilotDetailDownView.as_view(),
            name='input_pilot_detail_down'),
    re_path(r'^pilot/auto/$', AutoInfoView.as_view(),
            name='input_pilot_auto_deploy'),                       
]