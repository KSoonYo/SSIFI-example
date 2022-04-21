from django.http.response import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from django.core.files.storage import FileSystemStorage
from django.conf import settings
import os
import playsound


@api_view(['POST'])
def stt(request):
    '''
    음성파일(.wav)를 입력받아 해당 음성의 한국어 text를 반환
    '''
    fs = FileSystemStorage()

    file = request.FILES['speech']
    file_extension = str(file).split('.')[-1]

    if file_extension.lower() != 'wav':
        return JsonResponse({'detail': '파일 형식이 잘못되었습니다.'}, status=status.HTTP_406_NOT_ACCEPTABLE)

    savename = fs.save('input.wav', file)

    # TODO: AI stt 모델에 음성파일을 넘겨주고 text를 return 받는 로직
    result = str(file)
    playsound.playsound(os.path.join(settings.MEDIA_ROOT, savename))

    os.remove(os.path.join(settings.MEDIA_ROOT, savename))
    
    response = {'message': result}
    return JsonResponse(response)


@api_view(['POST'])
def tts(request):
    '''
    사용자가 입력한 텍스트를 기준으로 문장을 생성하여 생성된 문장의 텍스트와 음성 URL을 반환
    '''
    response = {'message': '출력 확인', 'url': '출력 확인'}
    return JsonResponse(response)
