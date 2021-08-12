

((d) => {
    const btnMenu = d.querySelector(".menu-btn"),
        menu = d.querySelector(".menu");

    btnMenu.addEventListener("click", (e) => {
        btnMenu.firstElementChild.classList.toggle("none");
        btnMenu.lastElementChild.classList.toggle("none");
        menu.classList.toggle("is-active");

    });


    d.addEventListener("click", (e) => {
        if (!e.target.matches(".menu a")) return false;
        btnMenu.firstElementChild.classList.remove("none");
        btnMenu.lastElementChild.classList.add("none");
        menu.classList.remove("is-active");
    });


})(document);


const app = () => {

    // General selectors
    const song = document.querySelector('.song'),
        play = document.querySelector('.play'),
        outline = document.querySelector('.moving-outline circle'),
        video = document.querySelector('.vid-container video');

    // Sounds
    const sounds = document.querySelectorAll('.sound-picker button');

    //Time Display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');

    //Get the length of the outline

    const outlineLength = outline.getTotalLength();

    // duration 
    let fakeduration = 600;

    outline.style.strokeDashArray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;


    //play sound

    play.addEventListener("click", () => {

        checkPlaying(song);
    })
    // Select sound
    timeSelect.forEach(option => {
        option.addEventListener("click", function (){
            fakeduration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeduration / 60)}:${Math.floor(fakeduration % 60)}`;
        })
    })

    //create a function specific to stop and play the sounds

    const checkPlaying = song => {

        if (song.paused) {
            song.play();
            video.play();
            play.src = './img/pause.svg';

        } else {
            song.pause();
            video.pause();
            play.src = './img/play.svg'
        }

    };

    // Wer can animated the circle

    song.onTimeUpdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeduration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

    }

    //animate the circle

    let progress = outlineLength - (currentTime / fakeduration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    // animate the text;

    timeDisplay.textContent = `${minutes}:${seconds}`;
}

app();


