pre_choice = """
    SELECT 	a.NMSAILNUM as NMSAILNUM
    , a.ETA  as ETA
    , a.chVesID, a.vcVesCName
    , a.vcVesEName
    , b.chcallno as callno
    ,(select t_code_vestypecode.vcvestypename from t_code_vestypecode where t_code_vestypecode.chvestypecode=b.chvestypecode) as  vestypecode 
    , b.nmveslength as veslength
    ,(select t_code_nationcode.vcnationcnname from t_code_nationcode where t_code_nationcode.vcnationcode=a.chNationCode) as chNationCode 
    ,(select t_code_systemcode.vcsysdesc from t_code_systemcode where trim(t_code_systemcode.vcsyscode)='chArrivePlaceSign' and t_code_systemcode.vcsysvalue=a.chArrivePlaceSign) as chArrivePlaceSign 
    , a.chConfirmFlag
    ,(select t_base_vesagent.belongto from t_base_vesagent where t_base_vesagent.chvesagentcode = a.CHVESAGENTCODE and t_base_vesagent.gsbshf= '2') as chvesagentname 
    , a.CHPRESELECTFLAG
    , a.CHDOCKCODE
    ,(select t_code_dock.vcdockname from t_code_dock where t_code_dock.chdockcode=a.CHDOCKCODE) as DOCKname 
    , decode(a.CHUNITRESERVE,'1','引航站输入','2','WEB输入',a.CHUNITRESERVE) as CHUNITRESERVECN
    , a.CHUNITRESERVE
    ,(select t_code_dock.insortno from t_code_dock where t_code_dock.chdockcode=a.Chdockcode) as insortno 
    ,a.CHVESCORPCODE,b.chmmsi
    FROM T_SAILING_SAILINFO a , t_base_vesinfo b
    WHERE a.chvesid=b.chvesid and (a.chunitreserve=2 and a.chConfirmFlag <>1 AND a.CHPRESELECTFLAG=1)
    ORDER BY a.eta ASC ,a.vcVesEName asc
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
    FROM T_SAILING_SAILINFO a
		, t_base_vesinfo b
    WHERE a.chvesid=b.chvesid and (a.chunitreserve=2 and a.chConfirmFlag <>1 AND a.CHPRESELECTFLAG<>1)
    ORDER BY a.eta ASC ,a.vcVesEName asc,insortno asc
"""
