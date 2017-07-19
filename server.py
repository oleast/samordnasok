from __future__ import print_function
from os.path import join, dirname, abspath
import xlrd
import json
from flask import Flask, send_from_directory, jsonify

from pymongo import MongoClient
import pymongo

client = MongoClient()
db = client['samordnasok']
programs = db['programs']

PAGE_SIZE = 50

app = Flask(__name__,  static_url_path='/public/')

def get_programs(query):
    output = []
    for p in programs.find(query):
        output.append({
            "year": p['year'],
            "institution": p['institution'],
            "code": p['code'],
            "name": p['name'],
            "ordinary": p['ordinary'],
            "ordinary_sortable": p['ordinary_sortable'],
            "ordinary_wait": p['ordinary_wait'],
            "first_time": p['first_time'],
            "first_time_sortable": p['first_time_sortable'],
            "first_time_wait": p['first_time_wait'],
        })
    return jsonify(output)

def get_programs_paged(query, page, sort_key, sort_direction):
    output = []
    for p in programs.find(query).sort(sort_key,sort_direction).skip((page-1)*50).limit(PAGE_SIZE):
        output.append({
            "year": p['year'],
            "institution": p['institution'],
            "code": p['code'],
            "name": p['name'],
            "ordinary": p['ordinary'],
            "ordinary_sortable": p['ordinary_sortable'],
            "ordinary_wait": p['ordinary_wait'],
            "first_time": p['first_time'],
            "first_time_sortable": p['first_time_sortable'],
            "first_time_wait": p['first_time_wait'],
        })
    return jsonify(output)

@app.route('/api/<int:year>')
def get_year(year):
    return get_programs({'year':year})

@app.route('/api/code/<int:code>')
def get_by_code(code):
    return get_programs({'code':code})

@app.route('/api/institution/<string:institution>')
def get_by_institution(institution):
    return get_programs({'institution':institution})

@app.route('/api/<int:year>/institution/<string:institution>')
def get_by_year_and_institution(year, institution):
    return get_programs({'year':year, 'institution':institution})

@app.route('/api/<int:year>/ordinary/desc/<int:page>')
def get_year_ordinary_desc_page(year, page):
    return get_programs_paged({'year':year}, page, 'ordinary_sortable', pymongo.DESCENDING)

@app.route('/api/<int:year>/ordinary/asc/<int:page>')
def get_year_ordinary_asc_page(year, page):
    return get_programs_paged({'year':year}, page, 'ordinary_sortable', pymongo.ASCENDING)

@app.route('/api/<int:year>/first_time/desc/<int:page>')
def get_year_first_time_desc_page(year, page):
    return get_programs_paged({'year':year}, page, 'first_time_sortable', pymongo.DESCENDING)

@app.route('/api/<int:year>/first_time/asc/<int:page>')
def get_year_first_time_asc_page(year, page):
    return get_programs_paged({'year':year}, page, 'first_time_sortable', pymongo.ASCENDING)

@app.route('/api/<int:year>/search/<string:search_string>')
def get_year_search(year, search_string):
    return get_programs({
        'year':year, 'name_lower': {'$regex' : '.*' + search_string + '.*'}
    })

@app.route('/bundle.js')
def get_bundle():
    return send_from_directory('templates', 'bundle.js')

@app.route('/')
def get_index():
    return send_from_directory('templates', 'index.html')

    