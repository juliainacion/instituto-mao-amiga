import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { pontosService } from '../services/pontosService';

export default function NovoPonto() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [horario, setHorario] = useState('');
  const [tipo, setTipo] = useState('');
  const [salvando, setSalvando] = useState(false);

  async function cadastrar() {
    if (![nome, endereco, bairro, horario, tipo].every((v) => v.trim())) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    try {
      setSalvando(true);
      await pontosService.cadastrar({
        nome: nome.trim(),
        endereco: endereco.trim(),
        bairro: bairro.trim(),
        horario: horario.trim(),
        tipo: tipo.trim(),
      });
      Alert.alert('Sucesso', 'Ponto cadastrado!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert('Erro', error instanceof Error ? error.message : 'Não foi possível cadastrar o ponto.');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Cadastrar ponto de coleta</Text>
      <Text style={styles.label}>Nome do ponto</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Nome do ponto" />
      <Text style={styles.label}>Endereço</Text>
      <TextInput style={styles.input} value={endereco} onChangeText={setEndereco} placeholder="Rua, número" />
      <Text style={styles.label}>Bairro</Text>
      <TextInput style={styles.input} value={bairro} onChangeText={setBairro} placeholder="Bairro" />
      <Text style={styles.label}>Horário de funcionamento</Text>
      <TextInput style={styles.input} value={horario} onChangeText={setHorario} placeholder="Ex.: Segunda a sexta, 8h às 17h" />
      <Text style={styles.label}>Tipo de ponto</Text>
      <TextInput style={styles.input} value={tipo} onChangeText={setTipo} placeholder="Ex.: Alimentos, roupas" />
      <Pressable style={styles.botao} onPress={cadastrar} disabled={salvando}>
        <Text style={styles.textoBotao}>{salvando ? 'Salvando...' : 'Cadastrar ponto'}</Text>
      </Pressable>
      <Pressable style={styles.voltar} onPress={() => router.back()}>
        <Text style={styles.textoVoltar}>Cancelar</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 22, backgroundColor: '#F5F7FA' },
  titulo: { fontSize: 25, fontWeight: 'bold', color: '#17324D', marginBottom: 20 },
  label: { fontSize: 15, fontWeight: '600', color: '#243B53', marginTop: 13, marginBottom: 7 },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 10, padding: 13, fontSize: 15 },
  botao: { backgroundColor: '#1769AA', padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 25 },
  textoBotao: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  voltar: { padding: 14, alignItems: 'center' },
  textoVoltar: { color: '#1769AA', fontWeight: '600' },
});
