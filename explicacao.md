## Documentação da aplicação
### Visão Geral

Esta aplicação backend foi desenvolvida utilizando Node.js e TypeScript, com o objetivo de processar e armazenar dados de uma planilha com 100 mil linhas em um banco de dados PostgreSQL, além de disponibilizar uma API avançada para acesso a esses dados. A aplicação utiliza NestJS como framework, que ajuda na organização do código e fornece ferramentas poderosas para construção de APIs robustas.

---

### Funcionalidades

**Upload de Arquivo**: Endpoint para upload de arquivos CSV, que inicia o processamento assíncrono dos dados.
**Processamento Assíncrono**: Utilização de filas com RabbitMQ para processamento dos dados sem bloquear a thread principal.
**API de Dados**: Endpoints para listar, filtrar, ordenar e buscar dados armazenados, com suporte a paginação eficiente e filtros avançados.
**Feedback de Status**: Endpoint para verificar o status do processamento do arquivo.
**Listagem de Upload**: Endpoint para listar todos os uploads realizados.

---

### Tecnologias Utilizadas

**NestJS**: Framework de Node.js para construção de aplicações server-side.
**TypeScript**: Superset de JavaScript que adiciona tipagem estática.
**PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.
**RabbitMQ**: Broker de mensagens para processamento assíncrono.
**Redis**: Armazenamento de estrutura de dados em memória, usado para caching.
**Prisma**: ORM para interação com o banco de dados.
**Swagger**: Ferramenta para documentação de APIs.
**Zod**: Ferramenta de validação.

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
git clone https://github.com/GabrielBorges2000/processfile.git
cd processfile
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
# Variável para informar o ambiente que está rodando a aplicação
NODE_ENV='development'

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
DISABLE_ERD=true
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
3. Abra o terminal e execute `vercel login`
4. Siga as instruções na tela para configurar seu usuário localmente.





5. Conecte seu repositório GitHub:
   - Suba seu projeto para um repositório no Github
   - Na dashboard da Vercel, clique em "Import Project"
   - Escolha "Import Git Repository"
   - Selecione o repositório do projeto
   - Clique em "Deploy"

6. Configurações adicionais:
   - Na aba "Settings" do projeto na Vercel
   - Configure o "Build Command" para: npm run build && npm run start:prod
   - Configure o "Install Command" para: npm install && npx prisma db push

7. Banco de dados e serviços:
   - Configure um banco PostgreSQL (ex: Supabase, Railway)
   - Configure um Redis (ex: Upstash, Redis Labs)
   - Configure um RabbitMQ (ex: CloudAMQP)
   - Atualize as variáveis de ambiente com as novas URLs

8. Verifique o deploy:
   - Monitore o processo de build e deploy
   - Teste a aplicação no domínio fornecido pela Vercel
   - Verifique os logs caso ocorra algum erro

9. Domínio personalizado (opcional):
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
  - Inclui mensagem informando como se encontra o upload

#### 2. Status do Processamento  
- **GET** `/status`
  - Retorna uma lista com o status atual do processamento de todos os upload de arquivo
  - Estados possíveis: "em andamento", "concluído", "erro"
  - Inclui mensagem informando como se encontra o upload

- **GET** `/status/:uploadId`
  - Retorna o status atual do processamento de um arquivo
  - Estados possíveis: "em andamento", "concluído", "erro"
  - Inclui mensagem informando como se encontra o upload

#### 3. Consulta de Dados
- **GET** `/users/:uploadId`
  - Lista os registros de forma paginada cpm base no uploadId enviado
  - Parâmetros de query:
    - `page`: Número da página (default: 1)
    - `limit`: Registros por página (default: 10)
    - `sort`: Campo e direção da ordenação (ex: name:asc)
    - `filters`: Filtros aplicados (ex: city=São Paulo)

#### 4. Filtros Avançados
- **GET** `/users/:uploadId?filter`
  - Permite busca avançada com múltiplos critérios
  - Suporta filtros por:
    - GivenName
    - City
    - TropicalZodiac
    - Occupation
    - Vehicle
    - CountryFull
    - Permite combinação de filtros usando mais de um campo para uma busca mais refinada

Exemplo:
```bash
curl -X GET "http://localhost:3333/users/1a089b30-8a75-4eb1-a3ab-3c23c22d5903?City=Sechelt&GivenName=Eduarda"
```

No exemplo acima está um exemplo de como realizar a busca pelos campos mencionados.



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



- **Validação de Entradas**: Todas as entradas do usuário são validadas para evitar ataques comuns, como SQL Injection e Cross-Site Scripting (XSS).

**5. Tratamento de Erros e Logs**

- **Logs de Atividades**: Todas as ações críticas são logadas para permitir auditorias e facilitar a detecção de problemas.

- **Respostas Padronizadas**: O sistema responde com mensagens de erro claras e padronizadas quando ocorrem falhas, facilitando o entendimento dos problemas pelos usuários.

- **Validação da variáveis de ambiente**: O sistema verifica se todas as variáveis de ambiente necessárias estão presentes e válidas antes de iniciar, garantindo que a aplicação esteja configurada corretamente para funcionar.


**7. Documentação**

- **Documentação da API**: A API é documentada utilizando Swagger, oferecendo uma descrição clara de seus endpoints, parâmetros e respostas esperadas.


---

### Melhorias

- **Estruturação**: Aplicar um designer patter de estruturação de pastas.

- **Testes Automátizados**: Criar testes automátizados unitários, e2e ou integração.

- **Autenticação e Autorização**: Implementar mecanismos de autenticação e autorização para proteger endpoints sensíveis e garantir que apenas usuários autorizados possam acessar certas funcionalidades.

- **Monitoramento de Performance**: O sistema utiliza ferramentas de monitoramento para acompanhar a saúde da aplicação e identificar gargalos de performance.

- **Criar Workflow CI/CD**: Implementar um fluxo de integração e entrega contínuas para automatizar o processo de desenvolvimento, teste e implantação.

- **Subir a aplicação usando Container Docker**: Utilizar contêineres Docker para empacotar a aplicação e suas dependências, garantindo portabilidade e consistência no ambiente de execução.


### Observações

 Eu tentei realizar o deploy utilizando a vercel, mas eu tive dificuldade eu conetar o redis e o rabbitmq por algum motivo não estava respondendo em ambiente de produção eu não consegui finalizar o deploy. 
 
 Mas eu já sei onde estava o erro que era no serviço do render onde eu estava subindo meus serviços e eu precisava configurar os IPs que poderiam ter o acesso aos meus serviços e eu não consguia o ip da vercel. 

 Estou ciente de que pode existir outros serviços, mas eu tentei subir como os serviços gratuitos que eu tinha acesso de forma gratuita.

 Na vercel eu consegui realizar o deploy, porém como eu não conssegui configurar o render eu não consegui deixar a API no ar e a minha vps pessoal neste momento infelizmente está fora do ar por um tempo senão eu subiria os serviços por lá e realizava o deploy normalmente na vercel.

 Porém eu deixei a notado nesta documentação o passo a passo de como eu fiz para subir meu aplicativo na vercel.

 Peço também que ignore os commits realizados para esse positório pois foi para tentar ajustar metodos diferentes de conexão que a documentação do render solitava paa que fosse possivel subir o aplicativo,
 então neste caso não segui o padrão de commits.

 Espero que eu tenha consguido alcançar os objetivo do projeto e desde de já agradeço pela oportunidade.