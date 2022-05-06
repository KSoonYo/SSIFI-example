from __future__ import absolute_import, unicode_literals
from celery import shared_task
from datetime import datetime
import os, shutil
import time

key_set = set()

@shared_task
def delete_tts_file(file_name):
    time.sleep(3600)

    if os.path.isfile(f'media/tts/{file_name}'):
        os.remove(f'media/tts/{file_name}')
        print(str(datetime.now()) + f' {file_name} 삭제')

    else:
        print(str(datetime.now()) + f' {file_name}이 없습니다.')


@shared_task
def make_key(key):
    key_set.add(key)
    print(str(datetime.now()) + f' 클라이언트 {key} 추가')
    print(key_set)

    time.sleep(3600)

    key_set.remove(key)
    print(str(datetime.now()) + f' 클라이언트 {key} 삭제')
    print(key_set)


@shared_task
def is_valid_key(key):
    if key in key_set:
        return True
    else:
        return False
