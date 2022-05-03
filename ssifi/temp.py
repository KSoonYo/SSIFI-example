# from STT import STT
from NLP import novelbot, wellnessbot, basicbot
# from TTS import synthesize

# STT
# audio_path = './STT/audio_sample/korean.wav'
# prompt = STT.speech_recognition(audio_path)
# print(prompt)

# NLP (BASICBOT)
# output = Basicbot.basicbot("강화도의 특산품은 뭐야?", 200)
# print(output)

# NLP (NOVELBOT)
# output = novelbot.novelbot(prompt, 100)
# print(output)

# NLP (WELLNESSBOT)
output = Wellnessbot.wellnessbot("외로운 오늘", 50)
print(output)

# output = input()
# TTS
# results_path = '../results'
# synthesize.make_sound(output, results_path)