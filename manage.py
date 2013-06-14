#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask.ext.script import Manager
from afm import app, db, models
from pprint import pprint as pp
from afm.helpers import fasthash
manager = Manager(app)


@manager.shell
def make_shell_context():
    return dict(app=app, db=db, models=models)


@manager.command
def ensure_indexes():
    for model_cls in db.__dict__['registered_documents']:
        if not (hasattr(model_cls, 'indexes') and model_cls.indexes):
            continue
        collection = db[model_cls.__collection__]
        print 'create indexes for %s' % model_cls.__collection__
        for index in model_cls.indexes:
            if isinstance(index['fields'], list):
                fields = zip(index['fields'], [1] * len(index['fields']))
                print_fields = ', '.join(index['fields'])
            else:
                fields = [(index['fields'], 1)]
                print_fields = index['fields']
            print '- %s (unique: %s)' % (print_fields, index.get('unique', False))
            collection.ensure_index(fields, unique=index.get('unique'), dropDups=True)
        print ''


@manager.command
@manager.option('-u', '--user', dest='login')
def change_password(login):
    user = db.User.find_login(login)
    if not user:
        print 'user not found'
        return
    password = raw_input('New password: ')
    user.set_password(password)
    user.save()
    print 'changed!'


@manager.command
@manager.option('-key', '--key', dest='key')
def agg(key):
    collection, field = key.split('/')
    result = db[collection].aggregate([
        {'$group': {'_id': '$' + field, 'count': {'$sum': 1}}},
        {'$sort': {'count': -1}},
    ])
    for item in result['result']:
        print '{count} {_id}'.format(**item)


@manager.command
def update_playlist():
    from afm.tasks import update_playlist
    for playlist in db.playlist.find(fields=['id']):
        print playlist['id']
        print update_playlist.delay(playlist_id=playlist['id'])


@manager.command
def sitemap():
    from flask import url_for
    from lxml import etree as ET
    from lxml.builder import E

    base = u'http://again.fm'
    urlset = ET.Element('urlset', xmlns='http://www.sitemaps.org/schemas/sitemap/0.9')
    for radio in db.radio.find({'deleted_at': 0}):
        url = E.url(
            E.loc(base + url_for('radio', radio_id=radio['id'])),
        )
        urlset.append(url)

    print ET.tostring(urlset, pretty_print=True, xml_declaration=True, encoding='UTF-8')


@manager.command
def update_search():
    from afm import search
    for radio in db.Radio.find_public():
        print radio.push_to_search()
    print search.refresh()


@manager.command
def warm_cache():
    from afm import redis

    # Generate new ids set and replace existent
    redis.delete('radio:public_new')
    for radio in db.Radio.find_public(fields=['id']):
        redis.sadd('radio:public_new', radio['id'])
    redis.rename('radio:public_new', 'radio:public')
    print redis.scard('radio:public'), 'public radio'

@manager.command
def get_icy_genre():
    import string
    from collections import Counter
    c = Counter()
    for stream in db.streams.find({'meta.genre': {'$exists': True}}):
        genre = stream['meta']['genre']
        for token in map(string.lower, genre.split(',')):
            c[token.strip()] += 1

    for k, v in c.most_common(100):
        print k


@manager.command
def ctrl_search():
    settings = {
        "analysis": {
            "filter": {
                "ngram_filter": {
                    "min_gram": 3,
                    "max_gram": 8,
                    "type": "nGram"
                }
            },
            "analyzer": {
                "ngram_analyzer": {
                    "tokenizer": "lowercase",
                    "filter": ["ngram_filter"],
                    "type": "custom",
                }
            }
        }
    }

    import requests
    import json
    print requests.delete('http://192.168.2.2:9200/againfm').json()
    pp(requests.post('http://192.168.2.2:9200/againfm', data=json.dumps({'settings': settings})).json())
    maping = {
        'properties': {
            'title': {
                'type': 'string',
                'analyzer': 'ngram_analyzer'
            }
        }
    }
    pp(requests.put('http://192.168.2.2:9200/againfm/radio/_mapping', data=json.dumps({'radio': maping})).json())

    print requests.get('http://192.168.2.2:9200/againfm/_settings').json()
    print requests.get('http://192.168.2.2:9200/againfm/_mapping').json()
    #print requests.post('http://192.168.2.2:9200/test/_refresh').json()


@manager.command
def convert_genres():
    for radio in db.radio.find({}, fields=['id', 'genres']):
        genre = radio['genres'][0] if radio['genres'] else 0
        db.radio.update({'id': radio['id']}, {'$set': {'genre': genre}})
        #print radio['id']


@manager.command
def convert():
    from afm.models import get_next_id
    ids = set([3,4,5,7,17,21,32,34,40,41,43,28340,28344,28345,58,28351,65,28354,69,72,28361,86])

    for radio in db.radio.find(fields=['id', 'tag.old_id']):
        old_id = radio['tag'].get('old_id')
        if old_id in ids:
            new_id = old_id
        else:
            new_id = get_next_id('radio')

        db.radio.update({'id': radio['id']}, {'$set': {'id': new_id, 'tag.ng_id': radio['id']}})

        db.playlist.update({'radio_id': radio['id']}, {'$set': {'radio_id': new_id}}, multi=True)
        db.streams.update({'radio_id': radio['id']}, {'$set': {'radio_id': new_id}}, multi=True)


@manager.command
def convert_favs():
    for fav in db.favorite_stations.find():
        radio = db.radio.find_one({'tag.old_id': fav['station_id']}, fields=['id'])
        if radio:
            print 'adding', fav['user_id'], radio['id']
            key = 'favorites.{}'.format(radio['id'])
            db.users.update({'id': fav['user_id']}, {'$set': {key: fav['created_at']}})


@manager.command
def group_radio():
    from collections import defaultdict
    agg = defaultdict(set)
    for stream in db.Stream.find_public(fields=['id', 'url', 'radio_id']):
        try:
            h = fasthash(stream['url'])
            agg[h].add(stream['radio_id'])
        except UnicodeEncodeError:
            pass

    for h, radios in agg.iteritems():
        if len(radios) > 1:
            lead_id = radios


if __name__ == "__main__":
    manager.run()
