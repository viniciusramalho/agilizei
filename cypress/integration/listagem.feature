#language: pt
Funcionalidade: Listagem

    Como usuário, desejo acessar a listagem
    Para que eu posso visualizar meus dados de cadastro

Cenario: Listagem sem registros
    Dado que o site não possui registros
    Quando acesso a listagem
    Entao devo visualizar a listagem vazia

Cenario: Listagem com 1 registro
    Dado que o site possui apenas um registro
    Quando acesso a listagem
    Entao devo visualizar apenas um registro na lista

