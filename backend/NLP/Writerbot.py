import os, platform
import torch
from transformers import AutoModelWithLMHead, PreTrainedTokenizerFast

if platform.system() == "Windows":
	base_path = str(os.path.abspath(__file__)).split('\\')
else:
	base_path = str(os.path.abspath(__file__)).split('/')
base_path = '/'.join(base_path[:-1])
tokenizer_path = base_path + '/models/writerbot/tokenizer'
model_path = base_path + '/models/writerbot/'

def writerbot(prompt, max_length = 50, model_name = 'news') :
	spec_model_path = model_path + model_name + '_model'
	tokenizer = PreTrainedTokenizerFast.from_pretrained(tokenizer_path) 
	model = AutoModelWithLMHead.from_pretrained(spec_model_path)

	with torch.no_grad():
		tokens = tokenizer.encode(prompt, return_tensors='pt')
		gen_tokens = model.generate(tokens, do_sample=True, temperature=0.8, max_length=max_length, reqpetition_penalty=2.0, use_cache=True)
		generated = tokenizer.batch_decode(gen_tokens)[0]
	return generated