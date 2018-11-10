from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from input_boat_choice.views import BaseViewNoModel
# Create your views here.
plan_list_sql = """
SELECT
b.chDynPlanID,
IFNULL(b.inNO,0) inno1,
b.vcVesCName,
b.vcVesEName, 
b.nmVesLength, 
b.nmBackGuage, 
b.nmFrontGuage,
(select t_code_vestypecode.vcvestypename from t_code_vestypecode where t_code_vestypecode.chvestypecode=b.chvestypecode) as  vestypecode,
(select INSORTNO from t_code_dock where trim(t_code_dock.chdockcode)=trim(b.CHDOCKARRIVERCODE)) as INBERTHNO,
(select t_code_nationcode.vcnationcnname from t_code_nationcode where t_code_nationcode.vcnationcode=b.chNationCode) as chNationCode, 
(SELECT t_code_portcode.CHPORTENAME from t_code_portcode where t_code_portcode.CHPORTCODE = b.CHPREVIOUSPORTCODE) as CHPREVIOUSPORTCODE, 
(SELECT t_code_portcode.CHPORTENAME from t_code_portcode where t_code_portcode.CHPORTCODE = b.CHNEXTPORTCODE) as CHNEXTPORTCODE, 
(SELECT t_code_portcode.CHPORTENAME from t_code_portcode where t_code_portcode.CHPORTCODE = b.CHENDPORTCODE) as CHENDPORTCODE, 
b.chBerthSign, 
(select t_code_dock.vcdockname from t_code_dock where t_code_dock.chdockcode=b.CHDOCKARRIVERCODE) as DOCKname,
(select VCBERTHWAYNAME from  t_code_berthway where CHBERTHWAYCODE=b.chBerthWayCode) as berthway,
b.sdBerthTimePilotage as berthtime,
b.dtAppointTime,
(select vcplacesname from  t_code_placecode where chplacecode=b.chAppointPlaceCode) as appiontplace, 
(select VCDRAGSHCLASSNAME from t_code_dragshclasscode where t_code_dragshclasscode.CHDRAGSHCLASSCODE=b.chdragvesclasscode) as Dragscode, 
(select BELONGTO from t_base_vesagent where CHVESAGENTCODE=b.CHVESAGENTCODE and GSBSHF='2')as DL,     
b.VCDLTL,
b.CHONESTAKEFLAG, 
(SELECT vcturnplacename FROM t_code_turnplacecode WHERE t_code_turnplacecode.chturnplacecode=b.chTurnPlaceCode) as chturnplace, 
b.VCMEMO,b.CHKEYVESFLAG, b.SDFINALARRIVENOTICE as yqbsj, 
(select t_code_systemcode.vcsysdesc from t_code_systemcode where trim(t_code_systemcode.vcsyscode)='chArrivePlaceSign' and t_code_systemcode.vcsysvalue=b.CHPORT) as yqbdd 
FROM t_planwork b
where b.CHPILOTAGESTATE='1'
and (IFNULL(b.chAttemperFlag,'0') = '0') and CHCOMFLAG='0'  and b.CHPILOTAGESTATE='1'
and (CHPORT  not in ( 7,8,5,6) or ISNULL(chport))
order by DTAPPOINTTIME ASC,INBERTHNO,VCVESCNAME,NMVESLENGTH

"""
plan_require_sql = """
SELECT a.CHPILOTREQUIRECODE,a.VCPILOTREQUIRE
FROM t_code_pilotrequirecode a ORDER BY a.INSORTNO asc, a.CHPERSONNUM
"""
plan_water_deep = """
SELECT a.VCROUTNAME, a.NMWATERDEPTH,a.CHINOUTFLAG 
FROM t_code_routdepthcode a ORDER BY a.INSORTNO asc
"""

class PlanListView(BaseViewNoModel, GenericAPIView):
    # 左侧listview
    def get(self, request):
        page_number, page_size = self.parse_request(request)
        limit = self.page_handle(page_number,page_size)
        plan_end = plan_list_sql + limit if limit else ''
        data = self.query_sql(plan_end)
        return Response(data, status=status.HTTP_200_OK)



