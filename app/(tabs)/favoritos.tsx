import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { favoritosService } from '../../services/favoritosService';
import { pontosService, type Ponto } from '../../services/pontosService';

export default function FavoritosScreen() {
  const router = useRouter();
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const carregar = useCallback(async () => {
    try {
      setCarregando(true);
      setErro('');
      const ids = await favoritosService.listar();
      const resultados = await Promise.all(
        ids.map(async (id) => {
          try {
            return await pontosService.buscarPorId(id);
          } catch {
            await favoritosService.remover(id);
            return null;
          }
        }),
      );
      setPontos(resultados.filter((ponto): ponto is Ponto => ponto !== null));
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Não foi possível carregar os favoritos.');
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(useCallback(() => {
    carregar();
  }, [carregar]));

  if (carregando) {
    return <View style={styles.centro}><ActivityIndicator size="large" color="#1769AA" /></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meus pontos favoritos</Text>
      <Text style={styles.subtitulo}>Seus pontos salvos neste dispositivo.</Text>
      {erro ? <Text style={styles.erro}>{erro}</Text> : null}
      <FlatList
        data={pontos}
        keyExtractor={(item) => item.id}
        onRefresh={carregar}
        refreshing={carregando}
        ListEmptyComponent={<Text style={styles.vazio}>Você ainda não adicionou pontos aos favoritos.</Text>}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => router.push({ pathname: '/modal', params: { id: item.id } })}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.detalhe}>{item.bairro} · {item.endereco}</Text>
            <Text style={styles.abrir}>Ver detalhes →</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA', padding: 18 },
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 25, fontWeight: 'bold', color: '#17324D', marginTop: 12 },
  subtitulo: { color: '#64748B', marginTop: 6, marginBottom: 18 },
  card: { backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  nome: { fontSize: 17, fontWeight: 'bold', color: '#17324D' },
  detalhe: { fontSize: 14, color: '#475569', marginTop: 6 },
  abrir: { color: '#1769AA', fontWeight: 'bold', marginTop: 10 },
  vazio: { textAlign: 'center', color: '#64748B', marginTop: 35 },
  erro: { color: '#B91C1C', marginBottom: 12 },
});
