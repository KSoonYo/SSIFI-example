from djongo import models


class Message(models.Model):
    user_message = models.TextField()
    ssifi_response = models.TextField()
    mode = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    client_key = models.CharField(max_length=100)

    def __str__(self):
        return self.user_message
