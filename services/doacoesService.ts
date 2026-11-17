import { apiFetch } from './api';
import type { Pagina } from './pontosService';

export interface Doacao {
  id: string;
  tipoItem: string;
  quantidade: number;
  pontoDestino: string;
  criadoEm: string;
}

export interface DoacaoInput {
  tipoItem: string;
  quantidade: number;
  pontoDestino: string;
}

export const doacoesService = {
  listar: (page = 0, size = 10) =>
    apiFetch<Pagina<Doacao>>(
      `/doacoes/filtro?page=${page}&size=${size}&sort=criadoEm,desc`
    ),

  pesquisar: (filtro: string, page = 0, size = 10) =>
    apiFetch<Pagina<Doacao>>(
      `/doacoes/filtro?filtro=${encodeURIComponent(filtro)}&page=${page}&size=${size}`
    ),

  buscarPorId: (id: string) =>
    apiFetch<Doacao>(`/doacoes/${id}`),

  cadastrar: (dados: DoacaoInput) =>
    apiFetch<Doacao>('/doacoes', {
      method: 'POST',
      body: JSON.stringify(dados),
    }),

  atualizar: (id: string, dados: DoacaoInput) =>
    apiFetch<Doacao>(`/doacoes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dados),
    }),

  excluir: (id: string) =>
    apiFetch<void>(`/doacoes/${id}`, { method: 'DELETE' }),
};
