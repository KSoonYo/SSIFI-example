<h1 style="font-size:50px;">STT(Speech To Text) - Speech Recognition(Korean)</h1>

<br/>

> 본 프로젝트에서는 STT로 [Speech Recognition](https://github.com/Uberi/speech_recognition) 라이브러리를 사용했습니다.<br/> 해당 라이브러리는 온라인 및 오프라인에서 여러 엔진 및 API를 지원하여 음성 인식을 수행하기 위한 라이브러리 입니다. <br/> 라이브러리에는 다양한 기능이 있지만, 현재 프로젝트에서는 한국어 음성이 녹음된 파일을 이용하기 때문에 한국어 음성을 텍스트화 하는 기능만 사용합니다.

<br/>

### Speech recognition가 지원하는 engine/API:

<br/>

[CMU Sphinx](http://cmusphinx.sourceforge.net/wiki/) (works offline)

Google Speech Recognition(프로젝트에서 사용한 모델)

[Google Cloud Speech API](https://cloud.google.com/speech/)

[Wit.ai](https://wit.ai/)

[Microsoft Azure Speech](https://azure.microsoft.com/en-us/services/cognitive-services/speech/)

[Microsoft Bing Voice Recognition (Deprecated)](https://www.microsoft.com/cognitive-services/en-us/speech-api)

[Houndify API](https://houndify.com/)

[IBM Speech to Text](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/speech-to-text.html)

[Snowboy Hotword Detection](https://snowboy.kitt.ai/) (works offline)

[Tensorflow](https://www.tensorflow.org/)

[Vosk API](https://github.com/alphacep/vosk-api/) (works offline)

<br/>

## Transcription

```python
# STT
audio_path = './STT/audio_sample/korean.wav'
prompt = STT.speech_recognition(audio_path)
```

<br/>

### ssifi.py

`audio_path` : 텍스트화 하고자 하는 음성파일의 경로

`prompt` : 텍스트화 결과값(NLP의 input)

<br/>
