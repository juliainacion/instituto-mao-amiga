import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_FAVORITOS = '@instituto-mao-amiga:favoritos';

export const favoritosService = {
  async listar(): Promise<string[]> {
    const dados = await AsyncStorage.getItem(CHAVE_FAVORITOS);
    return dados ? JSON.parse(dados) as string[] : [];
  },

  async adicionar(id: string): Promise<void> {
    const favoritos = await this.listar();
    if (!favoritos.includes(id)) {
      favoritos.push(id);
      await AsyncStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(favoritos));
    }
  },

  async remover(id: string): Promise<void> {
    const favoritos = (await this.listar()).filter((item) => item !== id);
    await AsyncStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(favoritos));
  },

  async alternar(id: string): Promise<boolean> {
    const favoritos = await this.listar();
    if (favoritos.includes(id)) {
      await this.remover(id);
      return false;
    }
    await this.adicionar(id);
    return true;
  },

  async verificar(id: string): Promise<boolean> {
    const favoritos = await this.listar();
    return favoritos.includes(id);
  },
};
