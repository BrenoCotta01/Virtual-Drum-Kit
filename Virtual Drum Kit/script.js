const drumIdle = new Image();
drumIdle.src = "imgs/drum-idle.png";

const drumPlaying = new Image();
drumPlaying.src = "imgs/drum-playing.png";

const cymbalIdle = new Image();
cymbalIdle.src = "imgs/cymbal-idle.png";

const cymbalPlaying = new Image();
cymbalPlaying.src = "imgs/cymbal-playing.png";

document.body.addEventListener("keyup", (event) => {
  playSound(event.code.toLowerCase());
});

document.querySelector(".composer button").addEventListener("click", () => {
  let song = document.getElementById("input").value;

  if (song !== "") {
    let songArray = song.split("");
    playComposition(songArray);
  }
});

function playSound(sound) {
  let audioElement = document.querySelector(`#s_${sound}`);
  let keyElement = document.querySelector(`div[data-key="${sound}"]`);

  if (audioElement) {
    audioElement.currentTime = 0;
    audioElement.play();
  }

  if (keyElement) {
    let imgElement = keyElement.querySelector("img");
    let imgSrc = imgElement.src.toLowerCase();

    let isCymbal = imgSrc.includes("cymbal");

    if (imgElement) {
      if (isCymbal) {
        imgElement.src = "imgs/cymbal-playing.png";
        keyElement.classList.add("shake");
      } else {
        imgElement.src = "imgs/drum-playing.png";
      }
    }

    keyElement.classList.add("active");

    setTimeout(() => {
      if (imgElement) {
        if (isCymbal) {
          imgElement.src = "imgs/cymbal-idle.png";
          keyElement.classList.remove("shake");
        } else {
          imgElement.src = "imgs/drum-idle.png";
        }
      }

      keyElement.classList.remove("active");
    }, 300);
  }
}

function playComposition(songArray) {
  let wait = 0;

  for (let songItem of songArray) {
    setTimeout(() => {
      playSound(`key${songItem}`);
    }, wait);

    wait += 250;
  }
}