## Tsundoku Traduções V3
Tsundoku é um site voltado para leitura de Light Novels e Mangás, que já está ativo no link [Tsundoku](https://tsundoku.com.br/).
Este repo é a atualização do site para uma interface mais moderna e única com objetivos de solucionar problemas e limitações enfrentados no site atual.

## Contribuindo

A Tsundoku adoraria sua ajuda, apesar do esforço, o projeto é grande e muitos pontos ainda estão por serem decididos. Toda a ajuda é bem vinda e caso se interesse, segue alguns passos necessários para a contribuição:

### Primeiros passos 

- Fazer um fork do projeto
- Clonar o projeto em sua máquina 
- Rodar o comando "git pull" para se certificar das alterações
- Rodar o comando "npm i" dentro da pasta

## Orientações sobre Pull Requests

Tente seguir essas orientações o tanto quanto possível para minimizar o trabalho de todos.

**1.** Antes de iniciar o processo de contribuição,  **crie uma nova branch**  para fazer suas alterações.

Alguns exemplos:
-   Para novas features:  `git checkout -b feat/carrossel`
-   Para correções:  `git checkout -b fix/link-quebrado`

**2.**  Após realizar as alterações, é hora de fazer um commit com uma mensagem coerente do que foi feito. Exemplo:
```
git add --all
git commit -am ‘feat(home): adiciona carrossel na tela inicial’
git push origin feat/carrossel
```
o exemplo segue o padrão do Conventional Commits, se não estiver habituado com Conventional Commits, não se preocupe, basta que a mensagem seja clara e direta.
 Leia sobre em: [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/)

**3.**  Envie um  _Pull Request_  com as alterações feitas, fazendo referência para o  `main`  do repositório oficial.

**4.**  Sua contribuição será analisada. Em alguns casos pediremos algumas alterações antes de dar merge.

Após o merge:
-   Delete a branch utilizada:
```
git checkout main
git push origin --delete <nome_da_branch>
git branch -D <nome_da_branch>
```
-   Atualize seu repositório com o repositório oficial:
```
git fetch upstream
git rebase upstream/main
git push -f origin main
```
**5.**  Quando iniciar uma nova contribuição, repita o processo do inicio, criando uma nova branch.


## Lembrentes