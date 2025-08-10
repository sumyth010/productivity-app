



from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,      # to get access and refresh tokens
    TokenRefreshView,         # to refresh access token using refresh token
)
from .views import RegisterView, ProtectedHelloView



urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # login
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('hello/', ProtectedHelloView.as_view(), name='hello'),
]
