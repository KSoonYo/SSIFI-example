import json
from django.http.response import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from django.core.files.storage import FileSystemStorage
from django.conf import settings
import os, sys

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(os.path.abspath(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))))))

from STT import STT
from NLP import novelbot
from TTS import synthesize


@api_view(['POST'])
def stt(request):
    '''
    음성파일(.wav)를 입력받아 해당 음성의 한국어 text를 반환
    '''
    fs = FileSystemStorage()

    if not request.FILES:
        return JsonResponse({'detail': '음성 파일이 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)

    file = request.FILES['speech']
    file_extension = str(file).split('.')[-1]

    if file_extension.lower() != 'wav':
        return JsonResponse({'detail': '파일 형식이 잘못되었습니다.'}, status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)

    savename = fs.save('stt/input.wav', file)

    try:
        result = STT.speech_recognition(os.path.join(settings.MEDIA_ROOT, savename))

    except Exception:
        return JsonResponse({'detail': '음성을 인식할 수 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)

    finally:
        os.remove(os.path.join(settings.MEDIA_ROOT, savename))
    
    response = {'message': result}
    return JsonResponse(response)


@api_view(['POST'])
def tts(request):
    '''
    사용자가 입력한 텍스트를 기준으로 문장을 생성하여 생성된 문장의 텍스트와 음성 URL을 반환
    '''
    try:
        req = json.loads(request.body)
    except Exception:
        return JsonResponse({'detail': '지원되지 않는 미디어 형태입니다. '}, status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)
    
    if not req.get('message'):
        return JsonResponse({'detail': 'message를 입력해주세요.'}, status=status.HTTP_400_BAD_REQUEST)
    
    if not req.get('mode'):
        return JsonResponse({'detail': 'mode를 입력해주세요.'}, status=status.HTTP_400_BAD_REQUEST)

    mode = {'novel'}

    if req.get('mode') not in mode:
        return JsonResponse({'detail': '지원하지 않는 mode입니다.'}, status=status.HTTP_400_BAD_REQUEST)

    user_message = req['message']
    ai_model = req['mode']

    # TODO: koGPT 모델에 텍스트와 사용모델을 넘겨주고 생성된 문장을 받는 로직
    if req.get('mode') == 'novel':
        message = novelbot.novelbot(user_message, 100)

    # TODO: 생성된 message를 (+모델명?) 넘겨주고 음성 파일을 생성하는 로직
    base_url = 'http://localhost:8000'
    result_path = './media/tts'
    # TODO: file_name으로 이름을 받아올 예정
    synthesize.make_sound(message, result_path)
    file_name = '띠링.wav'
    url = base_url + settings.MEDIA_URL + 'tts/' + file_name

    # TODO: 삭제 로직

    response = {'message': message, 'url': url}
    return JsonResponse(response)
