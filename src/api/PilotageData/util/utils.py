def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    print(columns, "COLUMNS")
    try:
        data = cursor.fetchall()
    except Exception as e :
        print(e, "FETCH ERROR")
    if data:
        print("have data")
        return [
            dict(zip(columns, row))
            for row in data
        ]
    else:
        print('no data')
        return []