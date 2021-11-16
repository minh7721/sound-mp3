const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const cd = $(".cd");
const btnPlay = $(".btn-toggle-play");
const player = $(".player");
const progress = $("#progress");
const btnPrev = $(".btn-prev");
const btnNext = $(".btn-next");



const app = {
    currentIndex: 0,
    isPlaying: false,
    songs: [
        {
            name: "Bước qua nhau",
            singer: "Vũ.",
            linkSound: "./sound/BuocQuaNhau.mp3",
            linkImg: "./img/avatar.jpg",
        },
        {
            name: "Như Anh Mơ",
            singer: "PC",
            linkSound: "./sound/NhuAnhMo-PC-6237712.mp3",
            linkImg: "./img/avatar.jpg",
        },
        {
            name: "Kẻ cô đơn trong thành phố",
            singer: "Khải",
            linkSound: "./sound/KeCoDonTrongTP.mp3",
            linkImg: "./img/avatar.jpg",
        },
        {
            name: "Ánh sao và bầu trời",
            singer: "",
            linkSound: "./sound/",
            linkImg: "./img/avatar.jpg",
        },
        {
            name: "Bao tiền 1 mớ bình yên",
            singer: "MinhHN",
            linkSound: "./sound/BaoTienMotMoBinhYen.mp3",
            linkImg: "./img/avatar.jpg",
        },
        {
            name: "Chỉ là muốn nói",
            singer: "MinhHNMinhHN",
            linkSound: "./sound/",
            linkImg: "./img/avatar.jpg",
        },
        {
            name: "Có ai ở đây không",
            singer: "MinhHN",
            linkSound: "./sound/CoAiODayKhong.mp3",
            linkImg: "./img/avatar.jpg",
        },
        {
            name: "Cô ấy nói (lofi)",
            singer: "MinhHN",
            linkSound: "./sound/CoAyNoi_Lofi.mp3",
            linkImg: "./img/avatar.jpg",
        },
        {
            name: "Nợ ai đó lời xin lỗi",
            singer: "MinhHN",
            linkSound: "./sound/NoAiDoLoiXinLoi_Lofi.mp3",
            linkImg: "./img/avatar.jpg",
        },
        {
            name: "Thanh xuân",
            singer: "MinhHN",
            linkSound: "./sound/ThanhXuan.mp3",
            linkImg: "./img/avatar.jpg",
        },
        {
            name: "Tình đầu",
            singer: "MinhHN",
            linkSound: "./sound/TinhDau.mp3",
            linkImg: "./img/avatar.jpg",
        },
    ],
    render: function () {
        const htmls = this.songs.map((song) => {
            return `
    <div class="song">
        <div class="thumb"
            style="background-image: url('${song.linkImg}')">
        </div>
        <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
        </div>
        <div class="option">
            <i class="fas fa-ellipsis-h"></i>
        </div>
    </div>
    `;
        });
        $(".playlist").innerHTML = htmls.join("");
    },
    definedProperties: function() {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvents: function () {
        const cdWidth = cd.offsetWidth;
        //Xử lý đĩa CD quay khi play
        const cdThumbAnimate = cdThumb.animate([
            {
                transform: 'rotate(360deg)'
            }
        ],
            {
                duration: 10000, //10 Giây
                iterations: Infinity
            }
        )
        cdThumbAnimate.pause();

        //Zoom đĩa CD
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        };

        //Click nút play
        btnPlay.onclick = function () {
            if (app.isPlaying) {
                audio.pause();
            }
            else {
                audio.play();
            }
        }
        audio.onplay = function () {
            app.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        }

        audio.onpause = function () {
            app.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }


        //Thanh tua đc chạy theo thời gian
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const pPercent = Math.floor(100 * audio.currentTime / audio.duration);
                progress.value = pPercent;
            }
        }
        //Người dùng tua
        progress.onchange = function (e) {
            const changeTime = e.target.value * audio.duration / 100;
            audio.currentTime = changeTime;
        }
         //Nút next bài
         btnNext.onclick = function() {
            app.nextSong;
            audio.play();
        }
        //Nút lùi bài
        btnPrev.onclick = function() {
            app.prevSong;
            audio.play();
        }
    },
    playCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.linkImg}')`;
        audio.src = this.currentSong.linkSound;
        // console.log(heading, cdThumb, audio);
    },
    nextSong: function() {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        console.log(this.currentIndex);
        this.playCurrentSong()
    },
    prevSong: function() {
        this.currentIndex--
        if (this.currentIndex < 0 ) {
            this.currentIndex = this.songs.length - 1
        }
        this.playCurrentSong()
    },
    start: function () {
        //Thuộc tính
        this.definedProperties();

        //Bắt sự kiện
        this.handleEvents();

        //Render playlist
        this.render();

        //Tải bài hát đầu tiên
        this.playCurrentSong();
    },
};

app.start();
