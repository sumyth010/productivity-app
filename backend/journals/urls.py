from django.urls import path
from .views import (
    JournalListCreateView,
    JournalRetrieveUpdateDestroyView,
)

urlpatterns = [
    path("journals/", JournalListCreateView.as_view(), name="journal-list-create"),
    path("journals/<int:pk>/", JournalRetrieveUpdateDestroyView.as_view(), name="journal-detail"),
]
