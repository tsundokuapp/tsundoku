import Head from "next/head";
import {
  Container,
  Conteudo,
  Footer,
  Navegacao,
  Capa,
  Apoiadores,
  Creditos,
  Staff,
  Capitulo,
} from "./styles";
import React, { useState } from "react";
import { Button } from "@/components/Button";
import { TrilhaPath } from "@/components/TrilhaPath";
import { CircleIndicator } from "@/animations/ScrollLinked";
import { MenuControllerText } from "@/components/MenuControllerText";
import { useNotify } from "@/Context/NotificationProvider";

const capaElaina =
  "https://i0.wp.com/tsundoku.com.br/wp-content/uploads/2021/01/Tsundoku-Traducoes-Light-Novel-Majo-no-Tabitabi-Volume-04-Imagem-03_-scaled.jpg?resize=2560%2C1821&ssl=1";

interface ILayoutMainProps {
  children: React.ReactNode;
  titulo: string;
}

export const LayoutCapituloNovel = ({ children, titulo }: ILayoutMainProps) => {
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1);

  const notify = useNotify();

  const ChangeFontSize = (params: number) => {
    if (params === -1 && fontSize <= 12) {
      notify({
        type: "warning",
        title: "Aviso",
        description: "Tamanho mínimo atingido",
      });
      return;
    }
    if (params === 1 && fontSize >= 26) {
      notify({
        type: "warning",
        title: "Aviso",
        description: "Tamanho máximo atingido",
      });
      return;
    }
    setFontSize(fontSize + params);
  };

  const ChangeLineHeight = (params: number) => {
    if (params === -0.5 && lineHeight <= 1) {
      notify({
        type: "warning",
        title: "Aviso",
        description: "Espaçamento mínimo atingido",
        onMore: () => alert("teste"),
      });
      return;
    }
    if (params === 0.5 && lineHeight >= 4) {
      notify({
        type: "warning",
        title: "Aviso",
        description: "Espaçamento máximo atingido",
      });
      return;
    }
    setLineHeight(lineHeight + params);
  };

  return (
    <>
      <CircleIndicator />
      <MenuControllerText
        fontMinus={() => ChangeFontSize(-1)}
        fontPlus={() => ChangeFontSize(1)}
        lineMinus={() => ChangeLineHeight(-0.5)}
        linePlus={() => ChangeLineHeight(0.5)}
      />
      <Container>
        <Head>
          <title>{titulo}</title>
          <meta
            name="description"
            content="Site de traduções de Light Novels e mangás"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Capa>
          <img src={capaElaina} alt="atual volume da obra" />
        </Capa>
        <Conteudo>
          <Navegacao>
            <TrilhaPath />
            <div>
              <Button
                label="Anterior"
                variant="secundario"
                onClick={() => {}}
              />
              <Button label="Índice" variant="secundario" />
              <Button
                label="Próximo"
                variant="secundario"
                onClick={() => ChangeLineHeight(-0.5)}
              />
            </div>
          </Navegacao>
          <Capitulo fontSize={fontSize} lineHeight={lineHeight}>
            <div>
              <h1>O País dos Magos</h1>
              <p>— Então voar é o meio de transporte preferido daqui, hein?</p>
              <p>
                E, com isso, vi o País dos Magos como deveria ser visto. Acima
                dos telhados marrom-avermelhados que se estendiam igual um
                bocado de terra seca, magos flutuavam no ar. Alguns paravam suas
                vassouras para ter uma conversa amigável, enquanto outros voavam
                com pacotes de bagagem amarrados a elas. Havia mulheres idosas
                suspeitas e parecidas com bruxas, além de crianças disparando
                pelo céu, competindo para ver quem podia voar mais alto.
              </p>
              <p>
                <em>Essas pessoas devem passar a vida inteira no ar.</em>
              </p>
              <p>
                Foi uma cena realmente maravilhosa. Me deixou quase sem fôlego.
              </p>
              <p>
                Me juntei a eles, subindo acima do país, rendendo-me sem rumo ao
                fluxo de tráfego aéreo ao meu redor. De repente, uma placa presa
                ao topo de um dos telhados chamou minha atenção. Aparentemente
                era uma POUSADA. Passei sem parar e vi a palavra MERCEARIA logo
                adiante. Havia outras: um AÇOUGUE e até uma JOALHERIA. Como eu
                suspeitava, a vida local era vivida acima dos telhados, e
                colocar suas placas no topo do teto devia ser a prática comum.
              </p>
              <p>
                Olhando em volta, vi que os telhados da maioria das casas tinham
                uma janela que era grande o suficiente para uma única pessoa
                passar. Enquanto observava distraidamente, uma daquelas janelas
                se abriu e um homem montado em uma vassoura voou para fora.
              </p>
              <p>
                <em>Então</em> é <em>para isso que elas são usadas.</em>
              </p>
              <p>
                Voei em um ritmo lento, observando toda a paisagem, até que...
              </p>
              <p>— Ahhhhhhhhhhhhhhh!</p>
              <p>
                ... um grito soou de trás de mim. Segurando minha vassoura com
                uma mão, segurei meu chapéu para que não voasse para longe e me
                virei.
              </p>
              <p>
                <em>Ah, tarde demais.</em>
              </p>
              <p>— Ahhhhhhhhhhh!</p>
              <p>
                Dirigindo-se diretamente para mim a uma velocidade absurda, como
                um meteorito caindo e deixando um rastro luminoso, a pessoa em
                questão já estava a apenas um telhado de distância quando a vi.
              </p>
              <p>
                <em>Esquivar? Impossível.</em>
              </p>
              <p>
                Virei minha parte superior do corpo por reflexo, mas não havia
                como evitar a colisão. Com uma série de grunhidos (“Ugya!”,
                “Geh”), nós nos emaranhamos e caímos no telhado abaixo. As
                telhas cuidadosamente alinhadas quebraram, e por fim paramos um
                pouco antes de cair da borda do telhado. Vi uma única telha cair
                no chão, bem abaixo de nós. Ainda bem que não havia pedestres.
              </p>
              <p>
                O ângulo era pequeno, mas consegui evitar uma colisão direta com
                o chão. Além disso, a pessoa estranha que colidiu comigo havia
                sofrido o impacto da aterrissagem, então, felizmente, não me
                feri.
              </p>
              <p>
                Eu me levantei, limpando alguns fragmentos marrom-avermelhados
                do telhado que ficaram grudados no meu robe preto.
              </p>
              <p>— ...</p>
              <p>— Urggggh...</p>
              <p>
                A adolescente gemendo e olhando em volta atordoada parecia ser
                um pouco mais nova que eu. Seu cabelo preto era curto, e tinha
                um rosto de aparência andrógena. Ela usava uma blusa branca e
                uma saia xadrez sob um manto preto, as quais ficaram bagunçadas
                após cair no telhado.
              </p>
              <p>
                <em>
                  Ela não está usando broche nem nada no peito, então deve ser
                  uma noviça.
                </em>
              </p>
              <p>— Hmm, você está bem...?</p>
              <p>Quando toquei o ombro da garota caída, ela abriu os olhos.</p>
              <p>— ...</p>
              <p>— … — E ficou em silêncio.</p>
              <p>
                Parecia que ainda estava lutando para processar a situação,
                então me arrisquei:
              </p>
              <p>— Você tem problemas para pilotar sua vassoura?</p>
              <p>Sim, admito que estava falando em um tom sarcástico.</p>
              <p>— Ah...</p>
              <p>
                — Parece que você finalmente recuperou os sentidos — falei com
                um sorriso.
              </p>
              <p>
                — Ahhhh! — Ela voltou a olhar ao redor. — O-o-o-o que eu faço? O
                que eu faço? Não tem como consertar tantas telhas...
              </p>
              <p>
                <em>Ei, e aí...</em>
              </p>
              <p>— Que tal um pedido de desculpas primeiro?</p>
              <p>— Ah, s-sinto muito! Não foi de propósito! Sério!</p>
              <p>
                <em>Bem, eu já sabia disso.</em>
              </p>
              <p>— Enfim, você está bem? Você girou feito um furacão.</p>
              <p>
                — Ah, estou bem! Estou novinha em folha, viu?! — disse a menina,
                enquanto pequenos filetes vermelhos escorriam de sua cabeça.
                Seus olhos estavam claros e ela não teve problemas para falar.
              </p>
              <p>...</p>
              <p>— Você está sangrando. Na sua cabeça.</p>
              <p>— É só suor!</p>
              <p>— Seu suor sempre cheira a ferro?</p>
              <p>— Hmm, bem, hmm... é suor!</p>
              <p>— Okay, entendi, então acalme-se um pouco.</p>
              <p>— Sim, senhora!</p>
              <p>— ...</p>
              <p>
                <em>
                  Não sei por que, mas já me sinto exausta. Talvez seja por
                  causa da colisão.
                </em>
              </p>
              <p>
                Eu estava planejando fazer a garota consertar as telhas
                quebradas depois de uma boa bronca, mas já era o suficiente. Ela
                já estava toda confusa; forçá-la a consertar o telhado enquanto
                continuava nesse estado seria simplesmente insensível. Em vez
                disso, tirei meu lenço do bolso.
              </p>
              <p>— Aqui, pegue. Pressione na sua cabeça.</p>
              <p>— Ah... mas...</p>
              <p>
                — Além disso, vou colocar as telhas de volta no lugar, então vá
                descansar, por favor.
              </p>
              <p>— Não, também vou ajudar!</p>
              <p>
                — No seu estado, se tentar ajudar, só vai atrapalhar. Vá
                descansar — falei com mais firmeza.
              </p>
              <p>— Mas...</p>
              <p>— Você. Vai. Me. Atrapalhar.</p>
              <p>— Tá bom...</p>
              <p>
                Como um gato de rua, a jovem abatida sentou-se no topo do
                telhado e pressionou o lenço contra o ferimento na cabeça. Por
                mais enérgica que parecesse, estava claro que se esforçara um
                pouco demais. No exato momento em que se sentou, inclinou-se e
                caiu.
              </p>
              <p>
                <em>
                  Eu posso adiar um pouco a situação com ela. Não é como se essa
                  garota fosse morrer ou algo assim. Primeiro, vamos fazer algo
                  quanto a esse desastre aqui
                </em>
                ...
              </p>
              <p>
                Juntei energia mágica em minhas mãos. Instantaneamente, uma
                varinha longa e fina apareceu nelas, acompanhada por um brilho
                fraco.
              </p>
              <p>
                Este era o privilégio especial dos magos. Somos capazes de
                produzir qualquer coisa – varinhas, vassouras e outras
                ferramentas mágicas, por exemplo –, do nada.
              </p>
              <p>Canalizei energia para minha varinha e comecei a trabalhar.</p>
              <p>Era um feitiço de reversão temporal.</p>
              <p>
                Como o nome sugere, é um tipo de magia que conserta coisas
                quebradas e cura ferimentos, fazendo o tempo correr ao
                contrário. Requer habilidade mágica levemente avançada, mas
                qualquer bruxa que vive neste país deveria ser capaz de fazer
                isso. Entretanto, tenho certeza de que teria sido difícil para a
                pequena noviça desastrada atrás de mim.
              </p>
            </div>
            &nbsp;
            <p>
              <img
                src="http://tsundoku.com.br/wp-content/uploads/2021/01/Logo-Tsundoku-Traducoes.png"
                alt=""
                width="100"
                height="83"
              />
            </p>
            <p>https://tsundoku.com.br</p>
            &nbsp;
            <img
              src="http://tsundoku.com.br/wp-content/uploads/2021/12/MJ_V1_Cap01_Img1.jpg"
              alt=""
            />
            <div>
              <p>Chegara o dia.</p>
              <p>
                Passamos a minha última noite no país juntas. Eu consolei Saya
                enquanto ela chorava, dei alguns conselhos para passar no exame
                prático de habilidades mágicas, ouvi tudo sobre o país de onde
                ela e sua irmã eram, discuti minhas futuras viagens e assim por
                diante.
              </p>
              <p>
                Ah, e acontece que Saya era realmente uma maga muito poderosa.
                Quero dizer, eu sabia disso o tempo todo, mas nunca descobri por
                que ela era tão ruim em magia de vento. Nesse ponto, não importa
                o quanto perguntava, a garota só corava e se recusava a
                responder. <em>Qual é o problema dela?</em>
              </p>
              <p>
                No final de tudo, adormecemos juntas no momento em que o sol
                estava nascendo. Tinha sido uma longa, longa noite.
              </p>
              <p>Mas também uma lembrança preciosa.</p>
            </div>
            &nbsp;
            <p>
              <img
                src="http://tsundoku.com.br/wp-content/uploads/2021/01/Logo-Tsundoku-Traducoes.png"
                alt=""
                width="100"
                height="83"
              />
            </p>
            <p>https://tsundoku.com.br</p>
            &nbsp;
            <div>
              <p>
                Voltei a pensar após vários meses depois de deixar o País dos
                Magos.
              </p>
              <p>Seis meses, para ser exata.</p>
              <p>
                <em>
                  Cerca de meio ano se passou desde que conheci aquela garota,
                  perdi meu broche e o recuperei – uau, o tempo com certeza voa.
                  De verdade.
                </em>
              </p>
              <p>
                Eu tinha viajado para outro país tão longe que as pessoas
                perguntavam: “Hein? País dos Magos? Onde fica isso?”
              </p>
              <p>
                A razão pela qual eu estava relembrando era que, por acaso, vi o
                nome dela enquanto estava passando por uma livraria.
              </p>
              <p>LISTA DE APROVADOS NO EXAME DE BRUXA NOVIÇA</p>
              <p>
                Impresso em uma pilha de papel de palha realmente barato, era
                publicada todo mês pela misteriosa organização conhecida como
                Associação de Magia, responsável pela realização dos exames de
                bruxa noviça, entre outras coisas. Os resultados dos exames
                realizados em todo o mundo, além de algumas palavras das
                candidatas aprovadas, estavam exibidos na primeira página.
              </p>
              <p>Seu nome estava lá.</p>
              <p>
                — Ei, sem leitura na loja. — O dono da loja apareceu dos fundos
                e me tomou os jornais.
              </p>
              <p>
                — Ah... <em>— Mas eu queria continuar lendo.</em>
              </p>
              <p>— Quer ler? Tem que pagar.</p>
              <p>— Quanto?</p>
              <p>— Um cobre.</p>
              <p>
                Paguei, depois enfiei o papel debaixo do braço e voltei para
                minha pousada, cantarolando por todo o caminho. Puxei minha
                cadeira para a janela e continuei lendo. No artigo, a garota
                falava sobre seus dias mais difíceis e suas esperanças para o
                futuro.
              </p>
              <p>
                Segundo o artigo, ela havia se mudado para o País dos Magos com
                sua irmãzinha há vários anos. Sua irmã, e apenas sua irmã,
                rapidamente se tornou uma bruxa noviça e voltou para sua cidade
                natal sem ela. Então a garota acabou conhecendo uma certa
                viajante que lhe deu a coragem para lutar por conta própria,
                além de um chapéu incrivelmente estiloso. Ela tentou o exame
                várias vezes depois que a viajante partiu, mas foi muito
                difícil. No entanto, continuou tentando e nunca desistiu e, no
                final das contas, ganhou o posto de bruxa noviça. Agora estava
                voltando para casa, com planos de treinar duro e se tornar uma
                bruxa de verdade.
              </p>
              <p>Não pude deixar de sorrir.</p>
              <p>
                Sua longa história acabou com uma frase: Depois de voltar para
                casa e me tornar uma bruxa de pleno direito, gostaria de fazer
                uma visita à minha viajante preferida.
              </p>
              <p>
                Coloquei o jornal sobre a mesa e olhei para o céu. Em algum
                lugar na extensão infinita daquele céu claro e azul pálido,
                estava ela.
              </p>
              <p>— Estarei esperando para te ver… Saya.</p>
            </div>
          </Capitulo>
        </Conteudo>
        <Creditos>
          <Staff>
            <h2>Equipe Tsundoku</h2>
            <span>
              <p>Tradutor:</p>
              <p>Roel</p>
            </span>
            <span>
              <p>Revisor:</p>
              <p>Nero</p>
            </span>
            <span>
              <p>QC:</p>
              <p>Axios</p>
            </span>
            <span>
              <p>Editor:</p>
              <p>Axios</p>
            </span>
          </Staff>
          <Apoiadores>
            <h3>
              A Tsundoku agradece à todos os nossos apoiadores, isso mantém o
              site vivo e nossa staff motivada:
            </h3>
            <span>
              Nero, Daruma, Arthur, Fulano, Jhones, Marcos, Estela, Mia, Bruno,
              Alberto, Nero, Daruma, Arthur, Fulano, Jhones, Marcos, Estela,
              Mia, Bruno, Alberto, Nero, Daruma.....
            </span>
            <h3>
              Conheça as vantagens de ser um(a) apoiador(a) neste link:&nbsp;
              <a href="http://tsundoku.com.br">tsundoku.com.br/apoiador</a>
            </h3>
          </Apoiadores>
        </Creditos>
        <Navegacao>
          <div>
            <Button label="Anterior" variant="secundario" />
            <Button label="Índice" variant="secundario" />
            <Button label="Próximo" variant="secundario" />
          </div>
        </Navegacao>
      </Container>
      <Footer>
        <strong>Tsundoku Traduções</strong>
        <div>
          <p>aqui vai ter os links de redes sociais</p>
        </div>
        <p>© 2023 Tsundoku Traduções</p>
      </Footer>
    </>
  );
};
