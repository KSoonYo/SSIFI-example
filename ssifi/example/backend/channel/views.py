from django.http.response import JsonResponse
from rest_framework.decorators import api_view
from django.core.files.storage import FileSystemStorage


@api_view(['POST'])
def stt(request):
    '''
    음성파일(.wav)를 입력받아 해당 음성의 한국어 text를 반환
    '''
    fs = FileSystemStorage()

    file = request.FILES['speech']
    filename = fs.save('input.wav', file)
    
    response = {'message': '출력 확인'}
    return JsonResponse(response)