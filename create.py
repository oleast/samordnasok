from __future__ import print_function
from os.path import join, dirname, abspath
import xlrd
import json
from flask import Flask, send_from_directory

from pymongo import MongoClient

client = MongoClient()
db = client['samordnasok']
programs = db['programs']

grades_2011 = join(dirname(dirname(abspath(__file__))), 'samordnasok/server', '2011.xlsx')
xl_workbook_2011 = xlrd.open_workbook(grades_2011)
sheet_names_2011 = xl_workbook_2011.sheet_names()
print('Sheet Names', sheet_names_2011)
xl_sheet_2011 = xl_workbook_2011.sheet_by_index(0)
print ('Sheet name: %s' % xl_sheet_2011.name)

grades_2012 = join(dirname(dirname(abspath(__file__))), 'samordnasok/server', '2012.xls')
xl_workbook_2012 = xlrd.open_workbook(grades_2012)
sheet_names_2012 = xl_workbook_2012.sheet_names()
print('Sheet Names', sheet_names_2012)
xl_sheet_2012 = xl_workbook_2012.sheet_by_index(0)
print ('Sheet name: %s' % xl_sheet_2012.name)

grades_2013 = join(dirname(dirname(abspath(__file__))), 'samordnasok/server', '2013.xls')
xl_workbook_2013 = xlrd.open_workbook(grades_2013)
sheet_names_2013 = xl_workbook_2013.sheet_names()
print('Sheet Names', sheet_names_2013)
xl_sheet_2013 = xl_workbook_2013.sheet_by_index(0)
print ('Sheet name: %s' % xl_sheet_2013.name)

grades_2014 = join(dirname(dirname(abspath(__file__))), 'samordnasok/server', '2014.xlsx')
xl_workbook_2014 = xlrd.open_workbook(grades_2014)
sheet_names_2014 = xl_workbook_2014.sheet_names()
print('Sheet Names', sheet_names_2014)
xl_sheet_2014 = xl_workbook_2014.sheet_by_index(0)
print ('Sheet name: %s' % xl_sheet_2014.name)

grades_2015 = join(dirname(dirname(abspath(__file__))), 'samordnasok/server', '2015.xls')
xl_workbook_2015 = xlrd.open_workbook(grades_2015)
sheet_names_2015 = xl_workbook_2015.sheet_names()
print('Sheet Names', sheet_names_2015)
xl_sheet_2015 = xl_workbook_2015.sheet_by_index(0)
print ('Sheet name: %s' % xl_sheet_2015.name)

grades_2016 = join(dirname(dirname(abspath(__file__))), 'samordnasok/server', '2016.xls')
xl_workbook_2016 = xlrd.open_workbook(grades_2016)
sheet_names_2016 = xl_workbook_2016.sheet_names()
print('Sheet Names', sheet_names_2016)
xl_sheet_2016 = xl_workbook_2016.sheet_by_index(0)
print ('Sheet name: %s' % xl_sheet_2016.name)

grades_2017 = join(dirname(dirname(abspath(__file__))), 'samordnasok/server', '2017.xlsx')
xl_workbook_2017 = xlrd.open_workbook(grades_2017)
sheet_names_2017 = xl_workbook_2017.sheet_names()
print('Sheet Names', sheet_names_2017)
xl_sheet_2017 = xl_workbook_2017.sheet_by_index(0)
print ('Sheet name: %s' % xl_sheet_2017.name)

def get_year(xl_sheet, year):
    #l = []
    for i in range(1, xl_sheet.nrows):
        row = xl_sheet.row(i)

        try:
            o_wait = int(row[4].value)
        except ValueError:
            o_wait = 0

        try:
            f_wait = int(row[6].value)
        except ValueError:
            f_wait = 0
        
        try:
            ordinary_s = float(row[3].value)
        except ValueError:
            ordinary_s = 0.0

        try:
            first_sortable = float(row[5].value)
        except ValueError:
            first_sortable = 0.0

        data = {
            "year": year,
            "institution": row[0].value,
            "code": int(row[1].value),
            "name": row[2].value,
            "name_lower": row[2].value.lower(),
            "ordinary": row[3].value,
            "ordinary_sortable": ordinary_s,
            "ordinary_wait": o_wait,
            "first_time": row[5].value,
            "first_time_sortable": first_sortable,
            "first_time_wait": f_wait,
        }

        programs.insert_one(data)

        #l.append(data)


get_year(xl_sheet_2011, 2011)
get_year(xl_sheet_2012, 2012)
get_year(xl_sheet_2013, 2013)
get_year(xl_sheet_2014, 2014)
get_year(xl_sheet_2015, 2015)
get_year(xl_sheet_2016, 2016)
get_year(xl_sheet_2017, 2017)