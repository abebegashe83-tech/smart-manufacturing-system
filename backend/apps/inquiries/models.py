from django.db import models


class Inquiry(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    company = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} - {self.company}'
