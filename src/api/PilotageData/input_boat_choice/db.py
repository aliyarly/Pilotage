from django.db import connection
from util.utils import dictfetchall


def get_db_with_attr_condition(db_name, attr=None, condition=None, limit_number=None):
    """
    used to execute sql :
        select ** from ** where ** and ** limit **
    :param db_name:
    :param attr:
    :param condition:
    :param limit_number:
    :return:
    """
    assert db_name, 'should have database name'
    if not attr:
        db_attr = '*'
    else:
        assert isinstance(attr, (list, tuple)), 'should be list or tuple'
        db_attr = ', '.join(attr)
    if condition:
        assert isinstance(condition, dict), 'should be dict'
        db_condition = ' AND '.join([str(key) + '=\'' + str(item) + '\'' for key, item in condition.items()])
        db_condition = 'WHERE ' + db_condition
    else:
        db_condition = ''
    limit = ''
    if limit_number:
        limit = 'LIMIT ' + str(limit_number)

    with connection.cursor() as cursor:
        sql = "SELECT %s FROM %s %s %s" % (db_attr, db_name, db_condition, limit)
        print(sql, 'SQL')
        cursor.execute(sql)
        row = dictfetchall(cursor)
    return row


def get_row_mysql(sql):
    with connection.cursor() as cursor:
        cursor.execute(sql)
        row = dictfetchall(cursor)
        print(row, "ROW GTE FROM SQL DB")
        return row