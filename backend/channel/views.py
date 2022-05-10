import json
from django.http.response import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from django.core.files.storage import FileSystemStorage
from django.conf import settings
from .models import Message
from .tasks import delete_tts_file, make_key, is_valid_key
import os, re, uuid, time

from STT import STT
from NLP import Novelbot, Wellnessbot, Painterbot, Reporterbot, Writerbot
from TTS import synthesize


@api_view(['POST'])
def stt(request):
    '''
    음성파일(.wav)를 입력받아 해당 음성의 한국어 text를 반환
    '''
    key = request.POST.get('key')
    if not is_valid_key.delay(key).get():
        return JsonResponse({'detail': '인증에 실패하였습니다.'}, status=status.HTTP_401_UNAUTHORIZED)

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

    key = req.get('key')
    if not is_valid_key.delay(key).get():
        return JsonResponse({'detail': '인증에 실패하였습니다.'}, status=status.HTTP_401_UNAUTHORIZED)
    
    if not req.get('message'):
        return JsonResponse({'detail': 'message를 입력해주세요.'}, status=status.HTTP_400_BAD_REQUEST)
    
    if not req.get('mode'):
        return JsonResponse({'detail': 'mode를 입력해주세요.'}, status=status.HTTP_400_BAD_REQUEST)

    modes = {'novel', 'wellness', 'painter', 'reporter', 'writer'}
    mode = req['mode']
    user_message = req['message']

    if mode not in modes:
        return JsonResponse({'detail': '지원하지 않는 mode입니다.'}, status=status.HTTP_400_BAD_REQUEST)

    if req.get('mode') == 'novel':
        ssifi_response = Novelbot.novelbot(user_message, 100)

    elif req.get('mode') == 'wellness':
        ssifi_response = Wellnessbot.wellnessbot(user_message, 50)

    elif req.get('mode') == 'painter':
        # TODO: 현재 메모리 초과, AWS 상황에서 확인 필요
        # TODO: 번역 api 최대 횟수 지정 필요
        ssifi_response = Painterbot.painterbot(user_message)

    elif req.get('mode') == 'reporter':
        # TODO: 세부 모델을 입력받는 방법 논의
        ssifi_response = Reporterbot.reporterbot(user_message, 200, 'society')

    elif req.get('mode') == 'writer':
        ssifi_response = Writerbot.writerbot(user_message, 200)
    
    if (req.get('isSaved' == 'true')):
        message = Message(user_message=user_message, ssifi_response=ssifi_response, mode=mode, client_key=key)
        message.save()
    
    sentences = re.split('\. |\! |\? ', ssifi_response)

    urls = []
    base_url = 'http://localhost:8000'

    if not os.path.isdir(os.path.join(settings.MEDIA_ROOT, 'tts')):
        os.mkdir(os.path.join(settings.MEDIA_ROOT, 'tts'))

    result_path = './media/tts'
    for i in range(len(sentences)):
        file_name = key + '_' + ''.join(str(time.time()).split('.')) + f'_{i}'
        synthesize.make_sound(file_name, sentences[i], result_path)
        url = base_url + settings.MEDIA_URL + 'tts/' + file_name + '.wav'
        urls.append(url)
        delete_tts_file.delay(file_name + '.wav')

    response = {'message': ssifi_response, 'url': urls}
    return JsonResponse(response)


@api_view(['GET'])
def make_client_key(request):
    '''
    요청받은 시간으로부터 1시간 동안 유효한 유니크 키를 반환
    '''
    key = str(uuid.uuid1())
    make_key.delay(key)
    response = {'key': key}
    return JsonResponse(response)
