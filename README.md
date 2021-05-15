Curso: Sistemas de Informação
Disciplina: Programação Web
Docente: Pablo Ricardo Roxo Silva
Período letivo: 2021.1
Aluno: Rogério de Oliveira Nascimento
# Especificação do Trabalho

- Criar o site de uma pizzaria com logo,mensagem de bem vindo e mensagem de instruções
- Criar apenas uma página quer será a de seleção de sabores da pizza
- A página deve obter os sabores da API da pizzaria: Link: https://pizzaria.roxo.dev.br/
- A lista vem ordenada alfabeticamente pelo nome do sabor
- Após obter os sabores, o site deve apresentar a lista em formato de tabela
- O usuário deverá escolher quantos sabores ele quer (1, 2 ou 3)
- Após escolher a quantidade de sabores, abrir a quantidade de campos para escolher cada sabor
- Escolhidos o(s) sabor(es), o sistema deverá calcular proporcionalmente o(s) sabor(es) e dar o preço final da pizza no final de tudo, em formato de texto e da moeda Real (por exemplo, R$38,25)

# Execução do trabalho
Escolhi utilizar [ReactJs](https://pt-br.reactjs.org/) junto ao framework  [Next.js](https://nextjs.org/) por ser umas das tecnologias de desenvolvimento web mais atuais e são as que venho estudando mais a fundo.

# [Acessar Demo ](https://pt-br.reactjs.org/)

### Caso queira executar em sua máquina siga as instruções abaixo.

- Você vai precisar ter o [NODEjs](https://nodejs.org/en/) instalado para prosseguir.

Primeiro clone o repositório e acesse a pasta criada contendo o projeto:
```bash
git clone https://github.com/RogerioNascimento-dev/prog-web-AT2.git
# em seguida acesse a pasta do projeto
cd prog-web-AT2
```

Agora você precisa instalar as dependências do projeto.
```bash
# execute o comando
npm install
```
Tendo sucesso até aqui agora é simples, basta excutar o comando para iniciar o projeto e ele ficará disponível para acessar localmente.
```bash
npm run dev
# ou se estiver usando yarn como gerenciador de dependências
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) com seu navegador para ver o site funcionando.
