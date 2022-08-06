PIXI.settings.RESOLUTION = 3;

let app;

window.onload = function () {

    if (innerWidth >= 767) {
        app = new PIXI.Application(
            {
                width: 1280,
                height: 600,
                backgroundColor: 0x000000
            }
        );
    }
    else {

        app = new PIXI.Application(
            {
                width: 600,
                height: 600,
                backgroundColor: 0x000000
            }
        );
    }

    document.body.appendChild(app.view);

    let arrayAnimation = ['anima0.png', 'anima1.png', 'anima2.png', 'anima3.png'];
    let arrayMonsters = ['Rat.png', 'Slime.png', 'Hornet.png', 'Imp.png', 'Scorpion.png', 'Spider.png'];

    let exp = 0;
    let xpGain = 50;
    // let xpGain = Math.floor(Math.random() * (50)) + 1;

    window.WebFontConfig = {
        google: {
            families: ['Share Tech Mono'],
        },

        active() {
            init();
        },
    };

    (function () {
        const wf = document.createElement('script');
        wf.src = `${document.location.protocol === 'https:' ? 'https' : 'http'
            }://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`;
        wf.type = 'text/javascript';
        wf.async = 'true';
        const s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
    }());

    function init() {
        const style = new PIXI.TextStyle({
            fontFamily: 'Share Tech Mono',
            fontSize: 28,
            fontWeight: '500',
            fill: '#ffffff'
        });


        voltando()

        function voltando() {

            let pontosMonstro = 5;
            let maxPontosMonstro = pontosMonstro;

            let pontos = 10;
            let maxPontos = pontos;

            const container = new PIXI.Container();
            app.stage.addChild(container);

            // ? SOUND EFFECT
            const Slash1 = PIXI.sound.Sound.from('./sound/Slash1.ogg');
            Slash1.volume = 0.05;
            const Evasion1 = PIXI.sound.Sound.from('./sound/Evasion1.ogg');
            Evasion1.volume = 0.05;
            const Slash5 = PIXI.sound.Sound.from('./sound/Slash5.ogg');
            Slash5.volume = 0.05;

            // ? BGM
            const lose = PIXI.sound.Sound.from('./sound/cantus_prossequitur.ogg');
            lose.volume = 0.15;
            const win = PIXI.sound.Sound.from('./sound/cantus_noster_prossequitur.ogg');
            win.volume = 0.15;
            const battle = PIXI.sound.Sound.from('./sound/base_per.ogg');
            battle.volume = 0.2;
            battle.loop = true;

            battle.play();

            //CIRCULOS
            function circulos() {

                const circle1 = PIXI.Sprite.from('./img/circle1.png');
                const circle2 = PIXI.Sprite.from('./img/circle2.png');

                circle1.anchor.set(0.5);
                circle2.anchor.set(0.5);

                circle1.x = app.screen.width / 2;
                circle1.y = app.screen.height / 2;
                circle2.x = app.screen.width / 2;
                circle2.y = app.screen.height / 2;

                app.stage.addChild(circle1);
                app.stage.addChild(circle2);

                app.ticker.add(() => {
                    circle1.rotation += 0.0015;
                    circle2.rotation -= 0.003;
                });
            }

            if (exp === 0) {
                circulos();
            }

            const monster = PIXI.Sprite.from(`./img/enemy/${arrayMonsters[Math.floor(Math.random() * (6)) + 0]}`);
            monster.anchor.set(0.5);
            monster.x = app.screen.width / 2;
            monster.y = app.screen.height / 2 - 50;
            container.addChild(monster);

            function apagandoTudo() {
                while (container.children[0]) {
                    container.removeChild(container.children[0])
                }
            }

            function animacao() {
                arrayAnimation.forEach((e, i) => {
                    const anima = PIXI.Sprite.from(`./img/animation/${arrayAnimation[i]}`);
                    // const anima = PIXI.Sprite.from(`./img/animation/anima0.png`);
                    anima.anchor.set(0.5);
                    anima.x = app.screen.width / 2;
                    anima.y = app.screen.height / 2 - 50;
                    container.addChild(anima);
                    setTimeout(() => {
                        container.removeChild(anima);
                    }, 100)
                })
            }

            const textureButton0 = PIXI.Texture.from('./img/pedra.png');
            const textureButton1 = PIXI.Texture.from('./img/papel.png');
            const textureButton2 = PIXI.Texture.from('./img/tesoura.png');
            const array = [textureButton0, textureButton1, textureButton2];
            const buttons = [];

            // SIMBOLOS
            const buttonPositions = [
                app.screen.width / 2 - 75, app.screen.height / 2 + 55,
                app.screen.width / 2, app.screen.height / 2 + 55,
                app.screen.width / 2 + 75, app.screen.height / 2 + 55,
            ];

            for (let i = 0; i < 3; i++) {
                const button = new PIXI.Sprite(array[i]);
                button.anchor.set(0.5);
                button.x = buttonPositions[i * 2];
                button.y = buttonPositions[i * 2 + 1];
                button.interactive = true;
                button.buttonMode = true;
                button.on('pointerdown', onButtonUp)

                function onButtonUp() {
                    let maquina = Math.floor(Math.random() * (3)) + 1;
                    if (maquina === (i + 1)) {
                        Evasion1.play();
                        resultText.text = 'Esquivou!';
                        pontosText.text = 'HP: ' + pontos + '/' + maxPontos + '\nEXP: ' + exp;
                        pontosTextMonster.text = 'HP: ' + pontosMonstro + '/' + maxPontosMonstro;
                        // document.body.style.transition = '.5s';
                        // document.body.style.filter = 'hue-rotate(0deg)';
                        ganhandoPerdendo()
                        gsap.to(monster, {
                            y: app.screen.height / 2 - 75, duration: 0.1, repeat: 1, yoyo: true,
                        });
                    }
                    else if ((i === 0 && maquina === 3) || (i === 1 && maquina === 1) || (i === 2 && maquina === 2)) {
                        Slash1.play();
                        resultText.text = 'Você ataca!';
                        pontosText.text = 'HP: ' + pontos + '/' + maxPontos + '\nEXP: ' + exp;
                        pontosMonstro = pontosMonstro - 1;
                        pontosTextMonster.text = 'HP: ' + pontosMonstro + '/' + maxPontosMonstro;
                        // document.body.style.transition = '.5s';
                        // document.body.style.filter = 'hue-rotate(0deg)';
                        ganhandoPerdendo()
                        animacao();
                    }
                    else {
                        Slash5.play();
                        resultText.text = 'Recebe dano!';
                        pontos = pontos - 1;
                        pontosText.text = 'HP: ' + pontos + '/' + maxPontos + '\nEXP: ' + exp;
                        pontosTextMonster.text = 'HP: ' + pontosMonstro + '/' + maxPontosMonstro;
                        // document.body.style.transition = '.5s';
                        // document.body.style.filter = 'hue-rotate(130deg)';
                        ganhandoPerdendo();
                        gsap.to(monster, {
                            y: app.screen.height / 2 - 20, duration: 0.1, repeat: 1, yoyo: true,
                        });
                    }
                }
                container.addChild(button);
                buttons.push(button);

            }

            function ganhandoPerdendo() {
                if (pontosMonstro <= 0) {
                    battle.stop();
                    win.play();
                    exp = exp + xpGain;
                    // alert("Ganhou o jogo!");
                    apagandoTudo()
                    const style = new PIXI.TextStyle({
                        fontFamily: 'Share Tech Mono',
                        fontSize: 28,
                        fontWeight: 500,
                        fill: '#ffffff', // gradient
                    });

                    const basicText = new PIXI.Text('Parabéns', style);
                    basicText.anchor.set(0.5);
                    basicText.x = app.screen.width / 2;
                    basicText.y = app.screen.height / 2 - 75;
                    container.addChild(basicText);

                    const style2 = new PIXI.TextStyle({
                        fontFamily: 'Share Tech Mono',
                        fontSize: 18,
                        fontWeight: 500,
                        fill: '#ffffff', // gradient
                        align: 'center',
                    });
                    const descText = new PIXI.Text('Você derrotou o monstro!\n\n +' + xpGain + ' EXP', style2);
                    descText.anchor.set(0.5);
                    descText.x = app.screen.width / 2;
                    descText.y = app.screen.height / 2;
                    container.addChild(descText);

                    const tryText = new PIXI.Text('Continuar →', style2);
                    tryText.anchor.set(0.5);
                    tryText.x = app.screen.width / 2;
                    tryText.y = app.screen.height / 2 + 100;

                    tryText.interactive = true;
                    tryText.buttonMode = true;
                    tryText.on('pointerdown', onClick);
                    container.addChild(tryText);

                    function onClick() {
                        win.stop();
                        container.destroy({
                            children: true, texture: true,
                            baseTexture: true
                        });
                        voltando();
                    }
                }
                else if (pontos <= 0) {
                    battle.stop();
                    lose.play();
                    exp = exp + xpGain;
                    // alert("Perdeu o jogo!");
                    apagandoTudo()
                    const style = new PIXI.TextStyle({
                        fontFamily: 'Share Tech Mono',
                        fontSize: 28,
                        fontWeight: 500,
                        fill: '#ffffff', // gradient
                    });

                    const basicText = new PIXI.Text('Fim de jogo', style);
                    basicText.anchor.set(0.5);
                    basicText.x = app.screen.width / 2;
                    basicText.y = app.screen.height / 2 - 75;
                    container.addChild(basicText);

                    const style2 = new PIXI.TextStyle({
                        fontFamily: 'Share Tech Mono',
                        fontSize: 18,
                        fontWeight: 500,
                        fill: '#ffffff', // gradient

                    });
                    const descText = new PIXI.Text('Parece que hoje você\nfoi derrotado...', style2);
                    descText.anchor.set(0.5);
                    descText.x = app.screen.width / 2;
                    descText.y = app.screen.height / 2;
                    container.addChild(descText);

                    // SE PERDER... 
                    const tryText = new PIXI.Text('Tentar novamente', style2);
                    tryText.anchor.set(0.5);
                    tryText.x = app.screen.width / 2;
                    tryText.y = app.screen.height / 2 + 100;

                    tryText.interactive = true;
                    tryText.buttonMode = true;
                    tryText.on('pointerdown', onClick);

                    function onClick() {
                        window.location.reload();
                    }
                    container.addChild(tryText);
                }
            }

            resultado = 'Escolha um simbolo';

            const pontosText = new PIXI.Text('HP: ' + pontos + '/' + maxPontos + '\nEXP: ' + exp, {
                fontFamily: 'Share Tech Mono',
                fontSize: 16,
                fontWeight: 500,
                fill: '#ffffff',
                align: 'center',
            });
            pontosText.anchor.set(0.5);
            pontosText.x = app.screen.width / 2;
            pontosText.y = app.screen.height / 2 + 110;
            container.addChild(pontosText);

            const pontosTextMonster = new PIXI.Text('HP: ' + pontosMonstro + '/' + maxPontosMonstro, {
                fontFamily: 'Share Tech Mono',
                fontSize: 18,
                fontWeight: 500,
                fill: '#ffffff',
            });

            pontosTextMonster.anchor.set(0.5);
            pontosTextMonster.x = app.screen.width / 2;
            pontosTextMonster.y = app.screen.height / 2 - 120;
            container.addChild(pontosTextMonster);

            const resultText = new PIXI.Text(resultado, {
                fontFamily: 'Share Tech Mono',
                fontSize: 14,
                fontWeight: 500,
                fill: '#ffffff',
            });

            resultText.anchor.set(0.5);
            resultText.x = app.screen.width / 2;
            resultText.y = app.screen.height / 2 + 20;
            container.addChild(resultText);
        }
    }
}