from django.db import models
from django.contrib.auth.models import User


class Journal(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name= "journals")
    title = models.CharField(max_length=200)
    content = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


    class Meta:
        ordering = ["-created_at"]
    
    def __str__ (self):
        return self.title