from djongo import models
from backend.crypto import CipherV1


class EncryptedCharField(models.CharField):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def get_prep_value(self, value):
        value = super().get_prep_value(value)
        if not value:
            return None
        return CipherV1().encrypt(value)


class Message(models.Model):
    user_message = EncryptedCharField(max_length=500)
    ssifi_response = EncryptedCharField(max_length=500)
    mode = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    client_key = models.CharField(max_length=100)

    def __str__(self):
        return self.user_message


class Client(models.Model):
    client_key = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
