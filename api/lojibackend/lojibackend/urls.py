"""lojibackend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
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
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.documentation import include_docs_urls
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from purchase_orders.urls import *
from users.urls import *
from quickbooks_sync.urls import *

schema_view = get_schema_view(
    openapi.Info(
        title="Loji API",
        default_version='v1',
        description="Loji v1 APIs",
        terms_of_service="http://www.google.com/plicies/terms/",
        contact=openapi.Contact(email="contact@loji.local"),
        license=openapi.License(name="BSD License")
    ),
    validators=['flex', 'ssv'],
    public=True,
    permission_classes=(AllowAny,)
)


urlpatterns = [
    path('docs/', include_docs_urls(title='Loji Docs', public=True, schema_url='http://sandtex-host.com', generator_class=router.SchemaGenerator,
                                    authentication_classes=[],
                                    permission_classes=[])),
    path(r'swagger(?P<format>\.json|\.yaml)', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('admin/', admin.site.urls),
    # path('api/v1/', include('api.urls')),
    path('api/v1/token/', TokenObtainPairView.as_view()),
    path('api/v1/token/refresh/', TokenRefreshView.as_view()),
    path('api/v1/user/', include('users.urls'), name='users'),
    path('api/v1/po/', include('purchase_orders.urls')),
    path('api/v1/qb/', include('quickbooks_sync.urls')),
    path('api/v1/send/', include('send.urls'))
]
