## Documentação da Aplicação
### Visão Geral

Esta aplicação backend foi desenvolvida utilizando Node.js e TypeScript, com o objetivo de processar e armazenar dados de uma planilha com 100 mil linhas em um banco de dados PostgreSQL, além de disponibilizar uma API avançada para acesso a esses dados. A aplicação utiliza NestJS como framework, que ajuda na organização do código e fornece ferramentas poderosas para construção de APIs robustas.

---

### Funcionalidades

**Upload** de Arquivo: Endpoint para upload de arquivos CSV, que inicia o processamento assíncrono dos dados.
**Processamento Assíncrono**: Utilização de filas com RabbitMQ para processamento dos dados sem bloquear a thread principal.
**API de Dados**: Endpoints para listar, filtrar, ordenar e buscar dados armazenados, com suporte a paginação eficiente e filtros avançados.
**Feedback de Status**: Endpoint para verificar o status do processamento do arquivo.

---

### Tecnologias Utilizadas

**NestJS**: Framework de Node.js para construção de aplicações server-side.
**TypeScript**: Superset de JavaScript que adiciona tipagem estática.
**PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.
**RabbitMQ**: Broker de mensagens para processamento assíncrono.
**Redis**: Armazenamento de estrutura de dados em memória, usado para caching.
**Prisma**: ORM para interação com o banco de dados.
**Swagger**: Ferramenta para documentação de APIs.

---

### Estrutura do Projeto

O projeto está organizado em módulos, cada um responsável por uma parte específica da aplicação:

**Uploads Module**: Gerencia o upload e o processamento inicial dos arquivos.
**Users Module**: Responsável pela manipulação dos dados dos usuários e pela exposição dos endpoints da API.
**Status Module**: Fornece informações sobre o status do processamento dos uploads.
**Fileprocess Module**: Processa os dados do arquivo CSV em lote.
**Redis Module**: Configura e fornece acesso ao serviço Redis.
**RabbitMQ Module**: Configura e gerencia a conexão com o RabbitMQ.

___

### Instruções de Instalação e Execução
### Pré-requisitos

- Node.js instalado (versão 20 ou superior).
- Docker e Docker Compose para rodar os serviços de PostgreSQL, RabbitMQ e Redis.

### Clonando o Repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### Instalando Dependências

```bash
# Usando yarn
yarn install

# Usando pnpm
pnpm install

#Usando npm
npm install
```

### Configurando Variáveis de Ambiente
Copie o arquivo .env.example para .env e ajuste as variáveis conforme necessário.

```bash
# URL de conexão com o banco de dados postgres
DATABASE_URL="postgresql://docker:docker@localhost:5432/process-file?schema=public"

# URL de conexão com o serviço de mensageria rabbitmq
RABBITMQ_URI='amqp://admin:admin@localhost:5672'

# URL de conexão com o banco de dados redis
REDIS_HOST='localhost'
REDIS_PORT=6379
REDIS_USERNAME=''
REDIS_PASSWORD=''

# variável para gerar ou não o diagrama do banco de dados automáticamente
DISABLE_ERD=falses
```

### Iniciando os Serviços com Docker

```bash 
docker-compose up -d
```

### Executando a Aplicação Localmente

```bash
# Usnado npm
npm run start:dev

#Usando pnpm
pnpm run start:dev

#Usando yarn
yarn start:dev
```
---

### Deploy na Vercel
Para realizar o deploy na Vercel, siga os passos abaixo:

1. Crie uma conta na Vercel.
2. Instale a CLI da Vercel com npm i -g vercel.
3. Na raiz do projeto, execute vercel.
4. Siga as instruções na tela para configurar seu usuário localmente.
5. Configure as variáveis de ambiente na plataforma da Vercel:
   - Acesse as configurações do projeto
   - Vá na seção "Environment Variables" 
   - Adicione todas as variáveis do arquivo .env

6. Conecte seu repositório GitHub:
   - Na dashboard da Vercel, clique em "Import Project"
   - Escolha "Import Git Repository"
   - Selecione o repositório do projeto
   - Clique em "Deploy"

7. Configurações adicionais:
   - Na aba "Settings" do projeto na Vercel
   - Configure o "Build Command" para: npm run build && npm run start:prod
   - Configure o "Output Directory" para: dist
   - Configure o "Install Command" para: npm install && npx prisma db push

8. Banco de dados e serviços:
   - Configure um banco PostgreSQL (ex: Supabase, Railway)
   - Configure um Redis (ex: Upstash, Redis Labs)
   - Configure um RabbitMQ (ex: CloudAMQP)
   - Atualize as variáveis de ambiente com as novas URLs

