<div align="center">
    <img width="649" height="93" src="https://github.com/williammmoura/Projeto_Final_Modulo_02_FullStack_FMT_Backend/assets/86812365/2d80f74c-3fd1-475b-a29e-407e35240588">
</div>

<div align="center">
  <h1>Gerenciador de Farmácias e Medicamentos (Back-end)</h1>
</div>

<h2>Descrição</h2>

Este projeto é um sistema online com o objetivo de gerenciamento de famácias e medicamentos,
intitulado como Pharmacy Central System da empresa (fictícia) LABPharmacy Inc. Agora foi criado
o back-end do sistema que foi codificado em Node, utilizando o framework Express.js com o uso do 
banco de dados PostgreSQL.

<br>
<br>

<h2>Problema Resolvido</h2>

O Pharmacy Central System ajuda na organização de empresas do ramo farmacêutico, que buscam expandir
a sua rede de lojas. O sistema desenvolvido oferece um banco de dados seguro para o cadastramento de
novos depósitos, medicamentos e usuários que possam ter o acesso, ou não, ao sistema de cadastramento.

<br>
<br>

<h2>Tecnologias Utilizadas</h2>

- **Node.js:** Plataforma de execução de código JavaScript do lado do servidor, que permite o desenvolvimento de aplicações web escaláveis e de alta performance.

- **Express.js:** Framework web para Node.js que facilita a criação de APIs e aplicativos web com mais facilidade e simplicidade.

- **PostgreSQL:** Sistema gerenciador de banco de dados relacional de código aberto, utilizado para armazenar os dados do projeto.

- **Sequelize:** ORM (Object-Relational Mapping) para Node.js que oferece suporte ao PostgreSQL e simplifica o acesso e manipulação do banco de dados através de modelos.

- **pg:** Pacote Node.js que fornece um cliente PostgreSQL para conexão com o banco de dados.

- **pg-connection-string:** Pacote Node.js que facilita a leitura da URL de conexão com o PostgreSQL a partir das variáveis de ambiente.

- **dotenv:** Pacote Node.js que permite a configuração de variáveis de ambiente a partir de um arquivo .env.

- **jsonwebtoken:** Pacote Node.js para a criação e verificação de tokens de autenticação JWT (JSON Web Tokens).

#Dependências de Desenvolvimento
- **sequelize-cli:** Pacote Node.js da linha de comando do Sequelize que auxilia na criação de migrations, modelos e seeders.

- **nodemon:** Pacote Node.js que monitora alterações no código e reinicia automaticamente o servidor, facilitando o desenvolvimento.

<br>
<br>

<h2>Como Executar?</h2>

Além das informações descritas acima é fundamental saber executar o sistema. Então atente aos seguintes passos:

- **Pré-requitos**

Antes de prosseguir, certifique-se de ter o Node.js e o npm instalados em seu sistema. Além disso, você precisará ter acesso a um banco de dados PostgreSQL em funcionamento.

- **1. Instalar as dependências**

Navegue até a pasta raiz do projeto e instale as dependências necessárias usando o npm:

<div align="center">
    <img width="649" height="93" src="https://github.com/williammmoura/Projeto_Final_Modulo_02_FullStack_FMT_Backend/assets/86812365/6f3c8e3c-7dca-4bc3-a3f0-604127264223">
</div>

- **2. Configurar as variáveis de ambiente**

Preencha as variáveis de ambiente necessárias, como as configurações de conexão do banco de dados e chaves secretas para geração de tokens JWT.

- **3. Criar as tabelas do banco de dados**

Utilize o sequelize-cli para criar as tabelas no banco de dados. Certifique-se de ter configurado corretamente o arquivo config/database.config.js com as credenciais corretas do banco de dados.

<div align="center">
    <img width="649" height="53" src="https://github.com/williammmoura/Projeto_Final_Modulo_02_FullStack_FMT_Backend/assets/86812365/6f51d8cd-5142-4cb1-96e3-9dcd970a9716">
</div>

- **4. Executar o servidor**

Inicie o servidor usando o comando que está configurado no arquivo "package.json":

<div align="center">
    <img width="649" height="53" src="https://github.com/williammmoura/Projeto_Final_Modulo_02_FullStack_FMT_Backend/assets/86812365/acc4f012-b582-4437-bc50-77244c41f0e6">
</div>

Isso iniciará o servidor e estará pronto para receber solicitações na porta especificada.

- **5. Testar as rotas**
  
Você pode testar as rotas usando uma ferramenta de API client, como o Postman, Thunder Client ou outro.

Agora você deve ser capaz de executar o projeto localmente em seu ambiente de desenvolvimento.
