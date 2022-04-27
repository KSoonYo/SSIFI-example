from __future__ import absolute_import, unicode_literals
from celery import shared_task
from django.conf import settings
from datetime import datetime
import os, shutil

@shared_task
def delete_tts_file():
    path = str(settings.MEDIA_ROOT) + '\\tts'
    if os.path.exists(path):
        shutil.rmtree(path)
        print(str(datetime.now()) + ' deleted tts folder')
    
    if not os.path.exists(path):
        os.makedirs(path)
        print(str(datetime.now()) + ' maked tts folder')
