import torch
from transformers import AutoTokenizer, AutoModelWithLMHead, AutoModelForCausalLM, PreTrainedTokenizerFast, GPT2LMHeadModel

save_dir_tokenizer = ''
save_dir_model = ''

ctx = "cuda" if torch.cuda.is_available() else "cpu"
device = torch.device(ctx)

# BASIC BOT
# save_dir_tokenizer = './models/basicbot/tokenizer'
# save_dir_model = './models/basicbot/model'
# tokenizer = PreTrainedTokenizerFast.from_pretrained("skt/kogpt2-base-v2")
# model = GPT2LMHeadModel.from_pretrained("skt/kogpt2-base-v2")
# tokenizer.save_pretrained(save_dir_tokenizer)
# model.save_pretrained(save_dir_model)

# NOVEL BOT
save_dir_tokenizer = './models/novelbot/tokenizer'
save_dir_model = './models/novelbot/model'
tokenizer = AutoTokenizer.from_pretrained("ttop324/kogpt2novel")
model = AutoModelWithLMHead.from_pretrained("ttop324/kogpt2novel")
tokenizer.save_pretrained(save_dir_tokenizer)
model.save_pretrained(save_dir_model)

# WELLNESS BOT
save_dir_tokenizer = './models/wellnessbot/tokenizer'
save_dir_model = './models/wellnessbot/model'
tokenizer = PreTrainedTokenizerFast.from_pretrained("taeminlee/kogpt2")
model = GPT2LMHeadModel.from_pretrained("taeminlee/kogpt2")
tokenizer.save_pretrained(save_dir_tokenizer)
model.save_pretrained(save_dir_model)

# kogpt - kakaobrain
save_dir_tokenizer = './models/kogpt_kakao/tokenizer'
save_dir_model = './models/kogpt_kakao/model'
tokenizer = AutoTokenizer.from_pretrained(
    'kakaobrain/kogpt', revision = 'KoGPT6B-ryan1.5b-float16',
    bos_token='[BOS]', eos_token='[EOS]', unk_token='[UNK]', pad_token='[PAD]', mask_token='[MASK]'
)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print('Current device:', device)
model = AutoModelForCausalLM.from_pretrained(
    'kakaobrain/kogpt', revision = 'KoGPT6B-ryan1.5b-float16',
    pad_token_id=tokenizer.eos_token_id,
    torch_dtype=torch.float16, low_cpu_mem_usage=True
    ).to(device=device, non_blocking=True)
_=model.eval()
tokenizer.save_pretrained(save_dir_tokenizer)
model.save_pretrained(save_dir_model)