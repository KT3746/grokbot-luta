# LUTA

Jogo de luta em turnos, original, feito para o navegador. Você controla **Nara** numa campanha de **10 círculos**: em cada duelo escolha exatamente uma ação por turno — **Atacar**, **Defender** ou **Magia** — e, entre as lutas, descanse e escolha um reforço.

Jogue online: [https://kt3746.github.io/grokbot-luta/](https://kt3746.github.io/grokbot-luta/)

Versão **1.10.0** — wave 4: **contra-golpe** (se a sua guarda segurar o golpe do rival, o próximo Atacar bate +40%, com selo no botão); **segure um botão** para ver o dano na barra do rival antes de agir (solte fora para cancelar; no mouse basta passar por cima); **leitura do rival** com as últimas 4 ações na placa dele; botão **Pausa** na luta e no Respiro (Esc/P), que congela o duelo e deixa sair para o início com a campanha salva. Wave 3: arena 3D sem caixas brancas, botão Magia com carga de essência, selo **Finaliza** e selo grande **K.O.!**. Wave 2: meta do dia / melhor sequência, juice de acerto preciso e Clarão, barras legíveis no celular. Arena Three.js r160 local; fallback clássico se WebGL falhar. Cache-bust `?v=202610060530`.

## Como jogar

1. Toque em **Começar campanha** (ou **Continuar** se você já tinha um jogo salvo).
2. No seu turno, escolha **uma** ação:
   - **Atacar** — dano firme, sem custo. Às vezes sai um acerto preciso.
   - **Defender** — reduz o próximo golpe e recupera um pouco de essência.
   - **Magia (Clarão)** — dano alto, gasta essência e perfura parte da guarda.
3. O rival responde com a mesma lógica, mas cada um tem um jeito de lutar.
4. Quem zerar a vida do outro vence aquele círculo.
5. Entre os círculos aparece a tela de **descanso**: escolha **um** reforço (curar, subir vida máxima, essência, ataque, magia mais forte ou mais barata, e outros). A progressão é sentida na próxima luta.
6. São **10 círculos** em sequência. O 5, o 9 e o 10 são **chefes**. O último é o clímax.

Se você cair: **Tentar de novo** (mesmo círculo, com os reforços que já tinha) ou **Reiniciar campanha**.

O progresso da campanha, o som e a meta suave (vitórias do dia / sequência) ficam salvos neste aparelho (localStorage). Recarregar a página não apaga o meio da campanha. O tutorial **Como duelar** aparece sempre que você toca em **Começar campanha** ou **Nova campanha** (não aparece em **Continuar**).

Atalhos no teclado, **só durante a luta** (não valem no título, no tutorial, no Respiro nem no fim de duelo): `1` / `A` atacar, `2` / `D` defender, `3` / `M` magia, `S` som. `Esc` ou `P` abre/fecha a pausa (luta e Respiro). No Respiro, use o toque ou Enter/Espaço no reforço escolhido.

## Abrir no computador

Não precisa instalar nada nem de servidor.

1. Baixe ou clone este repositório.
2. Abra o arquivo `index.html` no navegador.

Se preferir um servidor local:

```bash
python3 -m http.server 8080
```

Depois acesse `http://localhost:8080/`.

O jogo é estático (HTML, CSS e JavaScript). Depois de carregado, funciona sem rede. Os sons são gerados no próprio navegador e podem ser silenciados.

## Personagens

- **Nara** — duelista do véu-ciano. Você.
- **Liro das Dunas** — batedor magro. Círculo 1.
- **Dagro das Forjas** — bruto das forjas. Círculo 2.
- **Velin da Sombra** — drena essência. Círculo 3.
- **Bruma do Véu** — guarda e névoa. Círculo 4.
- **Korr da Laje** — primeiro chefe, pedra viva. Círculo 5.
- **Sile da Geada** — magia gelada. Círculo 6.
- **Ravó Ígneo** — berserker. Círculo 7.
- **Neme da Fresta** — assassina que perfura guarda. Círculo 8.
- **Orvane do Pacto** — segundo chefe. Círculo 9.
- **Aurenegra** — chefe final do eclipse. Círculo 10.

IP original. Sem nomes, artes ou imitações de franquias alheias.

## Tecnologias

Página estática. Sem backend. Layout pensado para celular e desktop, com botões grandes e contraste alto.
