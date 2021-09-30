# Manager Loops Bot API

API para fazer o gerenciamento do bot Loops.

# To-Do

- [x] Modelar banco de dados
- [x] Criar fluxo de autenticação do admin
- [x] Criar rota para adicionar uma nova url de música.
  - [x] Pegar informações da música
  - [x] Salvar informações da música no banco de dados
  - [x] Fazer download da música
- [x] Criar rota para listar todas as músicas e suas informações
- [x] Criar rota para fazer dowload da música armazenada no servidor
- [ ] Disparar evento para o bot quando uma música for adicionada
  - [ ] Após disparar o evento, o bot deve fazer um no fetch para pegar a nova lista de músicas
  - [ ] A nova música deve ser adicionada ao banco de dados e listada ao fim da lista
- [ ] Criar rota para deletar uma música
  - [ ] Após deletar a música, deve apagar a música localmente.
  - [ ] Após deletar a música, o bot deve fazer um no fetch para pegar a nova lista de músicas
  - [ ] A música só pode ser deletada se ela não estiver sendo tocada
- [ ] Criar rota para alterar mensagens do bot
- [ ] Disparar em tempo real o status de todas as músicas
- [ ] Disparar em tempo real a quantidade de servidores ativos
  - [ ] Salvar essa informação no banco de dados
