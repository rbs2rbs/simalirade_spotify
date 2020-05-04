from django.contrib import admin
from django.urls import path,include
from django.conf.urls import url
from rest_framework import routers 
from api import views  
from django.conf.urls.static import static
from django.conf import settings
from .views import index

from django.views.decorators.cache import never_cache

router = routers.DefaultRouter()
# router.register(r'pagina',views.PaginaView,'pagina')  

urlpatterns = [
    path('api/musica/',views.MusicaView.as_view()),
    path('api/comp/',views.CompView.as_view()),
    path('api/top/',views.TopView.as_view()),
    url(r'^(?!admin|api|media).*$', never_cache(index)),
    path('admin/', admin.site.urls),
    # path('api/', include(router.urls)),
]+static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)