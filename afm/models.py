# -*- coding: utf-8 -*-

import string
from . import app, login_manager, db
from afm.helpers import naturalday

try:
    from flask.ext.mongokit import Document
except ImportError:
    from mongokit import Document
from hashlib import md5
from bson.objectid import ObjectId
from random import choice
from datetime import datetime
import time

@login_manager.user_loader
def load_user(user_id):
    return db.User.find_one({'id': user_id})

def md5hash(data):
    hashed = md5()
    hashed.update(data)
    return hashed.hexdigest()

class BaseDocument(Document):
    use_dot_notation = True

    def save(self, *args, **kwargs):
        # additional monotonic integer object_id
        if 'id' in self.structure:
            self['id'] = self.db.object_ids.find_and_modify(
                query={'_id': self.collection.name},
                update={'$inc': {'next': 1}},
                new=True, upsert=True)['next']
        return super(BaseDocument, self).save(*args, **kwargs)

@db.register
class User(BaseDocument):
    __collection__ = 'users'

    structure = {
        'id': int,
        'name': unicode,
        'sex': unicode,
        'login': unicode,
        'email': unicode,
        'password': unicode,
        'new_password': unicode,
        'is_active': bool,
        'settings': {
            'throttle_traffic': bool,
            'limit_night_volume': bool,
            'fading_sound': bool
        }
    }

    indexes = [{'fields': 'id', 'unique': True}]

    default_values = {
        'login': u'',
        'sex': u'',
        'is_active': True,
        'settings.throttle_traffic': False,
        'settings.fading_sound': True,
        'settings.limit_night_volume': True
    }

    def check_password(self, raw_password):
        if not self['password']:
            return False
        hashed = self._password_hash(raw_password)
        return hashed == self['password']

    def set_password(self, raw_password):
        password = self._password_hash(raw_password)
        self.password = password.decode('utf-8')

    def _password_hash(self, raw_password):
        return md5hash(app.secret_key + raw_password)

    def is_authenticated(self):
        return True

    def is_active(self):
        return self['is_active']

    def is_anonymous(self):
        return False

    def get_id(self):
        return self['id']

    @property
    def gravatar_hash(self):
        return md5hash(self['email'].lower())

    def get_public_data(self):
        return {
            'id': self['id'],
            'email': self['email'],
            'name': self['name'],
            'sex': self['sex'],
            'gravatar_hash': self.gravatar_hash,
        }

    def generate_new_password(self, length=8):
        chars = string.letters + string.digits
        password = [choice(chars) for i in xrange(length)]
        password = string.join(password, '')
        self['new_password'] = self._password_hash(password).decode('utf-8')
        self.save()
        return password, self.new_password_token()

    def new_password_token(self):
        if not self['new_password']:
            return False
        # double hashing
        return self._password_hash(self['new_password'])

    def confirm_new_password(self, password_or_token):
        if not self['new_password']:
            return False
        password_match = (self['new_password'] == self._password_hash(password_or_token))
        token_match = (password_or_token == self.new_password_token())
        if password_match or token_match:
            self['password'] = self['new_password']
            self['new_password'] = u''
            self.save()
            return True
        return False

@db.register
class Station(BaseDocument):
    __collection__ = 'stations'
    structure = {
        'id': int,
        'title': unicode,
        'website': unicode,
        'tag': unicode,
    }

    indexes = [
        {'fields': 'id', 'unique': True},
        {'fields': 'tag'},
    ]

    def get_public_data(self):
        return {
            'id': self['id'],
            'title': self['title']
        }

@db.register
class Stream(BaseDocument):
    __collection__ = 'streams'

    structure = {
        'id': int,
        'url': unicode,
        'station_id': int,
        'bitrate': int,
        'perform_check': bool,
        'is_shoutcast': bool,
        'is_online': bool,
        'check_error': unicode,
        'checked_at': int,
        'created_at': datetime,
    }

    indexes = [
        {'fields': 'id', 'unique': True},
        {'fields': ['checked_at', 'perform_check']},
        {'fields': ['station_id', 'is_online']}
    ]

    default_values = {
        'created_at': datetime.now,
        'bitrate': 0,
        'checked_at': 0,
        'perform_check': True,
        'is_online': True,
        'is_shoutcast': False,
    }

    def get_web_url(self):
        # если поток вешается через шауткаст,
        # то для веб-плееров добавляем ";"
        # иначе показывается страница статистики
        if self.is_shoutcast:
            return self.url + u';'
        return self.url

    def get_public_data(self):
        return {
            'id': self['id'],
            'url': self.get_web_url(),
            'bitrate': self['bitrate'],
        }


class UserFavorites(object):
    def __init__(self, user_id, redis):
        self.redis = redis
        self.user_id = user_id

    def add(self, object_type, object_id):
        self.redis.zadd(self.object_key(object_type), self.get_ts(), object_id)

    def exists(self, object_type, object_id):
        score = self.redis.zscore(self.object_key(object_type), object_id)
        return bool(score)

    def remove(self, object_type, object_id):
        self.redis.zrem(self.object_key(object_type), object_id)

    def object_key(self, object_type):
        return 'favorite_user_{}:{}'.format(object_type, self.user_id)

    def get_ts(self):
        return int(time.time())

@db.register
class Track(BaseDocument):
    __collection__ = 'tracks'

    structure = {
        'id': int,
        'title': unicode,
        'rawtitle': unicode,
        'artist': unicode,
        'name': unicode,
        'image_url': unicode,
        'tags': [unicode],
        'hash': int,
        'created_at': datetime,
    }

    indexes = [
        {'fields': 'id', 'unique': True},
        {'fields': ['hash', 'rawtitle'], 'unique': True},
    ]

    default_values = {
        'created_at': datetime.now,
    }

@db.register
class Favorite(BaseDocument):
    __collection__ = 'favorites'

    structure = {
        'id': int,
        'ts': datetime,
        'track_ids': [int],
        'tracks': [
            {
                'id': int,
                'title': unicode,
                'station_id': int,
                'station_title': unicode,
                'ts': datetime,
                'deleted': int,
            }
        ]
    }

    default_values = {
        'ts': datetime.now
    }

    def get_public_data(self):
        data = {
            'id': self['id'],
            'date': naturalday(self['ts'], '%Y %m %d'),
            'tracks': []
        }

        for track in self['tracks']:
            data['tracks'].append({
                'id': track['id'],
                'title': track['title'],
                'station_title': track['station_title'],
                'station_id': track['station_id'],
                'time': track['ts'].strftime('%H:%M'),
                'is_deleted': bool(track['deleted'] % 2)
            })

        return data

@db.register
class StationTag(BaseDocument):
    __collection__ = 'stations_tags'

    structure = {
        'id': int,
        'tag': unicode,
        'count': int,
        'is_public': bool,
        'updated_at': datetime
    }

    default_values = {
        'is_public': False,
        'updated_at': datetime.now,
    }

    indexes = [
        {'fields': 'id', 'unique': True},
        {'fields': 'tag', 'unique': True},
        {'fields': 'is_public'},
    ]

    def get_public_data(self):
        return {
            'id': self['id'],
            'title': self['tag'],
        }