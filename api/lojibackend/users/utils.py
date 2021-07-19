# from rest_framework_simplejwt.tokens import RefreshToken
# from django.utils.six import text_type
# from rest_framework_simplejwt import backend


# class JWTHelper():
#     def get_simplejwt_tokens(user):
#         tokens = RefreshToken.for_user(user)
#         refresh = text_type(tokens)
#         access = text_type(tokens.access_token)

#         data = {
#             'refresh': refresh,
#             'access': access
#         }

#         return data
    
#     def decode_token(token):
#         backend.TokenBackend().decode(token)
#         return 