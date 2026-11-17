import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { pontosService, type PontoInput } from '../services/pontosService';

export default function EditarPontoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [dados, setDados] = useState<PontoInput>({
    nome: '',
    endereco: '',
    bairro: '',
    horario: '',
    tipo: '',
  });
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    async function carregar() {
      try {
        const ponto = await pontosService.buscarPorId(String(id));
        setDados({
          nome: ponto.nome,
          endereco: ponto.endereco,
          bairro: ponto.bairro,
          horario: ponto.horario,
          tipo: ponto.tipo,
        });
      } catch (error) {
        Alert.alert(
          'Erro',
          error instanceof Error ? error.message : 'Não foi possível carregar o ponto.'
        );
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, [id]);

  const alterarCampo = (campo: keyof PontoInput, valor: string) => {
    setDados(atual => ({ ...atual, [campo]: valor }));
  };

  const salvar = async () => {
    if (
      !dados.nome.trim() ||
      !dados.endereco.trim() ||
      !dados.bairro.trim() ||
      !dados.horario.trim() ||
      !dados.tipo.trim()
    ) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    try {
      setSalvando(true);
      await pontosService.atualizar(String(id), dados);
      Alert.alert('Sucesso', 'Ponto atualizado com sucesso.', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert(
        'Erro',
        error instanceof Error ? error.message : 'Não foi possível atualizar o ponto.'
      );
    } finally {
      setSalvando(false);
    }
  };

  if (carregando) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color="#222" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Editar ponto de coleta</Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={dados.nome}
          onChangeText={valor => alterarCampo('nome', valor)}
          placeholder="Nome do ponto"
        />

        <Text style={styles.label}>Endereço</Text>
        <TextInput
          style={styles.input}
          value={dados.endereco}
          onChangeText={valor => alterarCampo('endereco', valor)}
          placeholder="Endereço completo"
        />

        <Text style={styles.label}>Bairro</Text>
        <TextInput
          style={styles.input}
          value={dados.bairro}
          onChangeText={valor => alterarCampo('bairro', valor)}
          placeholder="Bairro"
        />

        <Text style={styles.label}>Horário</Text>
        <TextInput
          style={styles.input}
          value={dados.horario}
          onChangeText={valor => alterarCampo('horario', valor)}
          placeholder="Ex.: Segunda a sexta, 8h às 17h"
        />

        <Text style={styles.label}>Tipo</Text>
        <TextInput
          style={styles.input}
          value={dados.tipo}
          onChangeText={valor => alterarCampo('tipo', valor)}
          placeholder="Tipo de ponto"
        />

        <Pressable
          style={[styles.botao, salvando && styles.desabilitado]}
          onPress={salvar}
          disabled={salvando}
        >
          <Text style={styles.botaoTexto}>
            {salvando ? 'Salvando...' : 'Salvar alterações'}
          </Text>
        </Pressable>

        <Pressable style={styles.voltar} onPress={() => router.back()}>
          <Text style={styles.voltarTexto}>Cancelar</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  container: {
    padding: 20,
    flexGrow: 1,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 22,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    minHeight: 48,
    paddingHorizontal: 14,
    fontSize: 15,
  },
  botao: {
    backgroundColor: '#222',
    minHeight: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  desabilitado: {
    opacity: 0.6,
  },
  botaoTexto: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  voltar: {
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  voltarTexto: {
    fontSize: 16,
    fontWeight: '600',
  },
});
