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

    let upou = false;
    let exp = 0;
    let xpGain = 50;
    // let xpGain = Math.floor(Math.random() * (50)) + 1;
    let nivel = 1;

    let apromora1, apromora2, apromora3;

    let status = {
        atk: 1,
        maxHp: 10,
        hp: 10,
        potion: 0,
    }

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

        const circle1Intro = PIXI.Sprite.from('./img/circle1.png');
        const circle2Intro = PIXI.Sprite.from('./img/circle2.png');
        if (localStorage.getItem("key") == 1) {
            circle1Intro.anchor.set(0.5);
            circle1Intro.x = app.screen.width / 2;
            circle1Intro.y = app.screen.height / 2;
            app.stage.addChild(circle1Intro);
            app.ticker.add(() => {
                circle1Intro.rotation += 0.0015;
            });
        }
        else if (localStorage.getItem("key") == 2) {
            circle1Intro.anchor.set(0.5);
            circle2Intro.anchor.set(0.5);
            circle1Intro.x = app.screen.width / 2;
            circle1Intro.y = app.screen.height / 2;
            circle2Intro.x = app.screen.width / 2;
            circle2Intro.y = app.screen.height / 2;
            app.stage.addChild(circle1Intro);
            app.stage.addChild(circle2Intro);
            app.ticker.add(() => {
                circle1Intro.rotation += 0.0015;
                circle2Intro.rotation -= 0.003;
            });
        }
        else {

        }

        // ? SOUND EFFECT
        const Slash1 = PIXI.sound.Sound.from('./sound/Slash1.ogg');
        Slash1.volume = 0.05;
        const Evasion1 = PIXI.sound.Sound.from('./sound/Evasion1.ogg');
        Evasion1.volume = 0.05;
        const Slash5 = PIXI.sound.Sound.from('./sound/Slash5.ogg');
        Slash5.volume = 0.05;
        const soundClick = PIXI.sound.Sound.from('./sound/Cursor1.ogg');
        soundClick.volume = 0.25;

        // ? BGM
        const lose = PIXI.sound.Sound.from('./sound/cantus_prossequitur.ogg');
        lose.volume = 0.25;
        const win = PIXI.sound.Sound.from('./sound/cantus_noster_prossequitur.ogg');
        win.volume = 0.25;
        const battle = PIXI.sound.Sound.from('./sound/base_per.ogg');
        battle.volume = 0.25;
        battle.loop = true;

        //& CIRCULOS
        function circulos1() {
            const circle1 = PIXI.Sprite.from('./img/circle1.png');
            circle1.anchor.set(0.5);
            circle1.x = app.screen.width / 2;
            circle1.y = app.screen.height / 2;
            app.stage.addChild(circle1);
            app.ticker.add(() => {
                circle1.rotation += 0.0015;
            });
        }

        function circulos2() {
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

        const textureButton0I = PIXI.Sprite.from('./img/pedra.png');
        const textureButton1I = PIXI.Sprite.from('./img/papel.png');
        const textureButton2I = PIXI.Sprite.from('./img/tesoura.png');
        textureButton0I.anchor.set(0.5);
        textureButton1I.anchor.set(0.5);
        textureButton2I.anchor.set(0.5);
        textureButton0I.x = app.screen.width / 2 - 75;
        textureButton0I.y = app.screen.height / 2 + 95;
        textureButton1I.x = app.screen.width / 2;
        textureButton1I.y = app.screen.height / 2 + 95;
        textureButton2I.x = app.screen.width / 2 + 75;
        textureButton2I.y = app.screen.height / 2 + 95;


        // // ! ENREDO
        const textStandart = new PIXI.Text('Começar', {
            fontFamily: 'Share Tech Mono',
            fontSize: 30,
            fill: 'white',
            align: 'center',
        });
        textStandart.anchor.set(0.5);
        textStandart.position.set(app.screen.width / 2, app.screen.height / 2);
        textStandart.interactive = true;
        textStandart.buttonMode = true;
        textStandart.on('pointerdown', onButtonDownIntro);
        app.stage.addChild(textStandart);

        let eventIntro = 1;

        function onButtonDownIntro() {
            textStandart.interactive = false;

            if (eventIntro === 1) {
                soundClick.play();
                textoFade(textStandart, 'out');
                if (localStorage.getItem("key") == 1) {
                    textoFade(circle1Intro, 'out');
                }
                else if (localStorage.getItem("key") == 2) {
                    textoFade(circle1Intro, 'out');
                    textoFade(circle2Intro, 'out');
                }
                setTimeout(myFunction, 1000)
                function myFunction() {
                    capitulo_intro()
                }
            }
        }

        // INTRODUÇÃO
        function capitulo_intro() {
            // introSound.play();
            textoFade(textStandart, 'in', "Use para vencer seus inimigos\n\nComplete o portal para sair", 18, 0, 0, 'white');
            app.stage.addChild(textureButton0I);
            app.stage.addChild(textureButton1I);
            app.stage.addChild(textureButton2I);
            setTimeout(myFunction11, 3000)
            function myFunction11() {
                textoFade(textStandart, 'out');
                textoFade(textureButton0I, 'out');
                textoFade(textureButton1I, 'out');
                textoFade(textureButton2I, 'out');
                setTimeout(myFunction12, 2000)
                function myFunction12() {
                    start_game();
                }
            }
        }
        // ! FIM - ENREDO

        // start_game();
        function start_game() {

            let statusMonstro = {
                atk: (1 * nivel),
                hp: (5 * nivel),
                maxHp: (5 * nivel),
            }

            battle.play();

            status.hp = status.maxHp;
            statusMonstro.hp = statusMonstro.maxHp;

            const container = new PIXI.Container();
            app.stage.addChild(container);

            if (exp === 0) {
                if (localStorage.getItem("key") == 1) {
                    circulos1();
                }
                else if (localStorage.getItem("key") == 2) {
                    circulos2();
                }
            }

            const monster = (nivel === 5 ? PIXI.Sprite.from(`./img/enemy/boss.png`) : PIXI.Sprite.from(`./img/enemy/${arrayMonsters[Math.floor(Math.random() * (6)) + 0]}`));
            monster.anchor.set(0.5);
            monster.x = app.screen.width / 2;
            monster.y = app.screen.height / 2 - 50;
            container.addChild(monster);

            function apagandoTudo() {
                while (container.children[0]) {
                    container.removeChild(container.children[0])
                }
            }

            // function aprimoramento() {
            //     if (apromora1 > apromora2 && apromora1 > apromora3) {
            //         status.atk = status.atk + 1;
            //     }
            //     else if (apromora2 > apromora1 && apromora2 > apromora3) {
            //         status.maxHp = status.maxHp + 5;
            //     }
            //     else if (apromora3 > apromora1 && apromora3 > apromora2) {
            //         xpGain = xpGain + 50;
            //     }

            //     apromora1 = 0;
            //     apromora2 = 0;
            //     apromora3 = 0;
            // }

            //^ ANIMAÇÃO AO ATACAR
            function animacao() {
                arrayAnimation.forEach((e, i) => {
                    const anima = PIXI.Sprite.from(`./img/animation/${arrayAnimation[i]}`);
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
                    // if (i === 0) {
                    //     apromora1 = apromora1 + 1;
                    // }
                    // else if (i === 1) {
                    //     apromora2 = apromora2 + 1;
                    // }
                    // else if (i === 2) {
                    //     apromora3 = apromora3 + 1;
                    // }
                    let maquina = Math.floor(Math.random() * (3)) + 1;
                    if (maquina === (i + 1)) {
                        Evasion1.play();
                        resultText.text = 'Esquivou!';
                        pontosText.text = 'HP: ' + status.hp + '/' + status.maxHp + '\nEXP: ' + exp + (nivel === 1 ? "/50" : nivel === 2 ? "/100" : nivel === 3 ? "/150" : nivel === 4 ? "/250" : '') + '\nAtak: ' + status.atk;
                        pontosTextMonster.text = 'HP: ' + statusMonstro.hp + '/' + statusMonstro.maxHp;
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
                        pontosText.text = 'HP: ' + status.hp + '/' + status.maxHp + '\nEXP: ' + exp + (nivel === 1 ? "/50" : nivel === 2 ? "/100" : nivel === 3 ? "/150" : nivel === 4 ? "/250" : '') + '\nAtak: ' + status.atk;
                        statusMonstro.hp = statusMonstro.hp - status.atk;
                        pontosTextMonster.text = 'HP: ' + statusMonstro.hp + '/' + statusMonstro.maxHp;
                        // document.body.style.transition = '.5s';
                        // document.body.style.filter = 'hue-rotate(0deg)';
                        ganhandoPerdendo()
                        animacao();
                    }
                    else {
                        Slash5.play();
                        resultText.text = 'Recebe dano!';
                        status.hp = status.hp - 1;
                        pontosText.text = 'HP: ' + status.hp + '/' + status.maxHp + '\nEXP: ' + exp + (nivel === 1 ? "/50" : nivel === 2 ? "/100" : nivel === 3 ? "/150" : nivel === 4 ? "/250" : '') + '\nAtak: ' + status.atk;
                        pontosTextMonster.text = 'HP: ' + statusMonstro.hp + '/' + statusMonstro.maxHp;
                        document.body.style.transition = '.5s';
                        // document.body.style.filter = 'hue-rotate(130deg)';
                        ganhandoPerdendo();
                        gsap.to(monster, {
                            y: app.screen.height / 2 - 20, duration: 0.1, repeat: 1, yoyo: true,
                        });
                        // setTimeout(() => {
                        //     document.body.style.transition = '.5s';
                        //     document.body.style.filter = 'hue-rotate(0deg)';
                        // }, 300)
                    }
                }
                container.addChild(button);
                buttons.push(button);
            }

            function ganhandoPerdendo() {
                if (statusMonstro.hp <= 0) {
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

                    const style3 = new PIXI.TextStyle({
                        fontFamily: 'Share Tech Mono',
                        fontSize: 14,
                        fontWeight: 500,
                        fill: '#ffffff', // gradient
                        align: 'center',
                    });

                    const descText = new PIXI.Text((nivel === 5 ? 'Você derrotou o boss!\n\nVocê recebeu parte do portal' : `Você derrotou o monstro!\n\n +` + xpGain + ' EXP'), style2);
                    descText.anchor.set(0.5);
                    descText.x = app.screen.width / 2;
                    descText.y = app.screen.height / 2 - 20;
                    container.addChild(descText);

                    if (exp >= 50 && nivel === 1 ||
                        exp >= 100 && nivel === 2 ||
                        exp >= 150 && nivel === 3 ||
                        exp >= 250 && nivel === 4) {
                        nivel = nivel + 1;
                        const lvlText = new PIXI.Text('Subiu para o nível ' + nivel, style2);
                        lvlText.anchor.set(0.5);
                        lvlText.x = app.screen.width / 2;
                        lvlText.y = app.screen.height / 2 + 25;
                        container.addChild(lvlText);
                        upou = true;
                    }

                    if (upou === true) {
                        const atakText = new PIXI.Text('Atak▲', style3);
                        atakText.anchor.set(0.5);
                        atakText.x = app.screen.width / 2 - 75;
                        atakText.y = app.screen.height / 2 + 75;

                        atakText.interactive = true;
                        atakText.buttonMode = true;
                        atakText.on('pointerdown', onClickAtak);
                        container.addChild(atakText);
                        function onClickAtak() {
                            status.atk = status.atk + 1;
                            win.stop();
                            container.destroy({
                                children: true, texture: true,
                                baseTexture: true
                            });
                            upou = false;
                            start_game();
                        }

                        const hpText = new PIXI.Text('HP▲', style3);
                        hpText.anchor.set(0.5);
                        hpText.x = app.screen.width / 2;
                        hpText.y = app.screen.height / 2 + 75;

                        hpText.interactive = true;
                        hpText.buttonMode = true;
                        hpText.on('pointerdown', onClickHp);
                        container.addChild(hpText);
                        function onClickHp() {
                            status.maxHp = status.maxHp + 5;
                            win.stop();
                            container.destroy({
                                children: true, texture: true,
                                baseTexture: true
                            });
                            upou = false;
                            start_game();
                        }

                        const expText = new PIXI.Text('EXP▲', style3);
                        expText.anchor.set(0.5);
                        expText.x = app.screen.width / 2 + 75;
                        expText.y = app.screen.height / 2 + 75;

                        expText.interactive = true;
                        expText.buttonMode = true;
                        expText.on('pointerdown', onClickExp);
                        container.addChild(expText);
                        function onClickExp() {
                            xpGain = xpGain + 150;
                            win.stop();
                            container.destroy({
                                children: true, texture: true,
                                baseTexture: true
                            });
                            upou = false;
                            start_game();
                        }
                    }
                    else {
                        const tryText = new PIXI.Text((nivel === 5 ? 'Fim de jogo' : "Continuar →"), style2);
                        tryText.anchor.set(0.5);
                        tryText.x = app.screen.width / 2;
                        tryText.y = app.screen.height / 2 + 120;

                        tryText.interactive = true;
                        tryText.buttonMode = true;
                        tryText.on('pointerdown', onClick);
                        container.addChild(tryText);
                        function onClick() {
                            if (nivel === 5) {
                                if (localStorage.getItem("key") == 1) {
                                    localStorage.setItem("key", 2)
                                }
                                else {
                                    localStorage.setItem("key", 1);
                                }
                                window.location.reload();
                            }
                            else {
                                win.stop();
                                container.destroy({
                                    children: true, texture: true,
                                    baseTexture: true
                                });
                                start_game();
                            }
                        }
                    }
                    // aprimoramento();
                }
                else if (status.hp <= 0) {
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

            const pontosText = new PIXI.Text('HP: ' + status.hp + '/' + status.maxHp + '\nEXP: ' + exp + (nivel === 1 ? "/50" : nivel === 2 ? "/100" : nivel === 3 ? "/150" : nivel === 4 ? "/250" : '') + '\nAtak: ' + status.atk, {
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

            const pontosTextMonster = new PIXI.Text('HP: ' + statusMonstro.hp + '/' + statusMonstro.maxHp, {
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










//TODO FADE BACKGROUND
function bgFade(fade, tilingSprite) {
    if (fade === 'in') {
        fade = 1;
        tilingSprite.alpha = 0;
        TweenMax.to(tilingSprite, 3.0, { alpha: fade, repeat: 0, yoyo: false });
        app.stage.addChild(tilingSprite);
    }
    else if (fade === 'out') {
        fade = 0;
        TweenMax.to(tilingSprite, 3.0, { alpha: fade, repeat: 0, yoyo: false });
        setTimeout(() => {
            app.stage.removeChild(tilingSprite);
        }, 3000)
    }
}

//TODO FUNÇÕES E MECANISMOS
function textoFade(textSample, fade, textoIn, tamanho, w, h, color) {
    if (fade === 'in') {
        fade = 1;
        if (tamanho !== '') {
            textSample.style.fontSize = tamanho;
            textSample.style.align = 'center';
        }
        if (color !== '') {
            textSample.style.fill = color;
        }
        if (textoIn !== '') {
            textSample.text = textoIn;
        }
        textSample.anchor.set(0.5);
        textSample.alpha = 0;
        if (w !== '') {
            textSample.x = app.screen.width / 2 + w;
        }
        if (h !== '') {
            textSample.y = app.screen.height / 2 + h;
        }
        TweenMax.to(textSample, 1.0, { alpha: fade, repeat: 0, yoyo: false });
    }
    else if (fade === 'out') {
        fade = 0;
        TweenMax.to(textSample, 1.0, { alpha: fade, repeat: 0, yoyo: false });
    }
}
