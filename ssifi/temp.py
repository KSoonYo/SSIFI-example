from STT import STT
from NLP import novelbot

# STT
audio_path = './STT/audio_sample/korean.wav'
prompt = STT.speech_recognition(audio_path)
print(prompt)

# NLP (NOVELBOT)
output = novelbot.novelbot(prompt, 500)
print(output)