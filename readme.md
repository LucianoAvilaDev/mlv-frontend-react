# VS - Virtual Store - FRONT-END

## Escopo

Sistema de e-commerce desenvolvido para uma loja poder vender seus produtos, que são obtidos através da API dos seus dois fornecedores, onde as compras serão salvas no banco de dados com os dados do cliente e do produto.

## Solução proposta

Para resolver o problema foram definidas as seguintes regras:

- **Produtos**
  - Serão obtidos dinamicamente pelas APIs dos fornecedores.
  - Estarão em exibição na tela e poderão ser filtrados por categoria, nome, etc.
  - Quando feita a compra, é criado o item de produto com os dados do produto no ato da compra.
  - Os itens são criados para previnir que possíveis alterações futuras no produto impactem nos valores do mesmo no ato da compra realizada anteriormente.
- **Compras**
  - A compra só é concretizada após o cliente clicar em comprar e confirmar.
  - Deve haver itens no carrinho para poder concretizar a compra.
  - A compra possuirá os dados do cliente e dos itens da compra.
  - Ambos item e compra ficam salvos no banco de dados
- **Carrinho**
  - Os dados do carrinho ficam armazenados nos cookies.
  - Após concluída a compra, o carrinho deve ser esvaziado.
- **Usuário - Cliente**

  - Só poderá realizar a compra com cadastro.
  - Pode alterar apenas os próprios dados, exceto o perfil.
  - Pode logar e deslogar do sistema.

- **Usuário - Admin**
  - Pode alterar os próprios dados e dados dos clientes.
  - Pode ver e alterar as compras realizadas.
  - Pode logar e deslogar do sistema.
- **Mais informações**
  - Usuários sem cadastro podem navegar pelo sistema livremente e adicionar produtos ao carrinho.
  - É necessário possuir cadastro para concretizar a compra.
  - O sistema possui dois tipos de usuário: admin e cliente. Padrão de criação: cliente.
  - Não foi implementado sistema de pagamento.

## Ferramentas

- [VS Code](https://code.visualstudio.com/download): Ferramenta de edição de código.
- [Git](https://git-scm.com/doc): Ferramenta de versionamento de código.
- [Laragon Full](https://laragon.org/download/index.html): Ambiente de desenvolvimento e servidor local. Nele já vem inclusos o [PHP 8.1.10](https://www.php.net/downloads.php), [Apache 2.4.54](https://httpd.apache.org/download.cgi), [MySQL 8.0.30](https://www.mysql.com/downloads/) e [NodeJs 18.15](https://nodejs.org/en/);
- [Node.js](https://nodejs.org/en): Ambiente de desenvolvimento integrado em Javascriot/Typescript
- [React](https://react.dev/): Library de desenvolvimento front-end em Javascript/Typescript.
- [Next.js](https://insomnia.rest/download): Framework React de desenvolvimento.

## Instalações

- **Visual Studio Code**

  - Baixe e instale o [VS Code](https://code.visualstudio.com/download/).
  - Prossiga com a instalação até concluir.

- **Git**

  - Baixe e instale o [Git](https://git-scm.com/doc).
  - Prossiga com a instalação até concluir.

- **Laragon**

  - Baixe e instale o [Laragon](https://laragon.org/). Ele já vem por padrão com PHP, Apache, Node.JS.
  - Após a instalação, execute o **Laragon** e clique em **Iniciar Todos** para iniciar o **Apache** e o **MySQL**.
  - Acesse <http://localhost> no navegador. Se estiver tudo correto, deverá aparecer a tela de boas-vindas do **Laragon**.

- **Node.js**

  - Baixe e instale o [Node.js](https://nodejs.org/en).
  - Prossiga com a instalação até concluir.

## Executando o projeto

- **Iniciando a API**

  - Acesse o repositório [https://github.com/LucianoAvilaDev/mlv-backend-laravel] e clone o projeto.
  - Inicie-o conforme as instruções no **readme.md** do próprio repositório

- **Clonando o projeto**

  - Copie a url do reposiyório, abra o **Git Bash** ou o **VS Code**.
  - Execute o comando **git clone <url-do-repositório>**
  - Navegue até a pasta do projeto e rode **yarn** para gerar a pasta vendor

- **Iniciando o projeto**

  - Copie o arquivo **.env.example** e renomeie a cópia para **.env.local**
  - No **.env** altere as propriedades do banco conforme o seu banco local
  - Execute o comando **yarn dev** para iniciar o servidor na porta 3000.

## Desenvolvimento

- **Criação do projeto**

  - Instalei o **yarn** com o comando **npm install --global yarn**.
  - Criei o projeto com **yarn create next-app --typescript**
  - Criei o arquivo **readme.md**, descrevi passos do projeto e salvei.
  - Para verificar se o projeto foi criado corretamente, executei **yarn dev** na pasta do projeto.
  - Após ele iniciar, acessei <http://localhost:3000> no browser e abriu a tela de boas vindas.
  - Para versionar usei os recursos da extensão **Git Extension Pack** no próprio VS Code.

- **Integração com API**

  - Utilizei o **axios** instalando-o com o comando **yarn add axios**

- **Pastas**

  - Nessa versão do **Next.js**, o arquivo de boot -e o **\_app.tsx** na pasta **src/pages**.
  - Em **src** estão os componentes classificados por tipo: alertas, botões, inputs, etc.
  - As demais pastas em **src** são contexts, schemas, services, types e utils, contendo seus respectivos arquivos.
  - Para estilos, utilizei o **tailwind**, suas configurações estão no arquivo **tailwind.config.js**
  - É necessário configurar o **tailwind** adequadamente nos arquivos globals.css e postcss.config,js.

---
