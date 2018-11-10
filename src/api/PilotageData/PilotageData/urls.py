"""PilotageData URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.contrib import admin
from django.urls import include, path, re_path
from .views_index import health, index

urlpatterns = [
    path('health/', health, name='health check'),
    path('input/boat/', include(('input_boat_choice.urls', "input_boat_choice"),
                                namespace='input_boat_choice')),
    path('input/plan/', include(('input_plan.urls', "input_plan"),
                                namespace='input_plan')),
    path('input/rank/', include(('input_pilot_rank.urls', "input_pilot_rank"),
                                namespace='input_pilot_rank')),
    # path('input/schedule/', include(('input_schedule.urls', "input_schedule"),
    #                             namespace='input_schedule')),
    # path('output/boat/', include(('output_boat_choice.urls', "output_boat_choice"),
    #                             namespace='output_boat_choice')),
    # path('output/plan/', include(('output_plan.urls', "output_plan"),
    #                             namespace='output_plan')),
    # path('output/rank/', include(('output_pilot_rank.urls', "output_pilot_rank"),
    #                             namespace='output_pilot_rank')),
    # path('output/schedule/', include(('output_schedule.urls', "output_schedule"),
    #                             namespace='output_schedule')),
    # re_path(r'', index, name='index'),
    # path('admin/', admin.site.urls),
]
