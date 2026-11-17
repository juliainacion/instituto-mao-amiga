import { apiFetch } from './api';

export interface Ponto {
  id: string;
  nome: string;
  endereco: string;
  bairro: string;
  horario: string;
  tipo: string;
}

export interface Pagina<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  last: boolean;
}

export type PontoInput = Omit<Ponto, 'id'>;

export const pontosService = {
  listar: (page = 0, size = 10) =>
    apiFetch<Pagina<Ponto>>(`/pontos?page=${page}&size=${size}&sort=nome,asc`),

  pesquisar: (filtro: string, page = 0, size = 10) =>
    apiFetch<Pagina<Ponto>>(
      `/pontos/filtro?filtro=${encodeURIComponent(filtro)}&page=${page}&size=${size}`
    ),

  buscarPorId: (id: string) =>
    apiFetch<Ponto>(`/pontos/${id}`),

  cadastrar: (dados: PontoInput) =>
    apiFetch<Ponto>('/pontos', {
      method: 'POST',
      body: JSON.stringify(dados),
    }),

  atualizar: (id: string, dados: PontoInput) =>
    apiFetch<Ponto>(`/pontos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dados),
    }),

  excluir: (id: string) =>
    apiFetch<void>(`/pontos/${id}`, { method: 'DELETE' }),
};
