from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from .db import get_db_with_attr_condition, get_row_mysql
from .str_sql import pre_choice, boat_date


class DemoDataView(GenericAPIView):

    def get(self, request):
        """Process GET request and return data."""
        data = {
            'results': 'THIS IS THE PROTECTED STRING FROM SERVER',
        }
        return Response(data, status=status.HTTP_200_OK)


class BoatListView(GenericAPIView):
    db_name = 't_planworkhb'

    def get(self, request):
        data = get_db_with_attr_condition(self.db_name,
                                          condition={'VCENAME': 'YM IDEALS',
                                                     'VCCNAME': '英明'},
                                          limit_number=3)
        print(data, 'get ji tuan chuan biao')
        print(type(data))
        return Response(data)


class PreChoiceBoatlist(GenericAPIView):

    def get(self, request, number=10):
        limit = ' LIMIT %s' %str(number)
        print(pre_choice, 'row mysql str')
        pre_choice_end = pre_choice + limit
        data = get_row_mysql(pre_choice_end)
        return Response(data=data)


class BoatDatelist(GenericAPIView):

    def get(self, request, number=10):
        limit = ' LIMIT %s' %str(number)
        print(boat_date, 'row mysql str')
        boat_date_end = boat_date + limit
        data = get_row_mysql(boat_date_end)
        return Response(data=data)