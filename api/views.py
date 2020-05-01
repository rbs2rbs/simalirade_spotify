from django.shortcuts import render
# from django.http import JsonResponse,HttpResponse

from rest_framework.response import Response

import json

from api.funcoes import Funcoes,Comp

from rest_framework.views import APIView

from django.core import serializers


class MusicaView(APIView):
    def post(self, request):
        try:
            funcoes = Funcoes()
            musica = json.loads(request.body)['musica']
            musica = musica.split('/')

            saida = funcoes.get_musica(music_id = musica[-1])
            request.session['musica'] = saida
        except:
            saida = "error"  

        return Response(saida)


class TopView(APIView):
    def post(self, request):
        try:
            funcoes = Funcoes()
            top = json.loads(request.body)['top']
            saida = funcoes.get_playlist_audio_features('renan_bispo',top)
            request.session['top'] = saida
        except:
            saida = "error"    

        return Response(saida)

class CompView(APIView):
    def get(self,request):
        comp = Comp(request.session['top'],request.session['musica'])
        saida = comp.comp()
        funcoes = Funcoes()
    
        saida['musica'] = funcoes.get_musica(music_id = saida['parecida'])
        return Response(saida)
        