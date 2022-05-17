# Install Dependencies

<br/>

먼저 python = 3.7, [pytorch](https://pytorch.org/), [ffmpeg](https://ffmpeg.org/)와 [g2pk](https://github.com/Kyubyong/g2pK)를 설치합니다.

<br/>

```python
# ffmpeg install
sudo apt-get install ffmpeg

# [WARNING] g2pk를 설치하시기 전에, g2pk github을 참조하셔서 g2pk의 dependency를 설치하시고 g2pk를 설치하시기 바랍니다.
pip install g2pk
```

해당 설치 과정은 TTS에서 사용되는 패키지의 의존성 문제 때문에 선행으로 진행하게 됩니다.

다음으로, 필요한 모듈을 pip를 이용하여 설치합니다.

<br/>

```python
pip install -r requirements.txt
```

<br/>

## [WARNING]

<br/>

**1. Window에서는 g2pk의 dependency인 python-mecab-ko 설치문제가 발생하며, Window 버전을 설치 하더라도 g2pk 설치시 에러가 발생할 수 있기 때문에 linux 환경을 권장드립니다.**

<br/>

**2. Anaconda 가상환경을 사용하시는 것을 권장드립니다.**

<br/>

## How to use

<br/>

먼저 ssifi.py에서 STT, NLP, TTS를 사용하기 위한 변수값을 지정한 후 아래의 커맨드를 실행해 주세요.

<br/>

```python
python ssifi.py
```

<br/>
