from django.shortcuts import render
from django.http import HttpResponseNotFound

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

            saida = funcoes.get_musica(music_id = musica[-1][0:22])

            request.session['musica'] = saida

            return Response(saida)

        except:
            return HttpResponseNotFound("error")  

        


class TopView(APIView):
    def post(self, request):
        
        funcoes = Funcoes()
        top = json.loads(request.body)['top']

        saida = funcoes.get_playlist_audio_features('renan_bispo',top)

        
        top_null = []

        for i in saida:
            if not i is None:
                top_null.append(i)

        request.session['top'] = top_null

        return Response(top_null)

class CompView(APIView):
    def get(self,request):
        comp = Comp(request.session['top'],request.session['musica'])

        for key in list(request.session.keys()):
            try:
                del request.session[key]
            except:
                pass

        saida = comp.comp()
        funcoes = Funcoes()
    
        saida['musica'] = funcoes.get_musica(music_id = saida['parecida'])
        return Response(saida)
        