import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const pontos = [
  {
    id: '1',
    nome: 'Instituto Mão Amiga',
    endereco: 'Rua das Flores, 120 - Goiânia',
    descricao: 'Ponto de coleta principal',
  },
  {
    id: '2',
    nome: 'Centro Comunitário',
    endereco: 'Avenida Central, 450 - Goiânia',
    descricao: 'Recebimento de alimentos e roupas',
  },
  {
    id: '3',
    nome: 'Casa Solidária',
    endereco: 'Rua Esperança, 80 - Goiânia',
    descricao: 'Arrecadação de doações',
  },
];

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const tablet = width >= 600;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={[styles.container, tablet && styles.containerTablet]}>
        <Text style={styles.titulo}>Instituto Mão Amiga</Text>

        <Text style={styles.subtitulo}>
          Encontre um ponto de coleta próximo de você
        </Text>

        <FlatList
          data={pontos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.lista}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [
                styles.card,
                tablet && styles.cardTablet,
                pressed && styles.cardPressed,
              ]}
              onPress={() =>
                router.push({
                  pathname: '/modal',
                  params: {
                    nome: item.nome,
                    endereco: item.endereco,
                    descricao: item.descricao,
                  },
                })
              }
            >
              <View style={styles.cardContent}>
                <Text style={styles.nome}>{item.nome}</Text>

                <Text style={styles.endereco}>{item.endereco}</Text>

                <Text style={styles.descricao}>{item.descricao}</Text>
              </View>

              <Text style={styles.abrir}>Ver detalhes →</Text>
            </Pressable>
          )}
        />

        <Pressable
          style={({ pressed }) => [
            styles.botao,
            pressed && styles.botaoPressed,
          ]}
          onPress={() => router.push('/cadastro')}
        >
          <Text style={styles.botaoTexto}>Fazer uma doação</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },

  containerTablet: {
    maxWidth: 760,
    alignSelf: 'center',
    width: '100%',
  },

  titulo: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 6,
  },

  subtitulo: {
    fontSize: 16,
    lineHeight: 23,
    color: '#555',
    marginBottom: 16,
  },

  lista: {
    gap: 14,
    paddingBottom: 16,
  },

  card: {
    width: '100%',
    minHeight: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    justifyContent: 'space-between',
    elevation: 2,
  },

  cardTablet: {
    padding: 22,
  },

  cardPressed: {
    opacity: 0.75,
  },

  cardContent: {
    flex: 1,
  },

  nome: {
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 8,
  },

  endereco: {
    fontSize: 15,
    lineHeight: 21,
    color: '#333',
    marginBottom: 6,
  },

  descricao: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },

  abrir: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 12,
  },

  botao: {
    minHeight: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
    backgroundColor: '#222',
  },

  botaoPressed: {
    opacity: 0.75,
  },

  botaoTexto: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});