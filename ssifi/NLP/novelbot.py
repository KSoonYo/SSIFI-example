import torch
from transformers import AutoTokenizer, AutoModelWithLMHead, AutoModelForCausalLM

tokenizer_path = 'NLP/models/novelbot/tokenizer'
model_path = 'NLP/models/novelbot/model'
# NOVEL BOT
def novelbot(prompt, max_length: int = 256):
  tokenizer = AutoTokenizer.from_pretrained(tokenizer_path)
  model = AutoModelWithLMHead.from_pretrained(model_path)
  with torch.no_grad():
    tokens = tokenizer.encode(prompt, return_tensors='pt')
    gen_tokens = model.generate(tokens, do_sample=True, temperature=0.8, max_length=max_length, reqpetition_penalty=2.0, use_cache=True)
    generated = tokenizer.batch_decode(gen_tokens)[0]
  return generated