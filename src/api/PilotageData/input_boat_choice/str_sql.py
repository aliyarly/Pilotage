pre_choice = """
    SELECT 	a.NMSAILNUM as NMSAILNUM, a.ETA  as ETA, a.chVesID, a.vcVesCName, a.vcVesEName
    ,(select t_base_vesagent.belongto from t_base_vesagent where t_base_vesagent.chvesagentcode = a.CHVESAGENTCODE and t_base_vesagent.gsbshf= '2') as chvesagentname 
    ,(select t_code_nationcode.vcnationcnname from t_code_nationcode where t_code_nationcode.vcnationcode=a.chNationCode) as chNationCode 
    ,(select t_code_vestypecode.vcvestypename from t_code_vestypecode where t_code_vestypecode.chvestypecode=b.chvestypecode) as  vestypecode 
    , b.nmveslength as veslength
    ,(select t_code_systemcode.vcsysdesc from t_code_systemcode where trim(t_code_systemcode.vcsyscode)='chArrivePlaceSign' and t_code_systemcode.vcsysvalue=a.chArrivePlaceSign) as chArrivePlaceSign 
    ,(select t_code_dock.vcdockname from t_code_dock where t_code_dock.chdockcode=a.CHDOCKCODE) as DOCKname
    ,(select t_code_dock.insortno from t_code_dock where t_code_dock.chdockcode=a.Chdockcode) as insortno 
    FROM t_sailing_sailinfo a , t_base_vesinfo b
    WHERE a.chvesid=b.chvesid and (a.chunitreserve=2 and a.chConfirmFlag <>1 AND a.CHPRESELECTFLAG=1)
    ORDER BY a.eta ASC ,a.vcVesEName asc,insortno asc
"""

boat_date = """
SELECT  a.NMSAILNUM as NMSAILNUM, a.ETA  as ETA, a.chVesID, a.vcVesCName, a.vcVesEName
		,(select t_base_vesagent.belongto from t_base_vesagent where t_base_vesagent.chvesagentcode = a.CHVESAGENTCODE and t_base_vesagent.gsbshf= '2') as chvesagentname
		,(select t_code_nationcode.vcnationcnname from t_code_nationcode where t_code_nationcode.vcnationcode=a.chNationCode) as chNationCode
		,(select t_code_vestypecode.vcvestypename from t_code_vestypecode where t_code_vestypecode.chvestypecode=b.chvestypecode) as  vestypecode
		, b.nmveslength as veslength
		,(select t_code_systemcode.vcsysdesc from t_code_systemcode where trim(t_code_systemcode.vcsyscode)='chArrivePlaceSign' and t_code_systemcode.vcsysvalue=a.chArrivePlaceSign) as chArrivePlaceSign
		,(select t_code_dock.vcdockname from t_code_dock where t_code_dock.chdockcode=a.CHDOCKCODE) as DOCKname
		,(select case WHEN a.CHUNITRESERVE='1' THEN '引航站输入' WHEN a.CHUNITRESERVE='2' THEN 'WEB输入' ELSE '未知' END) as CHUNITRESERVECN
		,(select t_code_dock.insortno from t_code_dock where t_code_dock.chdockcode=a.Chdockcode) as insortno
    FROM t_sailing_sailinfo a
		, t_base_vesinfo b
    WHERE a.chvesid=b.chvesid and (a.chunitreserve=2 and a.chConfirmFlag <>1 AND a.CHPRESELECTFLAG<>1)
    ORDER BY a.eta ASC ,a.vcVesEName asc,insortno asc
"""

