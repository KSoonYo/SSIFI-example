from __future__ import absolute_import, unicode_literals
from celery import shared_task
from django.conf import settings
from datetime import datetime
import os, shutil
import time

@shared_task
def delete_tts_file(file_name):
    time.sleep(3600)

    if os.path.isfile(f'media/tts/{file_name}'):
        os.remove(f'media/tts/{file_name}')
        print(str(datetime.now()) + f' {file_name} 삭제')

    else:
        print(str(datetime.now()) + f' {file_name}이 없습니다.')
