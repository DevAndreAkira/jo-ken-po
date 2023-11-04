PIXI.settings.RESOLUTION = 2;

let app;

window.onload = function () {

    if (innerWidth >= 767) {
        app = new PIXI.Application(
            {
                width: 1280,
                height: 600,
                backgroundAlpha: 0
            }
        );
    }
    else {
        app = new PIXI.Application(
            {
                width: 600,
                height: 600,
                backgroundAlpha: 0
            }
        );
    }
    document.body.appendChild(app.view);

    //* Variaveis
    const carinha = PIXI.Texture.from('./img/carinha.png');
    const carinhaPedra = PIXI.Texture.from('./img/carinha-pedra.png');
    const carinhaPapel = PIXI.Texture.from('./img/carinha-papel.png');
    const carinhaTesoura = PIXI.Texture.from('./img/carinha-tesoura.png');
    const arrayCarinha = [carinha, carinhaPedra, carinhaPapel, carinhaTesoura];

    const textureButton0 = PIXI.Texture.from('./img/pedra.png');
    const textureButton1 = PIXI.Texture.from('./img/papel.png');
    const textureButton2 = PIXI.Texture.from('./img/tesoura.png');
    const arrayTexture = [textureButton0, textureButton1, textureButton2];
    const buttons = [];

    const buttonPositions = [
        app.screen.width / 2 - 75, app.screen.height / 2 + 55,
        app.screen.width / 2, app.screen.height / 2 + 55,
        app.screen.width / 2 + 75, app.screen.height / 2 + 55,
    ];

    init();

    function init() {
        let pontuacao1 = 0;
        let pontuacao2 = 0;
        let arrayTextPlayer1 = [pontuacao1, 0x000000, app.screen.width / 2 - 50, app.screen.height / 2];
        let arrayTextPlayer2 = [pontuacao2, 0x000000, app.screen.width / 2 + 50, app.screen.height / 2];

        const containerIntro = new PIXI.Container();
        app.stage.addChild(containerIntro);

        const textStandart = new PIXI.Text('Começar', {
            fontFamily: 'sans-serif',
            fontSize: 30,
            fill: '0x000000',
            align: 'center',
        });
        textStandart.anchor.set(0.5);
        textStandart.position.set(app.screen.width / 2, app.screen.height / 2);
        textStandart.interactive = true;
        textStandart.buttonMode = true;
        textStandart.on('pointerdown', onButtonDownIntro);
        containerIntro.addChild(textStandart);

        function onButtonDownIntro() {
            containerIntro.destroy();
            start_game();
        }

        function start_game() {

            const containerStart = new PIXI.Container();
            app.stage.addChild(containerStart);

            // const bg = PIXI.Texture.from('./img/1p2.png');
            // const tilingSprite = new PIXI.TilingSprite(
            //     bg,
            //     app.screen.width,
            //     app.screen.height,
            // );
            // containerStart.addChild(tilingSprite);

            const textPlayer1 = new PIXI.Text(arrayTextPlayer1[0], {
                fontFamily: 'sans-serif',
                fontSize: 20,
                fill: arrayTextPlayer1[1],
                align: 'left',
            });
            textPlayer1.anchor.set(0.5);
            textPlayer1.x = arrayTextPlayer1[2];
            textPlayer1.y = arrayTextPlayer1[3];
            containerStart.addChild(textPlayer1);

            const textPlayer2 = new PIXI.Text(arrayTextPlayer2[0], {
                fontFamily: 'sans-serif',
                fontSize: 20,
                fill: arrayTextPlayer1[1],
                align: 'left',
            });
            textPlayer2.anchor.set(0.5);
            textPlayer2.x = arrayTextPlayer2[2];
            textPlayer2.y = arrayTextPlayer2[3];
            containerStart.addChild(textPlayer2);

            const textGame = new PIXI.Text('', {
                fontFamily: 'sans-serif',
                fontSize: 20,
                fill: arrayTextPlayer1[1],
                align: 'left',
            });
            textGame.anchor.set(0.5);
            textGame.x = app.screen.width / 2;
            textGame.y = app.screen.height / 2 - 150;
            containerStart.addChild(textGame);

            const oponente = new PIXI.Sprite(arrayCarinha[0]);
            oponente.anchor.set(0.5);
            oponente.x = app.screen.width / 2;
            oponente.y = app.screen.height / 2 - 75;
            containerStart.addChild(oponente);

            for (let i = 0; i < 3; i++) {
                const button = new PIXI.Sprite(arrayTexture[i]);
                button.anchor.set(0.5);
                button.x = buttonPositions[i * 2];
                button.y = buttonPositions[i * 2 + 1];
                button.interactive = true;
                button.buttonMode = true;
                button.on('pointerdown', () => {
                    // Muda as imagens do oponente
                    let maquina = Math.floor(Math.random() * (3)) + 1;
                    if (maquina === 1) {
                        oponente.texture = arrayCarinha[1];
                    }
                    else if (maquina === 2) {
                        oponente.texture = arrayCarinha[2];
                    }
                    else {
                        oponente.texture = arrayCarinha[3];
                    }

                    // Empate
                    if (maquina === (i + 1)) {
                        textGame.text = 'Empate';
                    }
                    // Ganhou
                    else if ((i === 0 && maquina === 3) || (i === 1 && maquina === 1) || (i === 2 && maquina === 2)) {
                        pontuacao1 = pontuacao1 + 1;
                        textPlayer1.text = pontuacao1;
                        textGame.text = 'Ganhou';
                    }
                    // Perdeu
                    else {
                        pontuacao2 = pontuacao2 + 1;
                        textPlayer2.text = pontuacao2;
                        textGame.text = 'Perdeu';
                    }
                    ganhouPerdeu();
                })
                containerStart.addChild(button);
                buttons.push(button);
            }

            function ganhouPerdeu() {
                if (pontuacao1 === 10) {
                    containerStart.destroy();
                    const containerGanhou = new PIXI.Container();
                    app.stage.addChild(containerGanhou);
                    createText("Você ganhou!\nQuer tentar denovo?", '0x000000', app.screen.width / 2, app.screen.height / 2, true, containerGanhou, init, true)
                }
                else if (pontuacao2 === 10) {
                    containerStart.destroy();
                    const containerPerdeu = new PIXI.Container();
                    app.stage.addChild(containerPerdeu);
                    createText("Você perdeu\nQuer tentar denovo?", '0x000000', app.screen.width / 2, app.screen.height / 2, true, containerPerdeu, init, true)
                }
            }
        }
    }
}

function createText(valor, cor, alignX, alignY, interativo, container, funcLink, destroyer) {
    const basicText = new PIXI.Text(valor, {
        fill: cor,
        fontSize: 20
    });
    basicText.anchor.set(.5);
    basicText.x = alignX;
    basicText.y = alignY;
    if (interativo === true) {
        basicText.interactive = true;
        basicText.cursor = 'pointer';
        basicText.on('pointerdown', () => {
            if (destroyer === true) {
                container.destroy();
            }
            funcLink();
        })
    }
    container.addChild(basicText);
}