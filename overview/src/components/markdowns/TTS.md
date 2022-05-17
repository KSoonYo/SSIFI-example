# TTS(Text To Speech) - FastSpeech 2 Korean

<br/>

이 프로젝트의 TTS는 Microsoft의 [**FastSpeech 2(Y. Ren et. al., 2020)**](https://arxiv.org/abs/2006.04558)를 [**Korean Single Speech dataset (이하 KSS dataset)**](https://www.kaggle.com/bryanpark/korean-single-speaker-speech-dataset)에서 동작하도록 구현한 것입니다.

본 소스코드는 https://github.com/HGU-DLLAB/Korean-FastSpeech2-Pytorch 를 변형 및 수정한 것입니다.

<br/>

## 변경 사항

```python
preprocess.py, train.py, synthesize.py의 실행 부분을 함수화

모듈 사용을 위한 경로 관련 코드 추가 및 수정

ssifi.py를 통해 음성 생성하기 위해 필요한 변수 추가

생성된 음성파일 저장경로(result_path)

파일명(file_name)

트레이닝 된 모델의 step
```

<br/>

## Preprocessing

<br/>

### **(1) kss dataset download**

[Korean-Single-Speech dataset](https://www.kaggle.com/bryanpark/korean-single-speaker-speech-dataset): 12,853개(약 12시간)의 샘플로 구성된 한국어 여성 단일화자 발화 dataset입니다.

dataset을 다운로드 하신 후, 압축을 해제하시고 `hparams.py`에 있는 `data_path`에 다운받은 kss dataset의 경로를 기록해주세요.

<br/>

### **(2) phoneme-utterance sequence간 alignment 정보 download**

KSS ver.1.4. ([download](https://drive.google.com/file/d/1LgZPfWAvPcdOpGBSncvMgv54rGIf1y-H/view?usp=sharing))

FastSpeech2를 학습하기 위해서는 [Montreal Forced Aligner](https://montreal-forced-aligner.readthedocs.io/en/latest/)(MFA)에서 추출된 utterances와 phoneme sequence간의 alignment가 필요합니다. kss dataset에 대한 alignment 정보(TextGrid)는 위의 링크에서 다운로드 가능합니다. 다운 받은 `TextGrid.zip`파일을 `프로젝트 폴더 (TTS)`에 두시면 됩니다.

**\*KSS dataset에 적용된 License로 인해 kss dataset에서 추출된 TextGrid를 상업적으로 사용하는 것을 금합니다.**

<br/>

### **(3) 데이터 전처리**

<br/>

### hparms.py

```python
dataset : dataset의 폴더 이름

data_path : dataset의 상위 폴더 경로

meta_name : metadata의 text 파일명 ex)transcript.v.1.4.txt

tetxgrid_name : textgird 압푹 파일의 파일명
```

<br/>

### 1. preprocess.py

line 42:` if "kss" in hp.dataset:` 에서 kss 부분은 본인이 설정한 dataset 이름을 작성하시면 됩니다.

```python
python TTS_preprocess.py
```

data 전처리를 위해 위의 커맨드를 입력해 주세요. 전처리 된 데이터는 프로젝트 폴더의 `TTS/preprocessed/` 폴더에 생성됩니다.

<br/>

## Training

모델 학습 전에, kss dataset에 대해 사전학습된 [VocGAN](https://github.com/rishikksh20/VocGAN)(neural vocoder)을 [다운로드](https://drive.google.com/file/d/1GxaLlTrEhq0aXFvd_X1f4b-ev7-FH8RB/view?usp=sharing) 하여 `vocoder/pretrained_models/` 경로에 위치시킵니다. 만약, VocGAN에 대한 학습이 필요하시다면 해당 링크를 참고하셔서 진행하시면 됩니다.
아래의 커맨드를 입력하여 모델 학습을 수행합니다.

```python
python TTS_train.py
```

학습된 모델은 `ckpt/`에 저장되고 tensorboard log는 `log/`에 저장됩니다. 학습시 evaluate 과정에서 생성된 음성은 `eval/` 폴더에 저장됩니다.

만약, 학습된 모델에 이어서 하시려면 TTS_train.py의 `start_train`함수에서 변수 값으로 학습된 모델의 step 값을 넣어주시면 됩니다.

<br/>

## Pre-trained Model

pretrained model(checkpoint)을 [다운로드](https://drive.google.com/file/d/1qkFuNLqPIm-A5mZZDPGK1mnp0_Lh00PN/view?usp=sharing)해 주세요.
그 후, `hparams.py`에 있는 `checkpoint_path` 변수에 기록된 경로에 위치시켜주시면 사전학습된 모델을 사용 가능합니다.

<br/>

## Synthesis

학습된 파라미터를 기반으로 음성을 생성하기 위해서는 ssifi.py에서 make_sound함수를 통해 생성하실 수 있습니다.

`make_sound(file_name, sentence, results_path, step=350000)`

- file_name: 생성되는 음성 파일의 이름

- sentence: input text

- result_path: 합성된 음성 파일이 저장되는 경로
- step: 트레이닝 된 모델의 step(default=350000)

상세코드는 `TTS/synthesize.py` 를 참고하시면 됩니다.

<br/>

## Tensorboard

```python
tensorboard --logdir log/hp.dataset/
```

- hp.dataset: hparams.py에 등록된 dataset 변수에 등록된 경로
  tensorboard log들은 `log/hp.dataset/` directory에 저장됩니다. 그러므로 위의 커멘드를 이용하여 tensorboard를 실행해 학습 상황을 모니터링 하실 수 있습니다.
