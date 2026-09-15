import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

export default function ModalScreen() {
  const params = useLocalSearchParams();

  const nome = String(params.nome || 'Instituto Mão Amiga');
  const endereco = String(params.endereco || 'Endereço não informado');
  const descricao = String(
    params.descricao || 'Ponto de coleta para recebimento de doações.'
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.titulo}>{nome}</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Endereço</Text>
          <Text style={styles.texto}>{endereco}</Text>

          <Text style={styles.label}>Sobre o ponto</Text>
          <Text style={styles.texto}>{descricao}</Text>

          <Text style={styles.label}>Horário</Text>
          <Text style={styles.texto}>Segunda a sexta, das 8h às 17h.</Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.botao,
            pressed && styles.pressed,
          ]}
          onPress={() => router.push('/cadastro')}
        >
          <Text style={styles.botaoTexto}>Fazer uma doação</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.voltar,
            pressed && styles.pressed,
          ]}
          onPress={() => router.back()}
        >
          <Text style={styles.voltarTexto}>Voltar</Text>
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
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    gap: 8,
  },

  label: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 8,
  },

  texto: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },

  botao: {
    minHeight: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222',
    marginTop: 20,
    paddingHorizontal: 20,
  },

  pressed: {
    opacity: 0.75,
  },

  botaoTexto: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },

  voltar: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  voltarTexto: {
    fontSize: 16,
    fontWeight: '600',
  },
});