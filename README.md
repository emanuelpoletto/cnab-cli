# Desafio técnico: leitor de arquivos CNAB

Este desafio tem a proposta de melhorar uma CLI que lê arquivos cnab.
Um CNAB é um arquivo posicional, sendo que cabeçalho são as duas primeiras linhas do arquivo e rodapé as duas últimas.

Ele é dividido por segmentos: *P*, *Q* e *R*. Cada linha começa com um código cujo último caractere indica o segmento:

```
0010001300002Q 012005437734000407NTT BRASIL COMERCIO E SERVICOS DE TECNOLAVENIDA DOUTOR CHUCRI ZAIDAN, 1240 ANDARVILA SAO FRANCI04711130SAO PAULO      SP0000000000000000                                        000
```
Neste exemplo, o **Q** aparece na posição/coluna 14. Cada posição representa algo dentro do arquivo cnab.


Hoje, ao rodar:

```bash
node cnabRows.js
```

temos o seguinte output:

```bash
node cnabRows.js --help
Uso: cnabRows.js [options]

Opções:
      --help      Exibe ajuda                                         [booleano]
      --version   Exibe a versão                                      [booleano]
  -f, --from      posição inicial de pesquisa da linha do Cnab
                                                          [número] [obrigatório]
  -t, --to        posição final de pesquisa da linha do Cnab
                                                          [número] [obrigatório]
  -s, --segmento  tipo de segmento                        [string] [obrigatório]

Exemplos:
  cnabRows.js -f 21 -t 34 -s p  lista a linha e campo que from e to do cnab
```

Hoje, a ferramenta busca uma posição e loga isso no terminal.

O desafio consiste em:

- [x] poder passar na CLI o local do arquivo.
- [ ] pesquisar por nome da empresa e mostrar em que posição ela foi encontrada e a qual segmento ela pertence.
- [ ] **Bonus**: ler o cnab e escrever um novo arquivo em formato JSON, contendo nome e endereço da empresa.

O candidato tem total liberdade de mudar a estrutura atual desse projeto, a ideia é ver a criatividade de resolver esse problema.
