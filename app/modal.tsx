import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator, Alert, Pressable, StyleSheet, Text, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { pontosService, type Ponto } from '../services/pontosService';
import { favoritosService } from '../services/favoritosService';

export default function ModalScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [ponto, setPonto] = useState<Ponto | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [favorito, setFavorito] = useState(false);

  const carregarPonto = useCallback(async () => {
    if (!id) {
      setErro('Identificador do ponto não informado.');
      setCarregando(false);
      return;
    }
    try {
      setCarregando(true);
      setErro('');
      const resultado = await pontosService.buscarPorId(String(id));
      setPonto(resultado);
      setFavorito(await favoritosService.verificar(String(id)));
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Não foi possível carregar o ponto.');
    } finally {
      setCarregando(false);
    }
  }, [id]);

  useEffect(() => {
    carregarPonto();
  }, [carregarPonto]);

  async function alternarFavorito() {
    try {
      const novoEstado = await favoritosService.alternar(String(id));
      setFavorito(novoEstado);
    } catch {
      Alert.alert('Erro', 'Não foi possível atualizar os favoritos.');
    }
  }

  function confirmarExclusao() {
    Alert.alert('Excluir ponto', 'Tem certeza de que deseja excluir este ponto de coleta?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await pontosService.excluir(String(id));
            await favoritosService.remover(String(id));
            Alert.alert('Sucesso', 'Ponto excluído.', [
              { text: 'OK', onPress: () => router.back() },
            ]);
          } catch (error) {
            Alert.alert('Erro', error instanceof Error ? error.message : 'Não foi possível excluir o ponto.');
          }
        },
      },
    ]);
  }

  if (carregando) {
    return <SafeAreaView style={styles.safeArea}><ActivityIndicator size="large" color="#1769AA" /></SafeAreaView>;
  }

  if (erro || !ponto) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.erro}>{erro || 'Ponto não encontrado.'}</Text>
          <Pressable style={styles.botao} onPress={carregarPonto}><Text style={styles.botaoTexto}>Tentar novamente</Text></Pressable>
          <Pressable style={styles.voltar} onPress={() => router.back()}><Text>Voltar</Text></Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.titulo}>{ponto.nome}</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Endereço</Text>
          <Text style={styles.texto}>{ponto.endereco}</Text>
          <Text style={styles.label}>Bairro</Text>
          <Text style={styles.texto}>{ponto.bairro}</Text>
          <Text style={styles.label}>Tipo de ponto</Text>
          <Text style={styles.texto}>{ponto.tipo}</Text>
          <Text style={styles.label}>Horário de funcionamento</Text>
          <Text style={styles.texto}>{ponto.horario}</Text>
        </View>

        <Pressable style={styles.botaoFavorito} onPress={alternarFavorito}>
          <Text style={styles.botaoFavoritoTexto}>{favorito ? '♥ Remover dos favoritos' : '♡ Adicionar aos favoritos'}</Text>
        </Pressable>

        <Pressable style={styles.botao} onPress={() => router.push({ pathname: '/cadastro', params: { pontoId: ponto.id } })}>
          <Text style={styles.botaoTexto}>Fazer uma doação</Text>
        </Pressable>
        <Pressable style={styles.botaoSecundario} onPress={() => router.push({ pathname: '/editar-ponto', params: { id: ponto.id } })}>
          <Text style={styles.botaoSecundarioTexto}>Editar ponto</Text>
        </Pressable>
        <Pressable style={styles.botaoExcluir} onPress={confirmarExclusao}>
          <Text style={styles.botaoTexto}>Excluir ponto</Text>
        </Pressable>
        <Pressable style={styles.voltar} onPress={() => router.back()}><Text style={styles.voltarTexto}>Voltar</Text></Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F7FA' },
  container: { flex: 1, width: '100%', padding: 20 },
  titulo: { fontSize: 28, fontWeight: '700', marginBottom: 20, color: '#17324D' },
  card: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, gap: 8 },
  label: { fontSize: 15, fontWeight: '700', marginTop: 8 },
  texto: { fontSize: 16, lineHeight: 24, color: '#444' },
  botaoFavorito: { minHeight: 48, borderRadius: 12, borderWidth: 1, borderColor: '#1769AA', alignItems: 'center', justifyContent: 'center', marginTop: 15 },
  botaoFavoritoTexto: { color: '#1769AA', fontWeight: '700', fontSize: 15 },
  botao: { minHeight: 52, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1769AA', marginTop: 15, paddingHorizontal: 20 },
  botaoTexto: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  botaoSecundario: { minHeight: 48, borderRadius: 14, borderWidth: 1, borderColor: '#222', alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  botaoSecundarioTexto: { color: '#222', fontSize: 16, fontWeight: '700' },
  botaoExcluir: { minHeight: 48, borderRadius: 14, backgroundColor: '#B42318', alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  erro: { color: '#B42318', fontSize: 16, marginBottom: 12 },
  voltar: { minHeight: 48, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  voltarTexto: { fontSize: 16, fontWeight: '600' },
});
