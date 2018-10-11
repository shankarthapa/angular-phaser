import { Component, OnInit } from '@angular/core';
import { Game, AUTO } from 'phaser-ce';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular Phaser';

  game: Game;

  // Constants
  MAX_SPIN_COUNT = 100;
  SPIN_DELAY_MS = 50;
  SPIN_DELAY = 5;

  reel1_index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  reel2_index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  reel3_index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  reel4_index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  reel5_index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // BingoCard_pattern = "0*0*1*2*3*4*5*6*7*8*9*10*11*12*13*14*15*16*17*18*19*20*21*22*23*24*25";
  bingoCard_array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


  // Variables
  spin_count = 0;
  big_win;
  bigWinTimer;
  timer: any;
  spin_timer;
  spinning = false;
  tween;
  credits_text;
  win_text;
  bet_text;
  current_bet_level = 200;
  available_credits = 1000;
  animation;
  gameWindowGrp;
  greenBallGrp;
  BigWin_scale = 0.1;
  loadScreen_Background;
  loadScreen_Animation;
  greenBall_Animation1; greenBall_Animation2; greenBall_Animation3; greenBall_Animation4; greenBall_Animation5;


  spinMusic; stopMusic; buttonMusic;      // Music
  bet_down_btn; bet_up_btn; spin_image;   // Buttons
  sprite1; sprite2; sprite3; sprite4; sprite5; sprite6; sprite7;
  sprite8; sprite9; sprite10; sprite11; sprite12; sprite13; sprite14; sprite15;
  reel1; reel2; reel3; reel4; reel5;

  user_name = 'Eclipse Gaming Systems';
  // TODO Update the user name based on the user entry

/*
reel1_items = ['ace', 'granny', 'jack', 'king', 'ace', 'nine', 'queen', 'red', 'scatter', 'ten', 'wild1', 'wild2', 'wolf'];
reel2_items = ['ace', 'granny', 'jack', 'king', 'ace', 'nine', 'queen', 'red', 'scatter', 'ten', 'wild1', 'wild2', 'wolf'];
reel3_items = ['ace', 'granny', 'jack', 'king', 'ace', 'nine', 'queen', 'red', 'scatter', 'ten', 'wild1', 'wild2', 'wolf'];
reel4_items = ['ace', 'granny', 'jack', 'king', 'ace', 'nine', 'queen', 'red', 'scatter', 'ten', 'wild1', 'wild2', 'wolf'];
reel5_items = ['ace', 'granny', 'jack', 'king', 'ace', 'nine', 'queen', 'red', 'scatter', 'ten', 'wild1', 'wild2', 'wolf'];
*/
reel1_items = ['ace',    'nine', 'wild1', 'red', 'queen', 'red', 'wild2', 'queen', 'nine', 'king', 'granny', 'granny', 'granny'];
reel2_items = ['granny', 'queen', 'wild2', 'king', 'granny', 'nine', 'queen', 'red', 'scatter', 'ten', 'wild1', 'wild2', 'king'];
reel3_items = ['granny', 'red', 'wolf', 'ace', 'ace', 'red', 'king', 'red', 'king', 'granny', 'wild1', 'ace', 'nine'];
reel4_items = ['king', 'scatter', 'jack', 'king', 'granny', 'nine', 'red', 'ace', 'scatter', 'red', 'wild1', 'red', 'scatter'];
reel5_items = ['granny', 'ten', 'king', 'scatter', 'ten', 'nine', 'king', 'red', 'red', 'ten', 'wild1', 'wild2', 'wolf'];



// SOKET class

server_ip = 'ws://10.16.82.82:7777';

/* Constants */
EAPI_MATHREQUEST_GETINITINFO_ID     = 0x1151;
EAPI_MATHREQUEST_PLAYREELS_ID       = 0x1141;
EAPI_MATHREQUEST_CHANGEBET_ID       = 0x1171;
EAPI_MATHREQUEST_CREATEBINGOCARD_ID = 0x1153;
EAPI_MATHREQUEST_CHOOSESCRIPTFROMBINGO_ID = 0x1162;

EAPI_MATHREQUEST_GETINITINFO_CALLBACK_ID = 0x3151;
EAPI_MATHREQUEST_PLAYREELS_CALLBACK_ID   = 0x3141;
EAPI_MATHREQUEST_CHANGEBET_CALLBACK_ID   = 0x3171;
EAPI_MATHREQUEST_CREATEBINGOCARD_CALLBACK_ID = 0x3153;
EAPI_MATHREQUEST_CHOOSESCRIPTFROMBINGO_CALLBACK_ID = 0x3162;

WAIT_FOR_RESPONSE_DELAY_MS = 3000;

isConnectedToServer = false;
websocket;
respTimer;
received_message;
isResponseReceived = false;
game_result_win_amount = 0;
Init_State = 0;
bingoBallWin;
bingoBallDrawValue;
winning_hits;
bingo_hits;
bingoHits_text; bingoWinnintHits_text;