9. Verifique o deploy:
   - Monitore o processo de build e deploy
   - Teste a aplicação no domínio fornecido pela Vercel
   - Verifique os logs caso ocorra algum erro

10. Domínio personalizado (opcional):
    - Na seção "Domains" das configurações
    - Adicione seu domínio personalizado
    - Siga as instruções para configurar os registros DNS

---

## Documentação da API com Swagger
A documentação da API está disponível em `/docs` quando a aplicação está rodando. Esta documentação permite interagir com a API diretamente pelo navegador, facilitando testes e integrações.

### Rotas Disponíveis na API

#### 1. Upload de Arquivo
- **POST** `/upload`
  - Realiza o upload de um arquivo CSV para processamento
  - Retorna um ID de processamento para acompanhamento
  - Aceita arquivos até 100MB
  - Formato: multipart/form-data

#### 2. Status do Processamento  
- **GET** `/status/:uploadId`
  - Retorna o status atual do processamento de um arquivo
  - Estados possíveis: "em andamento", "concluído", "erro"
  - Inclui porcentagem de progresso e mensagens de erro se houver

#### 3. Consulta de Dados
- **GET** `/users`
  - Lista os registros de forma paginada cpm base no uploadId enviado
  - Parâmetros de query:
    - `page`: Número da página (default: 1)
    - `limit`: Registros por página (default: 10)
    - `sort`: Campo e direção da ordenação (ex: name:asc)
    - `filters`: Filtros aplicados (ex: city=São Paulo)

#### 4. Filtros Avançados
- **GET** `/records/filter`
  - Permite busca avançada com múltiplos critérios
  - Suporta filtros por:
    - GivenName
    - City
    - TropicalZodiac
    - Occupation
    - Vehicle
    - CountryFull
    - Permite combinação de filtros usando operadores AND/OR


---

### Regras de Negócio Aplicadas no Sistema

**1. Upload e Processamento de Arquivos**

- **Validação de Formato**: O sistema aceita apenas arquivos no formato CSV para garantir a compatibilidade com o processamento implementado.

- **Tamanho do Arquivo**: O tamanho máximo do arquivo é limitado para evitar sobrecarga no processamento e na memória do servidor.

- **Processamento Assíncrono**: Após o upload, o arquivo é processado de forma assíncrona utilizando filas no RabbitMQ, permitindo que a API responda rapidamente ao usuário e processe o arquivo em background.

**2. Armazenamento de Dados**

- **Normalização de Dados**: Os dados são normalizados antes de serem armazenados no banco de dados PostgreSQL para manter a consistência e facilitar consultas.

- **Indexação**: Campos frequentemente consultados são indexados para melhorar a performance das buscas.

- **Relacionamento de Dados**: Os dados são relacionados através de chaves estrangeiras, garantindo integridade referencial.

**3. Acesso aos Dados**

- **Paginação**: As consultas de listagem de dados suportam paginação para controlar o volume de dados transmitidos e melhorar a performance das respostas.

- **Filtros Dinâmicos**: Os usuários podem aplicar filtros dinâmicos nas consultas, permitindo uma busca mais precisa e personalizada.

- **Caching**: Dados frequentemente acessados são armazenados em cache no Redis para reduzir o tempo de resposta e diminuir a carga no banco de dados.

**4. Segurança**

- **Autenticação e Autorização**: O sistema deve implementar mecanismos de autenticação e autorização para proteger endpoints sensíveis e garantir que apenas usuários autorizados possam acessar certas funcionalidades.

- **Validação de Entradas**: Todas as entradas do usuário são validadas para evitar ataques comuns, como SQL Injection e Cross-Site Scripting (XSS).

**5. Monitoramento e Logs**

- **Logs de Atividades**: Todas as ações críticas são logadas para permitir auditorias e facilitar a detecção de problemas.

- **Monitoramento de Performance**: O sistema utiliza ferramentas de monitoramento para acompanhar a saúde da aplicação e identificar gargalos de performance.

**6. Tratamento de Erros**

- **Respostas Padronizadas**: O sistema responde com mensagens de erro claras e padronizadas quando ocorrem falhas, facilitando o entendimento dos problemas pelos usuários.

- **Recovery de Falhas**: Implementação de mecanismos de retry e fallback para operações críticas, garantindo a resiliência do sistema.

**7. Documentação**

- **Documentação da API**: A API é documentada utilizando Swagger, oferecendo uma descrição clara de seus endpoints, parâmetros e respostas esperadas.



### Melhorias

- **Estruturação**: Aplicar um designer patter de estruturação de pastas.

- **Testes Automátizados**: Criar testes automátizados unitários, e2e ou integração.