boat_jt = """
SELECT  a.NMSAILNUM as NMSAILNUM, a.ETA  as ETA, a.chVesID, a.vcVesCName, a.vcVesEName
		,(select t_base_vesagent.belongto from t_base_vesagent where t_base_vesagent.chvesagentcode = a.CHVESAGENTCODE and t_base_vesagent.gsbshf= '2') as chvesagentname
		,(select t_code_nationcode.vcnationcnname from t_code_nationcode where t_code_nationcode.vcnationcode=a.chNationCode) as chNationCode
		,(select t_code_vestypecode.vcvestypename from t_code_vestypecode where t_code_vestypecode.chvestypecode=b.chvestypecode) as  vestypecode
		, b.nmveslength as veslength
		,(select t_code_systemcode.vcsysdesc from t_code_systemcode where trim(t_code_systemcode.vcsyscode)='chArrivePlaceSign' and t_code_systemcode.vcsysvalue=a.chArrivePlaceSign) as chArrivePlaceSign
		,(select t_code_dock.vcdockname from t_code_dock where t_code_dock.chdockcode=a.CHDOCKCODE) as DOCKname
		,(select case WHEN a.CHUNITRESERVE='1' THEN '引航站输入' WHEN a.CHUNITRESERVE='2' THEN 'WEB输入' ELSE '未知' END) as CHUNITRESERVECN
		,(select t_code_dock.insortno from t_code_dock where t_code_dock.chdockcode=a.Chdockcode) as insortno
		,(select t_code_placecode.vcplacesname from t_code_placecode where t_code_placecode.chplacecode=c.chberthsign) as chberthsignname
		,c.Sdberthtimeconfirmed
		,c.CREATEDATE
    FROM t_sailing_sailinfo a , t_base_vesinfo b, t_planworkhb c
    WHERE a.chvesid=b.chvesid
          and a.nmsailnum = c.nmsailnum
          and b.chmmsi =c.chmmsi and CHPLANFLAG='0' and c.chpilotagestate='1'
          and a.chConfirmFlag <>1 AND a.CHPRESELECTFLAG<>1
          and c.CREATEDATE>=date_format('2018-11-03','%Y-%m-%d') #2018-11-03为当日日期
          and c.CREATEDATE<date_format('2018-11-08','%Y-%m-%d')
    ORDER BY a.eta ASC ,a.vcVesEName asc,insortno asc
"""

boat_jt_err = """
SELECT NMSAILNUM as NMSAILNUM, VCCNAME vcVesCName, VCENAME vcVesEName
				,(select t_code_dock.vcdockname from t_code_dock where t_code_dock.chdockcode=c.CHDOCKARRIVERCODE) as DOCKname #靠离泊码头名称      
         ,(select t_code_dock.insortno from t_code_dock where t_code_dock.chdockcode=c.CHDOCKARRIVERCODE) as insortno #码头排序号
         ,chmmsi #mmsi
         ,c.Sdberthtimeconfirmed
         ,(select t_code_placecode.vcplacesname from t_code_placecode where t_code_placecode.chplacecode=c.chberthsign) as chberthsignname #泊位名称
         ,CREATEDATE
         ,CHPILOTAGESTATE
         ,ERR
    FROM t_planworkhberr c
  where CHPILOTAGESTATE='1'
      and c.CREATEDATE>=DATE_FORMAT('2018-10-08','%Y-%m-%d') #2018-11-03为当日日期
          and c.CREATEDATE<DATE_FORMAT('2018-11-06','%Y-%m-%d')
    ORDER BY CREATEDATE ASC ,VCCNAME asc, insortno asc
"""

boat_plan_in="""
SELECT
(select INSORTNO from t_code_dock where trim(t_code_dock.chdockcode)=trim(b.CHDOCKARRIVERCODE)) as INBERTHNO,
b.vcVesCName,b.vcVesEName,
(select t_code_nationcode.vcnationcnname from t_code_nationcode where t_code_nationcode.vcnationcode=b.chNationCode) as chNationCode,
(select t_code_vestypecode.vcvestypename from t_code_vestypecode where t_code_vestypecode.chvestypecode=b.chvestypecode) as  vestypecode,
b.nmVesLength,
(select t_code_dock.vcdockname from t_code_dock where t_code_dock.chdockcode=b.CHDOCKARRIVERCODE) as DOCKname
FROM t_planwork b
where 
b.CHPILOTAGESTATE='1'
and (IFNULL(b.chAttemperFlag,'0') = '0') and CHCOMFLAG='0' and b.CHPILOTAGESTATE='1'
ORDER BY  INBERTHNO ASC, b.VCVESCNAME ASC
"""