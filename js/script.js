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
    let nivel = 1;

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
        lose.volume = 0.35;
        const win = PIXI.sound.Sound.from('./sound/cantus_noster_prossequitur.ogg');
        win.volume = 0.35;
        const battle = PIXI.sound.Sound.from('./sound/base_per.ogg');
        battle.volume = 0.5;
        battle.loop = true;

        //& CIRCULOS
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

        const circle1 = PIXI.Sprite.from('./img/circle1.png');
        const circle2 = PIXI.Sprite.from('./img/circle2.png');
        circle1.anchor.set(0.5);
        circle2.anchor.set(0.5);
        circle1.x = app.screen.width / 2;
        circle1.y = app.screen.height / 2;
        circle2.x = app.screen.width / 2;
        circle2.y = app.screen.height / 2;

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


        // ! ENREDO
        // const textStandart = new PIXI.Text('Circulo Arcano', {
        //     fontFamily: 'Share Tech Mono',
        //     fontSize: 30,
        //     fill: 'white',
        //     align: 'center',
        // });
        // textStandart.anchor.set(0.5);
        // textStandart.position.set(app.screen.width / 2, app.screen.height / 2);
        // textStandart.interactive = true;
        // textStandart.buttonMode = true;
        // textStandart.on('pointerdown', onButtonDownIntro);
        // app.stage.addChild(textStandart);

        // let eventIntro = 1;

        // function onButtonDownIntro() {
        //     textStandart.interactive = false;

        //     if (eventIntro === 1) {
        //         soundClick.play();
        //         textoFade(textStandart, 'out');
        //         textoFade(circle1Intro, 'out');
        //         textoFade(circle2Intro, 'out');
        //         setTimeout(myFunction, 3000)
        //         function myFunction() {
        //             textoFade(textStandart, 'in', "Cuidado\n\nO conteúdo a seguir pode ser contra\nindicado para menores de 18 anos", 14, 0, 0, 'white');
        //             setTimeout(myFunction1, 3000)
        //             function myFunction1() {
        //                 textoFade(textStandart, 'out');
        //                 setTimeout(myFunction2, 3000)
        //                 function myFunction2() {
        //                     textoFade(textStandart, 'in', "Criado por DevAndreAkira", 14, 0, 0, 'white');
        //                     setTimeout(myFunction3, 5000)
        //                     function myFunction3() {
        //                         textoFade(textStandart, 'out');
        //                         capitulo_intro()
        //                         // start_game()
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }

        // // INTRODUÇÃO
        // function capitulo_intro() {
        //     // introSound.play();
        //     textoFade(textStandart, 'in', "Se quero ficar sozinho, paro,\ntiro o giz do meu bolso e \ntraço um círculo à minha\nvolta.", 18, 0, 0, 'white');
        //     setTimeout(myFunction1, 8000)
        //     function myFunction1() {
        //         textoFade(textStandart, 'out');
        //         setTimeout(myFunction2, 3000)
        //         function myFunction2() {
        //             textoFade(textStandart, 'in', "Quando estou dentro do meu\ncírculo, não escuto mais\no barulho da rua,\nas ondas do mar\nou o canto dos passarinhos.", 18, 0, 0, 'white');
        //             setTimeout(myFunction3, 10000)
        //             function myFunction3() {
        //                 textoFade(textStandart, 'out');
        //                 setTimeout(myFunction4, 3000)
        //                 function myFunction4() {
        //                     textoFade(textStandart, 'in', "Dentro do círculo não se \nsente mais frio, dor ou fome.\nO tempo, ele também para.\nMergulha-se na abstração como\nnum sonho protetor.\n\nA gente se torna o centro\ndo círculo.", 18, 0, 0, 'white');
        //                     setTimeout(myFunction5, 10000)
        //                     function myFunction5() {
        //                         textoFade(textStandart, 'out');
        //                         setTimeout(myFunction6, 3000)
        //                         function myFunction6() {
        //                             textoFade(textStandart, 'in', "Desde que o círculo foi\ninventado, o mundo ficou\nmelhor.\n\nNão há guerra, nem fome,\nnem catástrofe.\n\nA criminalidade diminuiu.\n\nÉ só algo nos atingir que\ntraçamos um círculo em\nvolta da gente.", 18, 0, 0, 'white');
        //                             setTimeout(myFunction7, 10000)
        //                             function myFunction7() {
        //                                 textoFade(textStandart, 'out');
        //                                 setTimeout(myFunction8, 3000)
        //                                 function myFunction8() {
        //                                     textoFade(textStandart, 'in', "Dizem que os círculos escondem\numa armadilha, que a\ngente entra algumas\nvezes para nunca\nmais sair.\n\nSimplesmente esquecemos\nde nossa existência.", 18, 0, 0, 'white');
        //                                     setTimeout(myFunction9, 15000)
        //                                     function myFunction9() {
        //                                         textoFade(textStandart, 'out');
        //                                         setTimeout(myFunction10, 3000)
        //                                         function myFunction10() {
        //                                             textoFade(textStandart, 'in', "Parte de mim ainda existe.\n\nCorpo, espírito e alma.\n\nUsarei com sabedoria para\nvencer as armadilhas.", 18, 0, 0, 'white');
        //                                             app.stage.addChild(textureButton0I);
        //                                             app.stage.addChild(textureButton1I);
        //                                             app.stage.addChild(textureButton2I);
        //                                             setTimeout(myFunction11, 8000)
        //                                             function myFunction11() {
        //                                                 textoFade(textStandart, 'out');
        //                                                 textoFade(textureButton0I, 'out');
        //                                                 textoFade(textureButton1I, 'out');
        //                                                 textoFade(textureButton2I, 'out');
        //                                                 setTimeout(myFunction12, 3000)
        //                                                 function myFunction12() {
        //                                                     textoFade(textStandart, 'in', "\nParte de mim tenta\nentender como vim\nparar aqui.\n\nE parte de mim deseja sair...", 18, 0, 0, 'white');
        //                                                     app.stage.removeChild(textureButton0I);
        //                                                     app.stage.removeChild(textureButton1I);
        //                                                     app.stage.removeChild(textureButton2I);
        //                                                     setTimeout(myFunction13, 3000)
        //                                                     function myFunction13() {
        //                                                         textoFade(textStandart, 'out');
        //                                                     }
        //                                                     setTimeout(() => {
        //                                                         start_game();
        //                                                     }, 10000);
        //                                                 }
        //                                             }
        //                                         }
        //                                     }
        //                                 }
        //                             }
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
        // ! FIM - ENREDO





        start_game();
        function start_game() {
            battle.play();

            let pontosMonstro = 5;
            let maxPontosMonstro = pontosMonstro;
            let pontos = 10;
            let maxPontos = pontos;
            const container = new PIXI.Container();
            app.stage.addChild(container);

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
                    descText.y = app.screen.height / 2 - 20;
                    container.addChild(descText);

                    if (exp >= 50 && nivel === 1) {
                        nivel = nivel + 1;
                        const lvlText = new PIXI.Text('Subiu para o nível ' + nivel, style2);
                        lvlText.anchor.set(0.5);
                        lvlText.x = app.screen.width / 2;
                        lvlText.y = app.screen.height / 2 + 25;
                        container.addChild(lvlText);
                    }

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
                        start_game();
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
        TweenMax.to(textSample, 3.0, { alpha: fade, repeat: 0, yoyo: false });
    }
    else if (fade === 'out') {
        fade = 0;
        TweenMax.to(textSample, 3.0, { alpha: fade, repeat: 0, yoyo: false });
    }
}
