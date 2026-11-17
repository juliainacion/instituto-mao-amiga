import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { pontosService, type Ponto } from '../../services/pontosService';

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const tablet = width >= 600;

  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [filtro, setFiltro] = useState('');
  const [pagina, setPagina] = useState(0);
  const [ultimaPagina, setUltimaPagina] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const carregarPontos = useCallback(async (
    numeroPagina = 0,
    novoFiltro = filtro,
    substituir = false
  ) => {
    if (carregando) return;

    try {
      setCarregando(true);
      setErro('');

      const resultado = novoFiltro.trim()
        ? await pontosService.pesquisar(novoFiltro.trim(), numeroPagina, 10)
        : await pontosService.listar(numeroPagina, 10);

      setPontos(atual =>
        substituir ? resultado.content : [...atual, ...resultado.content]
      );

      setPagina(resultado.number);
      setUltimaPagina(resultado.last);
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Não foi possível carregar os pontos.');
    } finally {
      setCarregando(false);
    }
  }, [filtro, carregando]);

  useEffect(() => {
    carregarPontos(0, filtro, true);
  }, [filtro]);

  const pesquisar = (texto: string) => {
    setFiltro(texto);
  };

  const carregarMais = () => {
    if (!carregando && !ultimaPagina) {
      carregarPontos(pagina + 1, filtro);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={[styles.container, tablet && styles.containerTablet]}>
        <Text style={styles.titulo}>Instituto Mão Amiga</Text>

        <Text style={styles.subtitulo}>
          Encontre um ponto de coleta próximo de você
        </Text>

        <TextInput
          style={styles.pesquisa}
          placeholder="Pesquisar por nome ou bairro..."
          value={filtro}
          onChangeText={pesquisar}
          autoCapitalize="none"
        />

        {erro ? (
          <View style={styles.erroContainer}>
            <Text style={styles.erro}>{erro}</Text>
            <Pressable onPress={() => carregarPontos(0, filtro, true)}>
              <Text style={styles.tentarNovamente}>Tentar novamente</Text>
            </Pressable>
          </View>
        ) : null}

        <FlatList
          data={pontos}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.lista}
          showsVerticalScrollIndicator={false}
          onEndReached={carregarMais}
          onEndReachedThreshold={0.4}
          ListEmptyComponent={
            carregando ? null : (
              <Text style={styles.vazio}>Nenhum ponto encontrado.</Text>
            )
          }
          ListFooterComponent={
            carregando ? <ActivityIndicator size="large" color="#222" /> : null
          }
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
                  params: { id: item.id },
                })
              }
            >
              <View style={styles.cardContent}>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.endereco}>{item.endereco}</Text>
                <Text style={styles.descricao}>
                  {item.bairro} • {item.tipo}
                </Text>
                <Text style={styles.descricao}>
                  Horário: {item.horario}
                </Text>
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
          onPress={() => router.push('/novo-ponto')}
        >
          <Text style={styles.botaoTexto}>Cadastrar novo ponto</Text>
        </Pressable>

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
  pesquisa: {
    height: 48,
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 14,
    marginBottom: 16,
    fontSize: 15,
  },
  lista: {
    gap: 14,
    paddingBottom: 16,
    flexGrow: 1,
  },
  card: {
    width: '100%',
    minHeight: 150,
    backgroundColor: '#FFF',
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
    marginBottom: 4,
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
  erroContainer: {
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#FDECEC',
    borderRadius: 10,
  },
  erro: {
    color: '#A00000',
    marginBottom: 8,
  },
  tentarNovamente: {
    color: '#222',
    fontWeight: '700',
  },
  vazio: {
    textAlign: 'center',
    color: '#666',
    marginTop: 24,
  },
});

