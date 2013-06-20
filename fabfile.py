#!/usr/bin/env python
# -*- coding: utf-8 -*-

from datetime import datetime
from fabric.api import env, local, run, lcd, cd, sudo, settings, put
from fabric.contrib.files import exists, append
from fabric.contrib.console import confirm


def grunt():
    with lcd('afm/static/js'):
        local('grunt')


def dump():
    local('mongodump -d againfm')


def init():
    run('pip install -r {}/requirements.txt'.format(env.project))


def compass():
    local('compass watch afm/static')


def celery():
    local('celery worker --app=afm.celery -l info')


def player():
    with lcd('player'):
        local('as3compile --flashversion 10 --output ../afm/static/swf/player.swf player.as')

