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
import { pontosService, type Ponto } from '../services/pontosService';
import { doacoesService } from '../services/doacoesService';

export default function CadastroDoacao() {
  const router = useRouter();
  const { pontoId } = useLocalSearchParams<{ pontoId?: string }>();

  const [tipoItem, setTipoItem] = useState('');
  const [quantidade, setQuantidade] = useState('1');
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [pontoSelecionado, setPontoSelecionado] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    async function carregarPontos() {
      try {
        const pagina = await pontosService.listar(0, 100);
        setPontos(pagina.content);

        if (pontoId) {
          const encontrado = pagina.content.find((ponto) => ponto.id === pontoId);
          if (encontrado) setPontoSelecionado(encontrado.id);
        }
      } catch {
        Alert.alert('Erro', 'Não foi possível carregar os pontos de coleta.');
      } finally {
        setCarregando(false);
      }
    }

    carregarPontos();
  }, [pontoId]);

  async function cadastrarDoacao() {
    const quantidadeNumerica = Number(quantidade);
    const ponto = pontos.find((item) => item.id === pontoSelecionado);

    if (!tipoItem.trim()) {
      Alert.alert('Atenção', 'Informe o item que deseja doar.');
      return;
    }

    if (!Number.isInteger(quantidadeNumerica) || quantidadeNumerica <= 0) {
      Alert.alert('Atenção', 'Informe uma quantidade inteira maior que zero.');
      return;
    }

    if (!ponto) {
      Alert.alert('Atenção', 'Selecione um ponto de destino.');
      return;
    }

    try {
      setSalvando(true);
      await doacoesService.cadastrar({
        tipoItem: tipoItem.trim(),
        quantidade: quantidadeNumerica,
        pontoDestino: ponto.nome,
      });

      Alert.alert('Sucesso', 'Doação cadastrada!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (erro) {
      Alert.alert(
        'Erro ao cadastrar',
        erro instanceof Error ? erro.message : 'Não foi possível registrar a doação.',
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Registrar doação</Text>
      <Text style={styles.subtitulo}>
        Preencha os dados e escolha onde sua doação será entregue.
      </Text>

      <Text style={styles.label}>O que você deseja doar?</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: Alimentos não perecíveis"
        value={tipoItem}
        onChangeText={setTipoItem}
      />

      <Text style={styles.label}>Quantidade</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a quantidade"
        keyboardType="number-pad"
        value={quantidade}
        onChangeText={setQuantidade}
      />

      <Text style={styles.label}>Ponto de destino</Text>

      {carregando ? (
        <ActivityIndicator size="large" color="#1769AA" />
      ) : pontos.length === 0 ? (
        <Text style={styles.aviso}>Nenhum ponto de coleta encontrado.</Text>
      ) : (
        pontos.map((ponto) => (
          <Pressable
            key={ponto.id}
            style={[
              styles.opcao,
              pontoSelecionado === ponto.id && styles.opcaoSelecionada,
            ]}
            onPress={() => setPontoSelecionado(ponto.id)}
          >
            <Text style={styles.nomePonto}>{ponto.nome}</Text>
            <Text style={styles.endereco}>{ponto.bairro} · {ponto.endereco}</Text>
            {pontoSelecionado === ponto.id && (
              <Text style={styles.selecionado}>Selecionado</Text>
            )}
          </Pressable>
        ))
      )}

      <Pressable
        style={[styles.botao, salvando && styles.botaoDesabilitado]}
        onPress={cadastrarDoacao}
        disabled={salvando || carregando}
      >
        <Text style={styles.textoBotao}>
          {salvando ? 'Salvando...' : 'Cadastrar doação'}
        </Text>
      </Pressable>

      <Pressable style={styles.botaoVoltar} onPress={() => router.back()}>
        <Text style={styles.textoVoltar}>Voltar</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 22,
    backgroundColor: '#F5F7FA',
  },
  titulo: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#17324D',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 15,
    color: '#64748B',
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#243B53',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
  },
  opcao: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  opcaoSelecionada: {
    borderColor: '#1769AA',
    borderWidth: 2,
    backgroundColor: '#EAF4FF',
  },
  nomePonto: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#17324D',
  },
  endereco: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
  },
  selecionado: {
    color: '#1769AA',
    fontWeight: 'bold',
    marginTop: 6,
  },
  aviso: {
    color: '#64748B',
    padding: 12,
  },
  botao: {
    backgroundColor: '#1769AA',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
  },
  botaoDesabilitado: {
    opacity: 0.6,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoVoltar: {
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  textoVoltar: {
    color: '#1769AA',
    fontWeight: '600',
  },
});