sBingoBallDraw_1 = `70,25,66,69,19,38,63,49,5,47,74,62,24,72,28,58,35,50,64,17,73,56,36,15,53,29,3,33,9,27,20,13,51,8,55,52,39,61,67,57,
75,54,2,21,22,46,65,71,48,40,18,16,30,7,60,37,32,68,1,11,44,43,59,45,12,26,10,34,6,42,4,31,41,14,23`;
sBingoBallDraw_2 = `53,59,56,35,33,18,7,30,65,34,60,15,61,32,52,73,2,41,72,24,6,51,5,37,57,4,62,22,64,27,47,23,44,39,70,55,54,14,58,71,
40,31,28,67,36,43,19,42,26,13,9,17,68,74,21,16,46,63,48,38,12,11,25,3,10,50,1,45,8,66,75,49,20,69,29`;
sBingoBallDraw_3 = `45,17,14,18,40,29,9,68,3,74,20,36,11,50,49,7,60,12,37,58,57,69,26,24,28,48,16,62,10,46,65,5,75,31,56,51,43,39,67,35,
73,15,55,71,1,13,27,25,2,41,22,23,44,30,52,72,38,19,6,70,42,66,4,59,21,64,47,54,53,33,34,61,32,8,63`;
sBingoBallDraw_4 = `41,8,70,26,46,1,57,47,64,40,34,21,53,71,67,74,52,19,42,37,72,56,11,31,36,39,10,38,22,45,17,18,49,7,48,58,23,69,35,51,
27,30,68,59,4,61,29,16,12,6,15,28,25,65,32,60,50,13,24,44,63,2,5,66,75,14,73,62,20,33,54,55,3,9,43`;
sBingoBallDraw_5 = `44,63,26,33,52,38,25,59,66,28,29,57,50,47,36,74,60,24,45,11,14,42,9,7,31,20,71,13,73,54,17,21,3,75,64,58,49,35,43,51,
10,68,69,56,39,27,70,30,72,12,4,19,37,32,61,65,40,15,55,1,5,46,48,2,67,8,16,23,41,53,18,62,6,34,22`;