class PlanDetailView(BaseViewNoModel, GenericAPIView):
    # 详细信息
    def get(self, request, plan_id):
        plan_deatil_sql = """
SELECT
b.chDynPlanID,
IFNULL(b.inNO,0) inno1,
b.vcVesCName,
b.vcVesEName, 
b.nmVesLength, 
b.nmBackGuage, 
b.nmFrontGuage,
(select t_code_vestypecode.vcvestypename from t_code_vestypecode where t_code_vestypecode.chvestypecode=b.chvestypecode) as  vestypecode,
(select INSORTNO from t_code_dock where trim(t_code_dock.chdockcode)=trim(b.CHDOCKARRIVERCODE)) as INBERTHNO,
(select t_code_nationcode.vcnationcnname from t_code_nationcode where t_code_nationcode.vcnationcode=b.chNationCode) as chNationCode, 
(SELECT t_code_portcode.CHPORTENAME from t_code_portcode where t_code_portcode.CHPORTCODE = b.CHPREVIOUSPORTCODE) as CHPREVIOUSPORTCODE, 
(SELECT t_code_portcode.CHPORTENAME from t_code_portcode where t_code_portcode.CHPORTCODE = b.CHNEXTPORTCODE) as CHNEXTPORTCODE, 
(SELECT t_code_portcode.CHPORTENAME from t_code_portcode where t_code_portcode.CHPORTCODE = b.CHENDPORTCODE) as CHENDPORTCODE, 
b.chBerthSign, 
(select t_code_dock.vcdockname from t_code_dock where t_code_dock.chdockcode=b.CHDOCKARRIVERCODE) as DOCKname,
(select VCBERTHWAYNAME from  t_code_berthway where CHBERTHWAYCODE=b.chBerthWayCode) as berthway,
b.sdBerthTimePilotage as berthtime,
b.dtAppointTime,
(select vcplacesname from  t_code_placecode where chplacecode=b.chAppointPlaceCode) as appiontplace, 
(select VCDRAGSHCLASSNAME from t_code_dragshclasscode where t_code_dragshclasscode.CHDRAGSHCLASSCODE=b.chdragvesclasscode) as Dragscode, 
(select BELONGTO from t_base_vesagent where CHVESAGENTCODE=b.CHVESAGENTCODE and GSBSHF='2')as DL,     
b.VCDLTL,
b.CHONESTAKEFLAG, 
(SELECT vcturnplacename FROM t_code_turnplacecode WHERE t_code_turnplacecode.chturnplacecode=b.chTurnPlaceCode) as chturnplace, 
b.VCMEMO,b.CHKEYVESFLAG, b.SDFINALARRIVENOTICE as yqbsj, 
(select t_code_systemcode.vcsysdesc from t_code_systemcode where trim(t_code_systemcode.vcsyscode)='chArrivePlaceSign' and t_code_systemcode.vcsysvalue=b.CHPORT) as yqbdd 
FROM t_planwork b
where b.CHPILOTAGESTATE='1' AND chDynPlanID='{}'
and (IFNULL(b.chAttemperFlag,'0') = '0') and CHCOMFLAG='0'  and b.CHPILOTAGESTATE='1'
and (CHPORT  not in ( 7,8,5,6) or ISNULL(chport))
order by DTAPPOINTTIME ASC,INBERTHNO,VCVESCNAME,NMVESLENGTH
""".format(str(plan_id))
        page_number, page_size = self.parse_request(request)
        limit = self.page_handle(page_number,page_size)
        plan_deatil_sql_end = plan_deatil_sql + limit if limit else ''
        data = self.query_sql(plan_deatil_sql_end)
        return Response(data, status=status.HTTP_200_OK)

    # 详细信息修改提交
    def post(self, request):
        pass


class PilotRequireView(BaseViewNoModel, GenericAPIView):
    # 引水要求：做一个下拉效果
    def get(self, request):
        page_number, page_size = self.parse_request(request)
        limit = self.page_handle(page_number,page_size)
        plan_require_sql_end = plan_require_sql + limit if limit else ''
        data = self.query_sql(plan_require_sql_end)
        return Response(data, status=status.HTTP_200_OK)


class PilotWaterDeepView(BaseViewNoModel, GenericAPIView):
    #航道水深：
    def get(self, request):
        page_number, page_size = self.parse_request(request)
        limit = self.page_handle(page_number,page_size)
        plan_water_deep_end = plan_water_deep + limit if limit else ''
        data = self.query_sql(plan_water_deep_end)
        return Response(data, status=status.HTTP_200_OK)