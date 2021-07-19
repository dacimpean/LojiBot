from django.shortcuts import render
from django.views import View
from django.conf import settings


class Website(View):
    main_template = 'website/index.html'
    pricing_template = 'website/pricing.html'

    main_context = {
            'APP_URL': settings.APP_URL,
            'APP_PORT': settings.APP_PORT
        }

    def get_main(self, request):
        return render(request, self.main_template, self.main_context)

    def get_pricing(self, request):
        return render(request, self.pricing_template, self.main_context)

    def get_help(self, request):
        return render(request, self.main_template, self.main_context)

    def get_privacy(self, request):
        return render(request, self.main_template, self.main_context)

    def get_terms(self, request):
        return render(request, self.main_template, self.main_context)

