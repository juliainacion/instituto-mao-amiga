# API — Instituto Mão Amiga

## Requisitos
- Java 17 ou superior
- Maven 3.9+

## Executar
Na pasta `api/`:

```bash
mvn spring-boot:run
```

A API inicia em `http://localhost:8080`.
Swagger: `http://localhost:8080/swagger-ui.html`  
H2 Console: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:file:./data/instituto_mao_amiga`, usuário `sa`, senha vazia).

## Pontos
- `GET /api/v1/pontos`
- `GET /api/v1/pontos/{id}`
- `POST /api/v1/pontos`
- `PUT /api/v1/pontos/{id}`
- `DELETE /api/v1/pontos/{id}`
- `GET /api/v1/pontos/filtro?filtro=Bueno&page=0&size=10`
- Segunda página: `GET /api/v1/pontos/filtro?page=1&size=10`
- Ordenar por bairro: `GET /api/v1/pontos/filtro?sort=bairro,asc`

Exemplo de JSON para POST/PUT:

```json
{"nome":"Ponto Solidário","endereco":"Rua 1, Goiânia","bairro":"Centro","horario":"Seg a Sex, 8h às 17h","tipo":"coleta"}
```

## Doações
- `GET /api/v1/doacoes/filtro?filtro=alimento&page=0&size=10`
- `GET /api/v1/doacoes/{id}`
- `POST /api/v1/doacoes`
- `PUT /api/v1/doacoes/{id}`
- `DELETE /api/v1/doacoes/{id}`

Exemplo de JSON:

```json
{"tipoItem":"Alimentos não perecíveis","quantidade":5,"pontoDestino":"Ponto Central - Setor Bueno"}
```

`criadoEm` é gerado no servidor no cadastro e preservado na edição.

## Observações
A carga inicial cria 25 registros de demonstração apenas quando a tabela de pontos está vazia. Os nomes e endereços são dados ilustrativos para fins acadêmicos e devem ser confirmados antes de uso real.

As evidências de execução e prints reais do Swagger devem ser capturados após iniciar a API no computador de desenvolvimento; não foram simulados neste README.
