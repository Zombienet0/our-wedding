// script.js

/* TIMER */

const weddingDate =
  new Date("2026-07-18T12:30:00");

function updateTimer(){

  const now = new Date();

  const diff =
    weddingDate - now;

  const days =
    Math.floor(diff / (1000*60*60*24));

  const hours =
    Math.floor((diff / (1000*60*60)) % 24);

  const minutes =
    Math.floor((diff / (1000*60)) % 60);

  const seconds =
    Math.floor((diff / 1000) % 60);

  document.getElementById("days").innerText =
    days;

  document.getElementById("hours").innerText =
    hours;

  document.getElementById("minutes").innerText =
    minutes;

  document.getElementById("seconds").innerText =
    seconds;

}

setInterval(updateTimer,1000);

updateTimer();

/* BUTTON ACTIVE */

document
.querySelectorAll(".choice-button")
.forEach(button=>{

  button.addEventListener("click",()=>{

    button.parentNode
    .querySelectorAll(".choice-button")
    .forEach(btn=>{

      btn.style.background =
        "#f3ebe4";

      btn.style.color =
        "#2b2b2b";

    });

    button.style.background =
      "#b08968";

    button.style.color =
      "white";

  });

});

/* STRONG ALCOHOL */

const strongAlcohol =
  document.getElementById(
    "strongAlcohol"
  );

const strongAlcoholInput =
  document.getElementById(
    "strongAlcoholInput"
  );

strongAlcohol.addEventListener(
  "change",
  ()=>{

    strongAlcoholInput.style.display =
      strongAlcohol.checked
      ? "block"
      : "none";

  }
);

/* NO ALCOHOL */

const noAlcohol =
  document.getElementById(
    "noAlcohol"
  );

const noAlcoholInput =
  document.getElementById(
    "noAlcoholInput"
  );

noAlcohol.addEventListener(
  "change",
  ()=>{

    noAlcoholInput.style.display =
      noAlcohol.checked
      ? "block"
      : "none";

  }
);

/* FORM */

document
.getElementById("rsvpForm")
.addEventListener(
  "submit",
  (e)=>{

    e.preventDefault();

    alert(
      "Спасибо! 🤍\n\nАнкета отправлена."
    );

  }
);