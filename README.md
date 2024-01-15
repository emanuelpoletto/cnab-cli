# Leitor de arquivos CNAB

Um CNAB é um arquivo posicional, sendo que cabeçalho são as duas primeiras linhas do arquivo e rodapé as duas últimas.

Ele é dividido por segmentos: *P*, *Q* e *R*. Cada linha começa com um código cujo último caractere indica o segmento:

```
0010001300002Q 012005437734000407NTT BRASIL COMERCIO E SERVICOS DE TECNOLAVENIDA DOUTOR CHUCRI ZAIDAN, 1240 ANDARVILA SAO FRANCI04711130SAO PAULO      SP0000000000000000                                        000
```
Neste exemplo, o **Q** aparece na posição/coluna 14. Cada posição representa algo dentro do arquivo cnab.

Ao rodar:

```bash
node index.js
```

temos o seguinte output:

```bash
Usage: index.js [options]

Options:
      --help          Show help                                        [boolean]
      --version       Show version number                              [boolean]
  -i, --inputFile     The full path and filename to be read  [string] [required]
  -f, --from          Initial position to search on a line              [number]
  -t, --to            Final position to search on a line                [number]
  -s, --segment       Filter by segment type                            [string]
  -c, --company       Search by company name                            [string]
  -e, --exportToJson  The full path and filename to export the company name and
                      address from the output in JSON format            [string]

Examples:
  index.js -f 21 -t 34 -s p -i ./cnabExamp  output lines filtered by segment P a
  le.rem                                    nd their related search substring
  index.js -s Q -c Acme -i ./cnabExample.r  output lines filtered by segment Q a
  em                                        nd company name
  index.js -e cnabExample.json -i ./cnabEx  output everything and export company
  ample.rem                                  names and addresses from the output
                                             to cnabExample.json

Missing required argument: i
```

A ferramenta busca uma posição e loga isso no terminal.

Melhorias:

- [x] poder passar na CLI o local do arquivo.
- [x] pesquisar por nome da empresa e mostrar em que posição ela foi encontrada e a qual segmento ela pertence.

**Bônus:**

- [x] ler o cnab e escrever um novo arquivo em formato JSON, contendo nome e endereço da empresa.
- [x] poder instalar a ferramenta CLI globalmente para usar direto o comando `cnabcli` no terminal.

**TODO:**

- [ ] implementar leitura do arquivo através de streams para melhorar performance e lidar com arquivos grandes.

Pode-se mudar a estrutura atual desse projeto. A ideia é ver a criatividade de resolver esse problema.
