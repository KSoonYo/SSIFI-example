from django.db import models


class Message(models.Model):
    user_message = models.TextField()
    ssifi_response = models.TextField()
    mode = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user_message
