import { useEffect, useState } from 'react';
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
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doacoesService, type Doacao } from '../services/doacoesService';

export default function DetalhesDoacao() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [doacao, setDoacao] = useState<Doacao | null>(null);
  const [tipoItem, setTipoItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [pontoDestino, setPontoDestino] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [editando, setEditando] = useState(false);
  const [salvando, setSalvando] = useState(false);

  async function carregarDoacao() {
    try {
      setCarregando(true);
      const resultado = await doacoesService.buscarPorId(id);
      setDoacao(resultado);
      setTipoItem(resultado.tipoItem);
      setQuantidade(String(resultado.quantidade));
      setPontoDestino(resultado.pontoDestino);
    } catch {
      Alert.alert('Erro', 'Não foi possível encontrar esta doação.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDoacao();
  }, [id]);

  async function salvarAlteracoes() {
    const quantidadeNumerica = Number(quantidade);

    if (!tipoItem.trim() || !pontoDestino.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    if (!Number.isInteger(quantidadeNumerica) || quantidadeNumerica <= 0) {
      Alert.alert('Atenção', 'Informe uma quantidade inteira maior que zero.');
      return;
    }

    try {
      setSalvando(true);
      await doacoesService.atualizar(id, {
        tipoItem: tipoItem.trim(),
        quantidade: quantidadeNumerica,
        pontoDestino: pontoDestino.trim(),
      });
      Alert.alert('Sucesso', 'Doação atualizada!');
      setEditando(false);
      await carregarDoacao();
    } catch (erro) {
      Alert.alert('Erro', erro instanceof Error ? erro.message : 'Falha ao atualizar.');
    } finally {
      setSalvando(false);
    }
  }

  function confirmarExclusao() {
    Alert.alert(
      'Excluir doação',
      'Tem certeza de que deseja excluir este registro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await doacoesService.excluir(id);
              Alert.alert('Sucesso', 'Doação excluída.');
              router.back();
            } catch (erro) {
              Alert.alert('Erro', erro instanceof Error ? erro.message : 'Falha ao excluir.');
            }
          },
        },
      ],
    );
  }

  if (carregando) {
    return <View style={styles.centro}><ActivityIndicator size="large" color="#1769AA" /></View>;
  }

  if (!doacao) {
    return <View style={styles.centro}><Text>Doação não encontrada.</Text></View>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Detalhes da doação</Text>

      <Text style={styles.label}>Item doado</Text>
      {editando ? (
        <TextInput style={styles.input} value={tipoItem} onChangeText={setTipoItem} />
      ) : (
        <Text style={styles.valor}>{doacao.tipoItem}</Text>
      )}

      <Text style={styles.label}>Quantidade</Text>
      {editando ? (
        <TextInput
          style={styles.input}
          value={quantidade}
          onChangeText={setQuantidade}
          keyboardType="number-pad"
        />
      ) : (
        <Text style={styles.valor}>{doacao.quantidade}</Text>
      )}

      <Text style={styles.label}>Ponto de destino</Text>
      {editando ? (
        <TextInput style={styles.input} value={pontoDestino} onChangeText={setPontoDestino} />
      ) : (
        <Text style={styles.valor}>{doacao.pontoDestino}</Text>
      )}

      <Text style={styles.label}>Data do registro</Text>
      <Text style={styles.valor}>
        {new Date(doacao.criadoEm).toLocaleString('pt-BR')}
      </Text>

      {editando ? (
        <>
          <Pressable style={styles.botao} onPress={salvarAlteracoes} disabled={salvando}>
            <Text style={styles.textoBotao}>{salvando ? 'Salvando...' : 'Salvar alterações'}</Text>
          </Pressable>
          <Pressable style={styles.botaoSecundario} onPress={() => setEditando(false)}>
            <Text style={styles.textoSecundario}>Cancelar</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Pressable style={styles.botao} onPress={() => setEditando(true)}>
            <Text style={styles.textoBotao}>Editar doação</Text>
          </Pressable>
          <Pressable style={styles.botaoExcluir} onPress={confirmarExclusao}>
            <Text style={styles.textoBotao}>Excluir doação</Text>
          </Pressable>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 22, backgroundColor: '#F5F7FA' },
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#17324D', marginBottom: 25 },
  label: { fontSize: 15, fontWeight: 'bold', color: '#64748B', marginTop: 17 },
  valor: { fontSize: 17, color: '#17324D', marginTop: 7 },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 9, padding: 13, marginTop: 7 },
  botao: { backgroundColor: '#1769AA', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 28 },
  textoBotao: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
  botaoSecundario: { padding: 15, alignItems: 'center' },
  textoSecundario: { color: '#1769AA', fontWeight: 'bold' },
  botaoExcluir: { backgroundColor: '#B91C1C', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 12 },
});
