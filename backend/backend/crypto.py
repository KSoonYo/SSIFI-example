import base64

from Cryptodome.Cipher import AES
from django.conf import settings


class CipherV1:
    def cipher(self, nonce=None):
        return AES.new(
            key=self._base64str_to_binary(settings.CIPHER_V1_KEY), 
            mode=AES.MODE_GCM, 
            nonce=nonce
        )

    def encrypt(self, value: str) -> str:
        cipher = self.cipher()
        cipher_text, tag = cipher.encrypt_and_digest(bytes(value, 'utf-8'))
        nonce = self._binary_to_base64str(cipher.nonce)
        cipher_text = self._binary_to_base64str(cipher_text)
        tag = self._binary_to_base64str(tag)
        return f'v=1,a=aes256gcm,{nonce},{cipher_text},{tag}'

    def decrypt(self, value: str) -> str:
        splitted_text = value.split(',')
        nonce = self._base64str_to_binary(splitted_text[2])
        cipher_text = self._base64str_to_binary(splitted_text[3])
        tag = self._base64str_to_binary(splitted_text[4])
        cipher = self.cipher(nonce)
        text = cipher.decrypt_and_verify(cipher_text, tag)
        return bytes.decode(text, 'utf-8')

    @staticmethod
    def _binary_to_base64str(value: bytes) -> str:
        encoded = base64.b64encode(value)
        return bytes.decode(encoded, 'utf-8')

    @staticmethod
    def _base64str_to_binary(value: str) -> bytes:
        return base64.b64decode(value)
