from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
import random
from input_boat_choice.views import BaseViewNoModel
left_list_sql = """
select chDynPlanID,
    a.vcVesCName,
    a.INNO,
	a.nmVesLength,
    NMBACKGUAGE,
    chberthsign as chberthsign,
    sdBerthTimePilotage,
    dtAppointTime,
		(select VCPLACESNAME from t_code_placecode where  t_code_placecode.chplacecode= a.chappointplacecode) as chappointplacecode,
		a.CHONESTAKEFLAG,
		a.CHDRIVERPLACEFLAG,
		a.chPortPilotFlag,
        a.chVesTypeCode,
    (select VCVESTYPENAME from t_code_vestypecode where t_code_vestypecode.chvestypecode=a.chvestypecode) as chVesType,
     a.vcpilotrequire1,a.vcpilotrequire2,   
		chDragVesClassCode,
     (select VCDRAGSHCLASSNAME from t_code_dragshclasscode where t_code_dragshclasscode.chdragshclasscode=chDragVesClassCode) as chDragVesClass,
    a.vcPilotRequire,
     (select VCNATIONCNNAME from t_code_nationcode where t_code_nationcode.vcnationcode=a.CHNATIONCODE) as CHNATIONCODE,
		(select INPLACENO from t_code_placecode where t_code_placecode.chplacecode=chBerthSign) as inplaceno
from t_planwork a, t_base_vesinfo b
where
      a.chVesID=b.chVesID
      and a.chAttemperFlag='0'
      and IFNULL(a.CHCOMFLAG,'0')='0'
      and a.CHPILOTAGESTATE='1' and (a.CHPORT  not in ( 7,8,5,6) or a.chport is null ) 
order by DTAPPOINTTIME,inplaceno*1,a.nmVesLength*1 desc
"""
left_detail_sql ="""

"""
right_detail_sql = """
select chpilotcode, chpilotno, vcpilotname, chpilotgrade, chpilotclass, chpilotstate, inpilotorder,
       nmsamevesorder, dtstationtime, vcstationplace, nmworktime, chpilotfungrade,vcberthcode, dtberthtime,
       dtinstationtime,DTPLANENDTIME,NMNIGHTWORKFLAG,CHCOVERSENDFLAG 
from t_base_pilotinfo
where CHPILOTADSCRIPTCODE='1' and  CHWORKFLAG ='1' and CHPILOTSTATE='2'
"""
right_list_sql = """
select chpilotcode, chpilotno, vcpilotname, chpilotgrade, chpilotclass, chpilotstate, inpilotorder,
       nmsamevesorder, dtstationtime, vcstationplace, nmworktime, chpilotfungrade,vcberthcode, dtberthtime,
       dtinstationtime,DTPLANENDTIME,NMNIGHTWORKFLAG,CHCOVERSENDFLAG 
from t_base_pilotinfo
where CHPILOTADSCRIPTCODE='1' and  CHWORKFLAG ='1' and CHPILOTSTATE='2'
order by DTSTATIONTIME,CHPILOTFUNGRADE*1
"""
pilot_status_sql = """
select* from t_code_systemcode where vcSysCode='chPilotState' order by nmsort
"""
class PilotRankListView(BaseViewNoModel, GenericAPIView):
    # 获取引航计划列表数据
    def get(self, request):
        page_number, page_size = self.parse_request(request)
        limit = self.page_handle(page_number,page_size)
        left_list_sql_end = left_list_sql + limit if limit else ''
        data = self.query_sql(left_list_sql_end)
        return Response(data, status=status.HTTP_200_OK)



class PilotRankDetailView(BaseViewNoModel, GenericAPIView):
    # 获取某个引航计划详细数据
    def get(self, request, plan_id):
        page_number, page_size = self.parse_request(request)
        limit = self.page_handle(page_number,page_size)
        left_detail_sql_end = left_detail_sql + limit if limit else ''
        data = self.query_sql(left_detail_sql_end)
        return Response(data, status=status.HTTP_200_OK)


class PilotListView(BaseViewNoModel, GenericAPIView):
    # 获取引航员列表
    def get(self, request):
        page_number, page_size = self.parse_request(request)
        limit = self.page_handle(page_number,page_size)
        right_list_sql_end = right_list_sql + limit if limit else ''
        data = self.query_sql(right_list_sql_end)
        return Response(data, status=status.HTTP_200_OK)


class PilotStatusView(BaseViewNoModel, GenericAPIView):
    # 获取引航员状态列表
    def get(self, request):
        page_number, page_size = self.parse_request(request)
        limit = self.page_handle(page_number,page_size)
        pilot_status_sql_end = pilot_status_sql + limit if limit else ''
        data = self.query_sql(pilot_status_sql_end)
        return Response(data, status=status.HTTP_200_OK)

class PilotDetailUpView(BaseViewNoModel, GenericAPIView):
    # 获取引航员详细信息（上半部分数据）,参数pilot_id为引航员的id值
    def get(self, request, pilot_id):
        page_number, page_size = self.parse_request(request)
        limit = self.page_handle(page_number,page_size)
        right_detail_sql_end = right_detail_sql + limit if limit else ''
        data = self.query_sql(right_detail_sql_end)

        # 测试数据部分, 各个属性需要与前端对应，模拟算法处理时间
        import time
        time.sleep(3)
        data={"results":
                {
                  "gonghao": 'planId',
                  "dangci":  'AAA'+ str(random.random()),
                  "xinmin": 'AAA',
                  "gongnengdangci": 'AAA'
                },
            "is_success":1}
        return Response(data, status=status.HTTP_200_OK)     

class PilotDetailDownView(BaseViewNoModel, GenericAPIView):
    # 获取引航员详细信息（下半部分数据）->需要自行补全算法
    def get(self, request, pilot_id):

        # 测试数据部分
        import time
        time.sleep(3)
        data={"results":{
            # 横坐标的天数显示 
            "dayNum": [1,2,3,4,5],
            # 间隔时间
            "timeValue": [10,20,10,20,10],
            # 0表示白班，　１表示夜班
            "timeType": [0,1,0,1,0]
        },
            "is_success":1}
        return Response(data, status=status.HTTP_200_OK)


class AutoInfoView(BaseViewNoModel, GenericAPIView):
    # 请求自动派人的结果
    def post(self, request):
        # 添加处理结果
        print(request.data, 'post传输的数据集合')
        
        # 测试数据部分, 模拟算法处理时间
        import time
        time.sleep(3)
        data={"results":
            [
                {
                  "key": 'planId',
                  "planId":  'AAA'+ str(random.random()),
                  "vescName": 'AAA',
                  "vesLength": 'AAA'
                },{
                  "key": 'vescName',
                  "planId":  'BBB'+ str(random.random()),
                  "vescName": 'BBB',
                  "vesLength": 'BBB'
                }
            ],
            "is_success":1}
        return Response(data, status=status.HTTP_200_OK)