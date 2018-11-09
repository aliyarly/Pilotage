from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from .db import get_db_with_attr_condition, get_row_mysql
from .str_sql import pre_choice, boat_date, boat_jt, boat_jt_err, boat_plan_in
PAGE_SIZE = 10

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


class BaseViewNoModel(GenericAPIView):
    def get_queryset(self):
        return None

    def parse_request(self, request):
        page_number = request.query_params.get('page', 1)
        page_size = request.query_params.get('page_size', PAGE_SIZE)
        return page_number, page_size
        
    def page_handle(self,page_number=1, page_size=PAGE_SIZE):
        return ' LIMIT {}, {}'.format(str((page_number - 1)*page_size), str(page_size))

    def query_sql(self, sql_name):
        res = {'results': []}
        try:
            data = get_row_mysql(sql_name)
        except Exception as e :
            print('ERROR: {}'.format(str(e)))
            res = {'results': [],
                    'is_success': 0,
                    'err_msg': str(e)}
        else:
            print(data, "DATA IN VIEW")
            res = {'results': data,
                    'is_success': 1}
            return res

class PreChoiceBoatlist(BaseViewNoModel, GenericAPIView):

    def get(self, request):
        page_number, page_size = self.parse_request(request)
        limit = self.page_handle(page_number,page_size)
        pre_choice_end = pre_choice + limit if limit else ''
        data = self.query_sql(pre_choice_end)
        return Response(data, status=status.HTTP_200_OK)

class BoatDatelist(BaseViewNoModel, GenericAPIView):

    def get(self, request):
        # add 分页操作
        page_number, page_size = self.parse_request(request)
        limit = self.page_handle(page_number,page_size)
        boat_date_end = boat_date + limit if limit else ''
        data = self.query_sql(boat_date_end)
        return Response(data, status=status.HTTP_200_OK)


class BoatGroupValidlist(BaseViewNoModel, GenericAPIView):

    def get(self, request):
        page_number, page_size = self.parse_request(request)
        limit = self.page_handle(page_number,page_size)
        boat_jt_end = boat_jt + limit if limit else ''
        data = self.query_sql(boat_jt_end)
        return Response(data, status=status.HTTP_200_OK)

class BoatGroupUnValidlist(BaseViewNoModel, GenericAPIView):

    def get(self, request):
        # TODO no ETA attr returned from mysql
        page_number, page_size = self.parse_request(request)
        limit = self.page_handle(page_number,page_size)
        boat_jt_err_end = boat_jt_err + limit if limit else ''
        data = self.query_sql(boat_jt_err_end)
        return Response(data, status=status.HTTP_200_OK)

class BoatPlanlist(BaseViewNoModel, GenericAPIView):

    def get(self, request):
        page_number, page_size = self.parse_request(request)
        limit = self.page_handle(page_number,page_size)
        boat_plan_in_end = boat_plan_in + limit if limit else ''
        data = self.query_sql(boat_plan_in_end)
        return Response(data, status=status.HTTP_200_OK)