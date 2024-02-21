"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from backend_app.views import *
from django.views.generic import TemplateView
from backend_app.views import *

urlpatterns = [
    # Other URL patterns (if any)
    path('admin/', admin.site.urls),
    # API endpoints for your app
    path('', index, name="index.html"),
    path('', include('backend_app.urls')),  # Include app-specific API endpoints
]

# Add a catch-all URL pattern to serve your React.js application
urlpatterns += [
    # This pattern will match any URL and serve the React.js application
    # Make sure it's the last pattern in urlpatterns to avoid conflicts
    path('<path:resource>/', TemplateView.as_view(template_name='index.html')),
]