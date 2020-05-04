import argparse
import pprint
import sys
import os
import subprocess
import json
import spotipy
import spotipy.util as util
import pandas as pd
import numpy as np


from sklearn.cluster import KMeans
from sklearn.preprocessing import MinMaxScaler

from spotipy.oauth2 import SpotifyClientCredentials

from django.db import models

# from rest_framework import serializers

class Funcoes:

    def __init__(self):
        # client_credentials_manager = SpotifyClientCredentials()
        self.client_id = '40bac3817c7b4dfab61f7ffff5dea928'
        self.client_secret = '620cef49abbb4284b8af38e7188691a7'
        self.client_credentials_manager = SpotifyClientCredentials(client_id=self.client_id, client_secret=self.client_secret)
        self.sp = spotipy.Spotify(client_credentials_manager=self.client_credentials_manager) #spotify object to access API

    def get_musica(self,music_id):
        sp = self.sp
        saida = {
            'features':sp.audio_features(music_id),
            'track':sp.track(music_id)
        }
        return(saida)

    

    def get_playlist_audio_features(self,username, playlist_id):
        sp = self.sp
        offset = 0
        songs = []
        items = []
        ids = []
        while True:
            content = sp.user_playlist_tracks(username, playlist_id, fields=None, limit=100, offset=offset, market=None)
            songs += content['items']
            if content['next'] is not None:
                offset += 100
            else:
                break

        for i in songs:
            ids.append(i['track']['id'])

        index = 0
        audio_features = []
        while index < len(ids):
            audio_features += sp.audio_features(ids[index:index + 50])
            index += 50

        return (audio_features)

class Comp:
    def __init__(self,top,musica):
       
        self.top = top
        self.musica = musica

    def comp(self):
        musicas = pd.DataFrame(self.musica['features'])

        links_musica = musicas['uri']

        # musicas = musicas.drop(['instrumentalness','time_signature','key','mode','type','uri','id','track_href','analysis_url'],axis=1)
        musicas = musicas.drop(['time_signature','key','mode','type','uri','id','track_href','analysis_url','duration_ms'],axis=1)
        
        musicas['loudness'] = (musicas['loudness']+60)/(60)
        musicas['tempo'] = (musicas['tempo'] - 25)/200

        ################################

        top = pd.DataFrame(self.top)
        
        # top = top.drop(['instrumentalness','time_signature','key','mode','type','uri','id','track_href','analysis_url'],axis=1)
        top = top.drop(['time_signature','key','mode','type','uri','id','track_href','analysis_url','duration_ms'],axis=1)
        nomes = top.columns

        top['loudness'] = (top['loudness'] + 60)/(60)
        top['tempo'] = (top['tempo'] - 25)/200

        # scala = MinMaxScaler()
        # scala.fit(top)

        # top = pd.DataFrame(scala.transform(top))

        for id,col in enumerate(top.columns):
            top.rename(columns={col:nomes[id]}, inplace=True)

        ###################
        
        kmeans = KMeans(n_clusters=1, init='k-means++', max_iter=300, n_init=10, random_state=0)

        kmeans.fit_predict(top)

        centroides = {}
        minimos = {}
        maximos = {}
        largura = {}

        saida = []
        for id,nome in enumerate(top.columns):
            if nome == "loudness":
                centroides[nome] = kmeans.cluster_centers_[:,id][0]
                minimos[nome] = -60
                maximos[nome] = 0
                largura[nome] = 60

            elif nome == "tempo":
                centroides[nome] = kmeans.cluster_centers_[:,id][0]
                minimos[nome] = 25
                maximos[nome] = 225
                largura[nome] = 200
                
            else:
                centroides[nome] = kmeans.cluster_centers_[:,id][0]
                minimos[nome] = 0
                maximos[nome] = 1
                largura[nome] = 1

        for nome in musicas.columns:
            saida.append((musicas.loc[0,nome] - minimos[nome])/largura[nome])

        prop = 1-((np.sqrt(np.sum((saida - kmeans.cluster_centers_)**2)))/(np.sqrt(np.shape(musicas)[1])))

        dists = []
        for i in range(0,np.shape(top)[0]):
            dists.append(np.sqrt(np.sum((top.iloc[i,:].values - musicas.values)**2)))

        posicao = np.where(dists == np.amin(dists))[0][0]

        parecida = self.top[posicao]['id']

        dist_parecidas = 1 - dists[posicao]

        saida = {
            "parecida":parecida,
            "prop":prop,
            "dist_parecidas": dist_parecidas
        }

        return(saida)