sBingoBallDrawCount = 0;
stageRef: any;


  constructor() {
    this.stageRef = this;
  }
  ngOnInit() {
    setTimeout( () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.game = new Game(w, h, AUTO, this, { preload: this.preload, create: this.create });
    }, 1000);
  }

  preload() {
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;

    // Loading Screen
    this.game.load.image('loadingBackground', 'assets/GeishaGames/BigAndBadLittleRed/_default/LoadingScreen/Background.png');
    this.game.load.atlasJSONHash('loadingAnimation', 'assets/GeishaGames/BigAndBadLittleRed/_default/LoadingScreen/Animation.png', 'assets/GeishaGames/BigAndBadLittleRed/_default/LoadingScreen/Animation.atlas');
    this.game.load.atlasJSONHash('greenBallAnimation', 'assets/GeishaGames/_Common/_default/Topscreen/bingo/greenBall.png', 'assets/GeishaGames/_Common/_default/Topscreen/bingo/greenBall.atlas');


    // Main Screen Assets
    this.game.load.image('mainBackground', 'assets/GeishaGames/BigAndBadLittleRed/_default/Mainscreen/background.png');
    this.game.load.image('gameReelsbackground', 'assets/GeishaGames/BigAndBadLittleRed/_default/Mainscreen/gameReels.png');
    this.game.load.image('panelBackground', 'assets/GeishaGames/BigAndBadLittleRed/_default/ButtonPanel/PanelBackgrounds/mainMessageBox.png');
    this.game.load.image('mainpanelBackground', 'assets/GeishaGames/BigAndBadLittleRed/_default/ButtonPanel/PanelBackgrounds/mainPanel.png');

    this.game.load.spritesheet('spin', 'assets/GeishaGames/_Common/_default/Spin.png', 277, 125);
    this.game.load.image('betUp', 'assets/GeishaGames/_Common/_default/up.png');
    this.game.load.image('betDown', 'assets/GeishaGames/_Common/_default/down.png');
    this.game.load.image('bingoCard', 'assets/GeishaGames/_Common/_default/ButtonPanel/buttons1080/active/bingoCard_active.png');

    // Load Game Assets
    this.game.load.image('ace',      'assets/GeishaGames/BigAndBadLittleRed/_default/Reels/Static/Ace.png');
    this.game.load.image('granny',   'assets/GeishaGames/BigAndBadLittleRed/_default/Reels/Static/Granny.png');
    this.game.load.image('jack',     'assets/GeishaGames/BigAndBadLittleRed/_default/Reels/Static/Jack.png');
    this.game.load.image('king',     'assets/GeishaGames/BigAndBadLittleRed/_default/Reels/Static/King.png');
    this.game.load.image('logo',     'assets/GeishaGames/BigAndBadLittleRed/_default/Reels/Static/Logo.png');
    this.game.load.image('nine',     'assets/GeishaGames/BigAndBadLittleRed/_default/Reels/Static/Nine.png');
    this.game.load.image('queen',    'assets/GeishaGames/BigAndBadLittleRed/_default/Reels/Static/Queen.png');
    this.game.load.image('red',      'assets/GeishaGames/BigAndBadLittleRed/_default/Reels/Static/Red.png');
    this.game.load.image('scatter',  'assets/GeishaGames/BigAndBadLittleRed/_default/Reels/Static/Scatter.png');
    this.game.load.image('ten',      'assets/GeishaGames/BigAndBadLittleRed/_default/Reels/Static/Ten.png');
    this.game.load.image('wild1',    'assets/GeishaGames/BigAndBadLittleRed/_default/Reels/Static/Wild1.png');
    this.game.load.image('wild2',    'assets/GeishaGames/BigAndBadLittleRed/_default/Reels/Static/Wild2.png');
    this.game.load.image('wolf',     'assets/GeishaGames/BigAndBadLittleRed/_default/Reels/Static/Wolf.png');

    // Animations
    this.game.load.image('bigWin', 'assets/GeishaGames/_Common/_default/BigWin.png');

    // Audio Objects
    this.game.load.audio('reelSpinMusic', ['assets/GeishaGames/BigAndBadLittleRed/_default/Sounds/ReelSpins/ReelSpin_1.wav']);
    this.game.load.audio('reelStopMusic', ['assets/GeishaGames/BigAndBadLittleRed/_default/Sounds/ReelSpins/ReelSpin_stop_1.wav']);
    this.game.load.audio('buttonMusic', ['assets/GeishaGames/BigAndBadLittleRed/_default/Sounds/Buttons/MechanicalButton.wav']);
  }

  create(evt, ref) {
    /* const logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5); */
    this.stageRef = evt.parent;
    evt.parent.loadName();
    // this.debug_init();
    evt.parent.Socket_Init();

    // TODO: Display Login Screen
    // Display Loading Screen.
    // TODO: Move below code to login Button Click Event Handler
    evt.parent.loadScreen_Background = evt.parent.game.add.sprite(0, 0, 'loadingBackground');
    evt.parent.loadScreen_Animation = evt.parent.game.add.sprite(410, 340, 'loadingAnimation');
    evt.parent.loadScreen_Animation.animations.add('run');
    evt.parent.loadScreen_Animation.animations.play('run', 30, true);
    // Start the Timer. TODO: Wait till GetInitInfo response received.
    evt.parent.timer = evt.parent.game.time.create(false);
    evt.parent.timer.loop(2000, evt.parent.LoadCompleted, this);
    evt.parent.timer.start();

  }

  update() {
        if (this.big_win != null) {
            if (this.BigWin_scale <= 0.5) {
              this.BigWin_scale += 0.01;
            }
            this.big_win.scale.setTo(this.BigWin_scale, this.BigWin_scale);
        }
    }

    // Get User Name from the URL
    getUrlVars() {
    }

    // Get User Name
    loadName(): any {
        this.user_name = 'DEMO';
        return this.user_name;
    }

  LoadCompleted() {
    this.stageRef.timer.stop();
    this.stageRef.loadScreen_Background.destroy();
    this.stageRef.loadScreen_Animation.animations.stop();
    this.stageRef.loadScreen_Animation.destroy();
    this.stageRef.LoadMainScreen();
  }

  Create_Reels (firstTime = false) {
      this.reel1 = this.game.add.group();
      this.reel2 = this.game.add.group();
      this.reel3 = this.game.add.group();
      this.reel4 = this.game.add.group();
      this.reel5 = this.game.add.group();

      this.Update_Reels();

      if (!firstTime) {
        this.game.world.bringToTop(this.gameWindowGrp);
          if (this.big_win != null) {
            this.game.world.bringToTop(this.big_win);
          }
      }
  }

  Update_Reels() {
      this.sprite1  = this.reel1.create(50, 50,  this.reel1_items[ this.reel1_index[1]]);
      this.sprite2  = this.reel1.create(50, 250, this.reel1_items[ this.reel1_index[2]]);
      this.sprite3  = this.reel1.create(50, 450, this.reel1_items[ this.reel1_index[3]]);

      this.sprite4  = this.reel2.create(300, 50,  this.reel2_items[ this.reel1_index[1]]);
      this.sprite5  = this.reel2.create(300, 250, this.reel2_items[ this.reel1_index[2]]);
      this.sprite6  = this.reel2.create(300, 450, this.reel2_items[ this.reel1_index[3]]);

      this.sprite7  = this.reel3.create(520, 50,  this.reel3_items[ this.reel1_index[1]]);
      this.sprite8  = this.reel3.create(520, 250, this.reel3_items[ this.reel1_index[2]]);
      this.sprite9  = this.reel3.create(520, 450, this.reel3_items[ this.reel1_index[3]]);

      this.sprite10 = this.reel4.create(750, 50,  this.reel4_items[ this.reel1_index[1]]);
      this.sprite11 = this.reel4.create(750, 250, this.reel4_items[ this.reel1_index[2]]);
      this.sprite12 = this.reel4.create(750, 450, this.reel4_items[ this.reel1_index[3]]);

      this.sprite13 = this.reel5.create(1000, 50,  this.reel5_items[ this.reel1_index[1]]);
      this.sprite14 = this.reel5.create(1000, 250, this.reel5_items[ this.reel1_index[2]]);
      this.sprite15 = this.reel5.create(1000, 450, this.reel5_items[ this.reel1_index[3]]);
  }

  updateTicks()  {}

  Increment_Bet_Click (sprite, pointer) {
      let play_sound = true;

      this.bet_down_btn.alpha = 1;
      if (this.current_bet_level === 25) {
          this.current_bet_level = 50;
      } else if (this.current_bet_level === 50) {
          this.current_bet_level = 100;
      } else if (this.current_bet_level === 100) {
          this.current_bet_level = 150;
      } else if (this.current_bet_level === 150) {
          this.current_bet_level = 200;
          this.bet_up_btn.alpha = .5;
      }else if (this.current_bet_level === 200) {
          this.bet_up_btn.alpha = .5;
          play_sound = false;
      }


      if (play_sound) {
          this.buttonMusic.play();
      }

      this.bet_text.setText(this.current_bet_level);
  }

  Decrement_Bet_Click (sprite, pointer) {
      let play_sound = true;
      this.bet_up_btn.alpha = 1;
      if (this.current_bet_level === 200) {
          this.current_bet_level = 150;
      } else if (this.current_bet_level === 150) {
          this.current_bet_level = 100;
      } else if (this.current_bet_level === 100) {
          this.current_bet_level = 50;
      } else if (this.current_bet_level === 50) {
          this.current_bet_level = 25;
          this.bet_down_btn.alpha = .5;
      } else if (this.current_bet_level === 25) {
          this.bet_down_btn.alpha = .5;
          play_sound = false;
      }

      if (play_sound) {
          this.buttonMusic.play();
      }
      this.bet_text.setText(this.current_bet_level);
  }

  RemoveBigWinBanner () {
      this.big_win.visible = false;
      this.bigWinTimer.stop();
      this.BigWin_scale = 0.1;
      this.big_win = null;
  }

  DisableButtons(disable) {
    let win_amount = 0;
      if (disable === true) {
          this.spin_image.alpha = 0.5;
          this.bet_down_btn.alpha = 0.5;
          this.bet_up_btn.alpha = 0.5;
          this.available_credits -= this.current_bet_level;
      } else {
          if ( this.available_credits >= this.current_bet_level) {
            this.spin_image.alpha = 1;
          }
          if (this.current_bet_level > 25) {
              this.bet_down_btn.alpha = 1;
          }
          if (this.current_bet_level < 200) {
              this.bet_up_btn.alpha = 1;
          }

          this.Display_BingoWinningHits();
          this.Display_BingoHits();
          win_amount = this.game_result_win_amount;

          this.greenBall_Animation1.visible = true;
          this.greenBall_Animation2.visible = true;
          this.greenBall_Animation3.visible = true;
          this.greenBall_Animation4.visible = true;
          this.greenBall_Animation5.visible = true;

          if (win_amount > 70) {
            this.big_win = this.game.add.sprite(190, 200, 'bigWin');
            this.big_win.scale.setTo(0.5, 0.5);
            this.game.world.bringToTop(this.big_win);

            this.bigWinTimer = this.game.time.create(false);
            this.bigWinTimer.loop(3000, this.RemoveBigWinBanner, this);
            this.bigWinTimer.start();
          }
          this.available_credits += win_amount;
      }
      // Display Available credits and Align the text
      this.credits_text.setText( this.available_credits);
      if (this.available_credits > 999) {
        this.credits_text.x = 300;
      }else {
        this.credits_text.x = 325;
      }

      // Display Win Amount and Align the text
      this.win_text.setText(win_amount);
      if (win_amount > 10) {
        this.win_text.x = 610;
      }else {
        this.win_text.x = 640
        }
  }

  Hide_Sprites() {
    this.sprite1.visible  = this.sprite2.visible  = this.sprite3.visible  =  false;
    this.sprite4.visible  = this.sprite5.visible  = this.sprite6.visible  =  false;
    this.sprite7.visible  = this.sprite8.visible  = this.sprite9.visible  =  false;
    this.sprite10.visible = this.sprite11.visible = this.sprite12.visible =  false;
    this.sprite13.visible = this.sprite14.visible = this.sprite15.visible =  false;
  }


  RightRotatebyOne() {

    this.reel1_index[0] = this.reel1_index[12];
    for (let i = 11; i >= 0; i--) {
        this.reel1_index[i + 1] = this.reel1_index[i];
    }

    this.reel2_index[0] = this.reel2_index[12];
    for (let i = 11; i >= 0; i--) {
      this.reel2_index[i + 1] = this.reel2_index[i];
    }

    this.reel3_index[0] = this.reel3_index[12];
    for (let i = 11; i >= 0; i--) {
      this.reel3_index[i + 1] = this.reel3_index[i];
    }

    this.reel4_index[0] = this.reel4_index[12];
    for (let i = 11; i >= 0; i--) {
      this.reel4_index[i + 1] = this.reel4_index[i];
    }

    this.reel5_index[0] = this.reel5_index[12];
    for (let i = 11; i >= 0; i--) {
      this.reel5_index[i + 1] = this.reel5_index[i];
    }
  }


  ChangeReelVisibility (isVisible) {
    this.reel1.visible = isVisible;
    this.reel2.visible = isVisible;
    this.reel3.visible = isVisible;
    this.reel4.visible = isVisible;
    this.reel5.visible = isVisible;
  }


  Reel_Spin () {
      this.Hide_Sprites();
      this.RightRotatebyOne();
      this.Update_Reels();

      this.ChangeReelVisibility(true);

      this.spinning = false;

      this.spin_count += 1;
      if (this.spin_count >= this.MAX_SPIN_COUNT) {
          // Spin Completed
          this.spinning = false;
          this.spin_count = 0;
          this.DisableButtons(false);
          this.spinMusic.stop();
          this.stopMusic.play();
          this.spin_timer.stop();
      }else {
        this.spin_timer.start();
      }
    }

  Spin_Click (sprite, pointer) {
      this.spinning = true;
      this.DisableButtons(true);

      this.spin_timer = this.game.time.create(false);
      this.spin_timer.loop(this.SPIN_DELAY_MS, this.Reel_Spin, this);
      this.spin_timer.start();
      this.spinMusic.play();

      // Send Play Reels to Server
      this.Send_ChooseScriptFromBingo();
      this.Send_PlayReels();

      this.bingoWinnintHits_text.setText('');
      this.game.world.bringToTop(this.bingoWinnintHits_text);

      this.bingoHits_text.setText('Bingo Hits: ');
      this.game.world.bringToTop(this.bingoHits_text);

      this.greenBall_Animation1.visible = false;
      this.greenBall_Animation2.visible = false;
      this.greenBall_Animation3.visible = false;
      this.greenBall_Animation4.visible = false;
      this.greenBall_Animation5.visible = false;
  }


  LoadMainScreen () {
      this.stageRef.gameWindowGrp = this.stageRef.game.add.group();
      this.stageRef.greenBallGrp = this.stageRef.game.add.group();

      //  A simple background for our game
      this.stageRef.game.add.sprite(0, 0, 'gameReelsbackground');

      this.stageRef.Create_Reels(true);

      this.stageRef.timer = this.stageRef.game.time.create(false);
      this.stageRef.timer.loop(this.stageRef.SPIN_DELAY, this.stageRef.updateTicks, this);
      this.stageRef.timer.start();


      //  A simple background for our game
      const mainBackground = this.stageRef.game.add.sprite(0, 0, 'mainBackground');
      this.stageRef.gameWindowGrp.add(mainBackground);

      // Add Panel Background
      const mainPanelBackground = this.stageRef.game.add.sprite(0, 650, 'mainpanelBackground');
      this.stageRef.gameWindowGrp.add(mainPanelBackground);

      // Add Panel Background
      const panBackground = this.stageRef.game.add.sprite(0, 640, 'panelBackground');
      this.stageRef.gameWindowGrp.add(panBackground);

      // Change bet buttons
      this.stageRef.bet_up_btn = this.stageRef.game.add.sprite(1000, 700, 'betUp');
      this.stageRef.bet_up_btn.scale.setTo(0.5, 0.25);
      this.stageRef.bet_up_btn.inputEnabled = true;
      this.stageRef.bet_up_btn.alpha = 0.5;
      this.stageRef.bet_up_btn.events.onInputDown.add(this.stageRef.Increment_Bet_Click, this);
      this.stageRef.gameWindowGrp.add(this.stageRef.bet_up_btn);

      this.stageRef.bet_down_btn = this.stageRef.game.add.sprite(1000, 750, 'betDown');
      this.stageRef.bet_down_btn.scale.setTo(0.5, 0.25);
      this.stageRef.bet_down_btn.inputEnabled = true;
      this.stageRef.bet_down_btn.events.onInputDown.add(this.stageRef.Decrement_Bet_Click, this);
      this.stageRef.gameWindowGrp.add(this.stageRef.bet_down_btn);

      // Add Spin Image
      this.stageRef.spin_image = this.stageRef.game.add.button( Number(window.innerWidth / 2), Number( window.innerHeight / 2 ) , 'spin', this.stageRef.Spin_Click, this, 5, 5, 0);
      this.stageRef.spin_image.scale.setTo(0.6, 0.6);
      this.stageRef.gameWindowGrp.add(this.stageRef.spin_image);

      const style_small = { font: '12px Arial', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle' };
      const style_big = { font: 'bold 52px Arial', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle' };

      //  The Text is positioned at 0, 100
      let text = this.stageRef.game.add.text(340, 760, 'CREDITS', style_small);
      this.stageRef.gameWindowGrp.add(text);
      this.stageRef.credits_text = this.stageRef.game.add.text(300, 700, String( this.stageRef.available_credits ), style_big);
      this.stageRef.gameWindowGrp.add(this.stageRef.credits_text);

      // Win Text
      text = this.stageRef.game.add.text(640, 760, 'WIN', style_small);
      this.stageRef.gameWindowGrp.add(text);
      this.stageRef.win_text = this.stageRef.game.add.text(640, 700, '0', style_big);
      this.stageRef.gameWindowGrp.add(this.stageRef.win_text);
      //
      text = this.stageRef.game.add.text(890, 760, 'BET', style_small);
      this.stageRef.gameWindowGrp.add(text);
      this.stageRef.bet_text = this.stageRef.game.add.text(870, 700, String( this.stageRef.current_bet_level ), style_big);
      this.stageRef.gameWindowGrp.add(this.stageRef.bet_text);

      // Add Bingo Card to Main Screen
      const bingoCard = this.stageRef.game.add.sprite(150, 700, 'bingoCard');
      bingoCard.scale.setTo(0.70, 0.70);
      this.stageRef.gameWindowGrp.add(bingoCard);

      this.stageRef.game.world.bringToTop(this.stageRef.gameWindowGrp);

      // this.stageRef.spaceKey = this.stageRef.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

      // Display User Name
      const uname = this.stageRef.game.add.text(1000, 5, 'User Name: ' + this.stageRef.user_name, { font: '20px Arial', fill: '#ff0044', align: 'center' });
      this.stageRef.gameWindowGrp.add(uname);

      this.stageRef.spinMusic = this.stageRef.game.add.audio('reelSpinMusic');
      this.stageRef.stopMusic = this.stageRef.game.add.audio('reelStopMusic');
      this.stageRef.buttonMusic = this.stageRef.game.add.audio('buttonMusic');

      this.stageRef.greenBall_Animation1 = this.stageRef.game.add.sprite(160, 658, 'greenBallAnimation');
      this.stageRef.greenBall_Animation1.animations.add('run');
      this.stageRef.gameWindowGrp.add(this.stageRef.greenBall_Animation1);

      this.stageRef.greenBall_Animation2 = this.stageRef.game.add.sprite(183, 658, 'greenBallAnimation');
      this.stageRef.greenBall_Animation2.animations.add('run');
      this.stageRef.gameWindowGrp.add(this.stageRef.greenBall_Animation2);

      this.stageRef.greenBall_Animation3 = this.stageRef.game.add.sprite(208, 658, 'greenBallAnimation');
      this.stageRef.greenBall_Animation3.animations.add('run');
      this.stageRef.gameWindowGrp.add(this.stageRef.greenBall_Animation3);

      this.stageRef.greenBall_Animation4 = this.stageRef.game.add.sprite(233, 658, 'greenBallAnimation');
      this.stageRef.greenBall_Animation4.animations.add('run');
      this.stageRef.gameWindowGrp.add(this.stageRef.greenBall_Animation4);

      this.stageRef.greenBall_Animation5 = this.stageRef.game.add.sprite(257, 658, 'greenBallAnimation');
      this.stageRef.greenBall_Animation5.animations.add('run');
      this.stageRef.gameWindowGrp.add(this.stageRef.greenBall_Animation5);

      this.stageRef.greenBall_Animation1.visible = false;
      this.stageRef.greenBall_Animation2.visible = false;
      this.stageRef.greenBall_Animation3.visible = false;
      this.stageRef.greenBall_Animation4.visible = false;
      this.stageRef.greenBall_Animation5.visible = false;


      this.stageRef.game.add.text(15, 670, 'Bingo Winning Hits ', {
                                      font: 'bold 16px Arial',
                                      fill: '#f6ff00',
                                      align: 'center'
                                  });
  }






/* Initialize the Socket */
Socket_Init () {
    this.stageRef.SocketCreate();
}

Initialize_Game () {
    this.Send_GetInitInfo();
    this.Start_WaitForResponse_Timer();

    this.bingoBallWin = this.game.add.text(15, 780, '', {
                                    font: '16px Arial',
                                    fill: '#f6ff00',
                                    align: 'center'
                                });

    this.bingoWinnintHits_text = this.game.add.text(168, 670, '', {
                                    font: 'bold 15px Arial',
                                    fill: '#0000',
                                    align: 'center'
                                });



    this.bingoHits_text = this.game.add.text(790, 670, '', {
                                    font: '12px Arial',
                                    fill: '#ff0000',
                                    align: 'center'
                                });
}

Start_WaitForResponse_Timer() {
    this.isResponseReceived = false;
    this.respTimer = this.game.time.create(false);
    this.respTimer.loop(this.WAIT_FOR_RESPONSE_DELAY_MS, this.WaitForResponse_Timer_Elapsed, this);
    this.respTimer.start();
}

WaitForResponse_Timer_Elapsed () {
    if (this.isResponseReceived) {
        if (this.Init_State === 0) {
            // debug_print("Sending Change Bet request...");
            this.Send_ChangeBet();
            this.respTimer.start();
            this.Init_State++;
        }else if (this.Init_State === 1) {
            // debug_print("Sending Create Bingo Card request...");
            this.Send_Create_BingoCard();
            this.respTimer.start();
            this.Init_State++;
        }else if (this.Init_State === 2) {
            // debug_print("Sending Choose Script From Bingo...");
            this.Send_ChooseScriptFromBingo();
            this.respTimer.start();
            this.Init_State++;
        }
    }
}

/* Send Get Init info to server */
Send_GetInitInfo() {
    // Create GetInitInfo Object
    const getInitInfo = { HEADERTYPE: {
                                type: this.EAPI_MATHREQUEST_GETINITINFO_ID
                            },
                            MATHREQUEST_HEADER: {
                                sModel: 'scripted_little_red_v0_bs_5x25_',
                                u32PayoutRate: 9400,
                                u32Denom: 1
                            }
                        };

    this.SendToServer(JSON.stringify(getInitInfo));
}

Send_ChangeBet() {
    // Create ChangeBet Object
    const changeBet = { HEADERTYPE: {
                                type: this.EAPI_MATHREQUEST_CHANGEBET_ID
                            },
                            MATHREQUEST_HEADER: {
                                sModel: 'scripted_little_red_v0_bs_5x25_',
                                u32PayoutRate: 9400,
                                u32Denom: 1
                            },
                            MATHREQUEST_BETPARAMS: {
                                u8changeBetType: 12,
                                u32BetPerGameOrLine: 8,
                                u32NumberOfLinesOrSpotsChosen: 25
                            },
                            u32maxtotalbetcredits: 0
                        };

    this.SendToServer(JSON.stringify(changeBet));
}

Send_Create_BingoCard () {
    // Create Bingo Card Object
    const createBingoCard = { HEADERTYPE: {
                                type: this.EAPI_MATHREQUEST_CREATEBINGOCARD_ID
                            },
                            MATHREQUEST_HEADER: {
                                sModel: 'scripted_little_red_v0_bs_5x25_',
                                u32PayoutRate: 9400,
                                u32Denom: 1
                            }
                        };

    this.SendToServer(JSON.stringify(createBingoCard));
}


Send_ChooseScriptFromBingo() {
  let ballDraw;
    if (this.sBingoBallDrawCount === 0) {
        ballDraw = this.sBingoBallDraw_1;
        this.sBingoBallDrawCount++;
    } else if (this.sBingoBallDrawCount === 1) {
        ballDraw = this.sBingoBallDraw_2;
        this.sBingoBallDrawCount++;
    } else if (this.sBingoBallDrawCount === 2) {
        ballDraw = this.sBingoBallDraw_3;
        this.sBingoBallDrawCount++;
    } else if (this.sBingoBallDrawCount === 3) {
        ballDraw = this.sBingoBallDraw_4;
        this.sBingoBallDrawCount++;
    } else if (this.sBingoBallDrawCount === 4) {
        ballDraw = this.sBingoBallDraw_5;
        this.sBingoBallDrawCount = 0;
    }

    // Create Bingo Card Object
    const chooseScriptFromBingo = { HEADERTYPE: {
                                        type: this.EAPI_MATHREQUEST_CHOOSESCRIPTFROMBINGO_ID
                                    },
                                    MATHREQUEST_HEADER: {
                                        sModel: 'scripted_little_red_v0_bs_5x25_',
                                        u32PayoutRate: 9400,
                                        u32Denom: 1
                                    },
                                    MATHREQUEST_SCRIPTPARAMS: {
                                        u32BetPerLineOrGame: 8,
                                        u32NumberOfLinesOrPicks: 25,
                                        u32WinVariant: 0,
                                    },
                                    sBingoCard: '5*15*4*13*11*3*29*27*26*19*25*34*33*0*44*39*57*47*46*58*53*70*66*64*65*73',
                                    sBingoBallDraw: ballDraw
                                };
    this.SendToServer(JSON.stringify(chooseScriptFromBingo));
}

// Send Play Reel Info to Server
Send_PlayReels() {
    // Create GetInitInfo Object
    const playReels = { HEADERTYPE: {
                                type: this.EAPI_MATHREQUEST_PLAYREELS_ID
                            },
                            MATHREQUEST_HEADER: {
                                sModel: 'scripted_little_red_v0_bs_5x25_',
                                u32PayoutRate: 9400,
                                u32Denom: 1
                            },
                            MATHREQUEST_PLAYPARAMS: {
                                u32BetPerLine: 8,
                                u32NumberOfLines: 25,
                                sJPmustgoLevels: '',
                                u32ScriptId: 0,
                                u32ScriptReorderSeed: 0,
                                u32ScriptDirectiveIndex: 0,
                                sBingoCard: '5*10*15*11*13*12*18*25*30*27*28*44*36*0*31*40*52*54*49*51*53*69*67*75*61*66',
                                sForceOutcomeBingo: '',
                                u32BonusIndex: 0,
                                sBingoBallDraw: '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75',
                                sForceOutcomeReels: ''
                            }
                        };

    this.SendToServer(JSON.stringify(playReels));
}

Display_sBingoBallsUpToWin(sBingoBallsUpToWin) {

  const temp = sBingoBallsUpToWin.split('*')
  this.bingoBallWin.setText(temp);
  this.game.world.bringToTop(this.bingoBallWin);
}

Display_BingoWinningHits() {
    const temp = this.winning_hits.split('*')

    for (let i = temp.length - 1; i >= 0; i--) {
        if (temp[i] === -1) {
            temp.splice(i, 1);
        } else if (temp[i] === 0) {
            temp.splice(i, 1);
        }
    }
    let temp_str = ' ';

    for ( let i = 1; i < temp.length; i++) {
        temp_str += ('0' + temp[i]).slice(-2) + '  ';

    }

    this.bingoWinnintHits_text.setText(temp_str);
    this.game.world.bringToTop(this.bingoWinnintHits_text);

    this.greenBall_Animation1.animations.play('run', 30, true);
    this.greenBall_Animation2.animations.play('run', 30, true);
    this.greenBall_Animation3.animations.play('run', 30, true);
    this.greenBall_Animation4.animations.play('run', 30, true);
    this.greenBall_Animation5.animations.play('run', 30, true);
}

Display_BingoHits() {
    const temp = this.bingo_hits.split('*')

    for ( let i = temp.length - 1; i >= 0; i--) {
        if (temp[i] === -1) {
            temp.splice(i, 1);
        }
    }

    this.bingoHits_text.setText('Bingo Hits: ' + temp);
    this.game.world.bringToTop(this.bingoHits_text);
}

// **************************************************** WEB SOCKET ***********************************************************************/
    SocketCreate() {
      this.websocket = new WebSocket(this.server_ip);
      this.websocket.onopen = function(evt) { this.onOpen(evt) };
      this.websocket.onclose = function(evt) { this.onClose(evt) };
      this.websocket.onmessage = function(evt) { this.onMessage(evt) };
      this.websocket.onerror = function(evt) { this.onError(evt) };
    }

    onOpen(evt) {
      this.isConnectedToServer = true;
      this.game.debug.text('connected to server!!!', 300, 300);

        // debug_print("Connected To Server...");

        // Initialize the Game
        this.Initialize_Game();
    }

    onClose(evt) {
      this.isConnectedToServer = false;
        // debug_print("Diconnected from Server.") ;
    }

    onMessage(evt) {
      let header_type = 0;
      this.received_message = evt.data;
      let obj: any
        try {
            obj = JSON.parse(evt.data.substring(0, evt.data.indexOf('\0')));
            header_type = parseInt( obj.CALLBACK.HEADERTYPE.Type ) ;
        } catch (err) {
            // debug_print("Invalid HeaderType Received From Server. " + err);
        }

        switch (header_type) {
            case this.EAPI_MATHREQUEST_GETINITINFO_CALLBACK_ID:
                // debug_print("Get Init Response. Reel Positions: " + obj.CALLBACK.sReelPositions);
                break;

            case this.EAPI_MATHREQUEST_CHANGEBET_CALLBACK_ID:
                // debug_print("CHANGEBET Response. sAllPossibleJackpots: " + obj.CALLBACK.CHANGEBET_PARAMS.sAllPossibleJackpots);
                break;

            case this.EAPI_MATHREQUEST_CREATEBINGOCARD_CALLBACK_ID:
                // debug_print("CREATEBINGOCARD Response. sBingoCard: " + obj.CALLBACK.sBingoCard);
                this.Update_BingoCard(obj.CALLBACK.sBingoCard);
                break;

            case this.EAPI_MATHREQUEST_CHOOSESCRIPTFROMBINGO_CALLBACK_ID:
                // debug_print("CHOOSESCRIPTFROMBINGO Response. u32BingoEndingPattern: " + obj.CALLBACK.u32BingoEndingPattern);
                this.bingoBallDrawValue = obj.CALLBACK.sBingoBallsUpToWin;
                this.winning_hits = obj.CALLBACK.sBingoWinningHits;  // Green
                this.bingo_hits = obj.CALLBACK.sBingoHits;           // Red
                break;

            case this.EAPI_MATHREQUEST_PLAYREELS_CALLBACK_ID:
            this.game_result_win_amount = parseInt(obj.CALLBACK.MATHRESPONSE_PLAYREELSPARAMS.u64ReelWinValue);
                // debug_print("Play Reels Response. WIN Value = " + game_result_win_amount);
                // Display_sBingoBallsUpToWin(bingoBallDrawValue);

                break;

            default:
                // debug_print("Unknown Type: " + obj.GETINITINFO.HEADERTYPE.Type);
                break;
        }
        this.isResponseReceived = true;
    }

    Update_BingoCard(BingoCard_pattern) {
        let x_pos = 163;
        let y_pos = 725;
        let row_count = 0;
        const bingoString = '';

        const temp = BingoCard_pattern.split('*');

        for (let i = 0; i < 25; i++) {
            try {
                this.bingoCard_array[i] = parseInt(temp[i]);
            } catch (err) {

            }
        }

        for (let i = 0; i < 25; i++) {
            if (this.bingoCard_array[i] === 0) {
                this.bingoCard_array[i] = 0;
            }

            const bingoText = this.game.add.text(x_pos, y_pos, String( this.bingoCard_array[i] ), {
                                        font: '11px Arial',
                                        fill: '#000000',
                                        align: 'center'
                                    });
            this.gameWindowGrp.add(bingoText);
            y_pos += 12;
            row_count++;
            if (row_count === 5) {
                y_pos = 725;
                x_pos += 15;
                row_count = 0;
            }
        }
    }

    onError(evt) {
      this.game.debug.text('Error' + evt.data, 32, 32);
    }

    SendToServer(data) {
        if (this.isConnectedToServer) {
          this.websocket.send(data);
        }
    }
    // ****************************************************************************************************************************************/

}
