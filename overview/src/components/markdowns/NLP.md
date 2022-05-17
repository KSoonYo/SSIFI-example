# NLP(Natural Language Processing)

<br/>

> 본 프로젝트에서는 3가지 NLP 모델을 이용해 자연어 이해 및 확장을 구현합니다.

> 사용하는 NLP 모델과 그 활용은 다음과 같습니다.

```python
1. SKT-KoGPT : Chatbot, Wellnessbot, Novelbot
2. KAKAO-kogpt : Chatbot
3. GLIDE-text2im : Painterbot
```

<br/>

## Usage

<br/>

### Save Model

- SSIFI 에서 제공하는 기본모델 : `BASICBOT, NOVELBOT, WELLNESSBOT, PAINTERBOT, KAKAO-KOGPT `

- 다음 명령어를 통해 제공 모델을 다운받을 수 있습니다. (모델 저장 위치 : `NLP/models`)

  ```python
  python NLP/save_models.py
  ```

<br/>

## Fine-Tuning

> NLP 모델의 Fine-tuning 은 Colab 활용을 위해 jupyter-notebook 으로 작성되었습니다.
>
> 'ssifi/NLP/notebook' 폴더의 파일을 참고하세요.
