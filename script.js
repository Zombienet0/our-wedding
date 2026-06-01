// =====================================
// TIMER
// =====================================

const weddingDate =
  new Date("2026-07-18T12:30:00");

let attendanceValue = "";

function updateTimer(){

  const now = new Date();

  const diff =
    weddingDate - now;

  const days =
    Math.floor(diff / (1000 * 60 * 60 * 24));

  const hours =
    Math.floor((diff / (1000 * 60 * 60)) % 24);

  const minutes =
    Math.floor((diff / (1000 * 60)) % 60);

  const seconds =
    Math.floor((diff / 1000) % 60);

  document.getElementById("days").innerText =
    days < 10 ? "0" + days : days;

  document.getElementById("hours").innerText =
    hours < 10 ? "0" + hours : hours;

  document.getElementById("minutes").innerText =
    minutes < 10 ? "0" + minutes : minutes;

  document.getElementById("seconds").innerText =
    seconds < 10 ? "0" + seconds : seconds;

}

setInterval(updateTimer, 1000);

updateTimer();


// =====================================
// ATTENDANCE BUTTONS
// =====================================

document
.querySelectorAll(".choice-button")
.forEach(button=>{

  button.addEventListener("click",()=>{

    attendanceValue =
      button.dataset.value;

    document
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
      "#ffffff";

  });

});


// =====================================
// STRONG ALCOHOL FIELD
// =====================================

const strongAlcohol =
  document.getElementById(
    "strongAlcohol"
  );

const strongAlcoholInput =
  document.getElementById(
    "strongAlcoholInput"
  );

if(strongAlcohol){

  strongAlcohol.addEventListener(
    "change",
    ()=>{

      strongAlcoholInput.style.display =
        strongAlcohol.checked
          ? "block"
          : "none";

    }
  );

}


// =====================================
// NO ALCOHOL FIELD
// =====================================

const noAlcohol =
  document.getElementById(
    "noAlcohol"
  );

const noAlcoholInput =
  document.getElementById(
    "noAlcoholInput"
  );

if(noAlcohol){

  noAlcohol.addEventListener(
    "change",
    ()=>{

      noAlcoholInput.style.display =
        noAlcohol.checked
          ? "block"
          : "none";

    }
  );

}


// =====================================
// GOOGLE SHEETS
// =====================================

const scriptURL =
"https://script.google.com/macros/s/AKfycbx3-cVFwJKS0QNFjj__LSN2yIjVAwikI5OWwfU7ctU6Ccx1se0bQqaexWPfivbCo99Asw/exec";

document
.getElementById("rsvpForm")
.addEventListener(
"submit",
async (e)=>{

  e.preventDefault();

  const submitBtn =
    document.getElementById(
      "submitBtn"
    );

  submitBtn.disabled = true;

  submitBtn.innerText =
    "Отправляем...";

  const drinks = [];

  document
  .querySelectorAll(
    ".checkbox-item input:checked"
  )
  .forEach(item=>{

    drinks.push(
      item.parentElement
      .innerText
      .trim()
    );

  });

  const hotel =
    document.querySelector(
      'input[name="hotel"]:checked'
    )?.value || "";

  const data = {

    name:
      document
      .getElementById(
        "guestName"
      )?.value || "",

    attendance:
      attendanceValue,

    drinks:
      drinks.join(", "),

    strongAlcohol:
      document
      .getElementById(
        "strongAlcoholInput"
      )?.value || "",

    noAlcohol:
      document
      .getElementById(
        "noAlcoholInput"
      )?.value || "",

    allergy:
      document
      .getElementById(
        "allergy"
      )?.value || "",

    hotel:
      hotel

  };

  try{

      const formData = new FormData();

      formData.append(
        "name",
        data.name
      );

      formData.append(
        "attendance",
        data.attendance
      );

      formData.append(
        "drinks",
        data.drinks
      );

      formData.append(
        "strongAlcohol",
        data.strongAlcohol
      );

      formData.append(
        "noAlcohol",
        data.noAlcohol
      );

      formData.append(
        "allergy",
        data.allergy
      );

      formData.append(
        "hotel",
        data.hotel
      );

      const response =
        await fetch(
          scriptURL,
          {
            method: "POST",
            mode: "no-cors",
            body: formData
          }
        );

    submitBtn.innerText =
      "Спасибо! 🤍";

    document
      .getElementById(
        "rsvpForm"
      )
      .reset();

    attendanceValue = "";

    document
      .querySelectorAll(
        ".choice-button"
      )
      .forEach(btn=>{

        btn.style.background =
          "#f3ebe4";

        btn.style.color =
          "#2b2b2b";

      });

    strongAlcoholInput.style.display =
      "none";

    noAlcoholInput.style.display =
      "none";

  }

  catch(error){

    submitBtn.disabled = false;

    submitBtn.innerText =
      "Ошибка отправки";

    setTimeout(()=>{

      submitBtn.innerText =
        "Отправить анкету";

    },3000);

  }

});