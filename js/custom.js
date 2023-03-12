::-webkit-scrollbar {
  width: 8px;
  height: 8px
}

::-webkit-scrollbar-track {
  border-radius: 2em;
  /* background-color: rgba(73, 177, 245, .2); */
}

::-webkit-scrollbar-thumb {
  background-color: rgb(255 255 255 / .3);
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 75%, transparent);
  border-radius: 2em
}

::-webkit-scrollbar-corner {
  background-color: transparent
}


.categoryBar-list {
    max-height: 400px;
}

.clock-row {
    overflow: hidden;
    text-overflow: ellipsis;
}

/*3s为加载动画的时间，1为加载动画的次数，ease-in-out为动画效果*/

#page-header,
#web_bg {
    -webkit-animation: imgblur 2s 1 ease-in-out;
    animation: imgblur 2s 1 ease-in-out;
}

@keyframes imgblur {
    0% {
        filter: blur(5px);
    }
    100% {
        filter: blur(0px);
    }
}

/*适配使用-webkit内核的浏览器 */

@-webkit-keyframes imgblur {
    0% {
        -webkit-filter: blur(5px);
    }
    100% {
        -webkit-filter: blur(0px);
    }
}
.table-wrap img {
    margin: .6rem auto .1rem !important;
}

/* 标签外挂 网站卡片 start */

.site-card-group img {
    margin: 0 auto .1rem !important;
}

.site-card-group .info a img {
    margin-right: 10px !important;
}

[data-theme='dark'] .site-card-group .site-card .info .title {
    color: #f0f0f0 !important;
}

[data-theme='dark'] .site-card-group .site-card .info .desc {
    color: rgba(255, 255, 255, .7) !important;
}

.site-card-group .info .desc {
    margin-top: 4px !important;
}
/* 代码块颜色 */

figure.highlight pre .addition {
    color: #00bf03 !important;
}

var anzhiyu = {
  // 音乐节目切换背景
  changeMusicBg: function (isChangeBg = true) {
    if (window.location.pathname != "/music/") {
      return;
    }
    const anMusicBg = document.getElementById("an_music_bg")

    if (isChangeBg) {
      // player listswitch 会进入此处
      const musiccover = document.querySelector("#anMusic-page .aplayer-pic");
      anMusicBg.style.backgroundImage = musiccover.style.backgroundImage;
    } else {
      // 第一次进入，绑定事件，改背景
      let timer = setInterval(()=>{
        const musiccover = document.querySelector("#anMusic-page .aplayer-pic");
        // 确保player加载完成
        console.info(anMusicBg);
        if (musiccover) {
          clearInterval(timer)
          anMusicBg.style.backgroundImage = musiccover.style.backgroundImage;
          // 绑定事件
          anzhiyu.addEventListenerChangeMusicBg();
          
          // 暂停nav的音乐
          if (document.querySelector("#nav-music meting-js").aplayer && !document.querySelector("#nav-music meting-js").aplayer.audio.paused){
            anzhiyu.musicToggle()
          }
        }
      }, 100)
    }
  },
  addEventListenerChangeMusicBg: function () {
    const anMusicPage = document.getElementById("anMusic-page");
    const aplayerIconMenu = anMusicPage.querySelector(".aplayer-info .aplayer-time .aplayer-icon-menu");

    anMusicPage.querySelector("meting-js").aplayer.on('loadeddata', function () {
      anzhiyu.changeMusicBg();
      console.info('player loadeddata');
    });

    aplayerIconMenu.addEventListener("click", function () {
      document.getElementById('menu-mask').style.display = "block";
      document.getElementById('menu-mask').style.animation = "0.5s ease 0s 1 normal none running to_show";
    })

    document.getElementById('menu-mask').addEventListener("click", function () {
      if (window.location.pathname != "/music/") return;
      anMusicPage.querySelector('.aplayer-list').classList.remove("aplayer-list-hide");
    })
  },
}

// 调用
anzhiyu.changeMusicBg(false);