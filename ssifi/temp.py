# from STT import STT
# from NLP import novelbot
from TTS import synthesize

# STT
# audio_path = './STT/audio_sample/korean.wav'
# prompt = STT.speech_recognition(audio_path)
# print(prompt)

# NLP (NOVELBOT)
# output = novelbot.novelbot(prompt, 100)
# print(output)
output = input()
# TTS
results_path = '../results'
synthesize.make_sound(output, results_path)