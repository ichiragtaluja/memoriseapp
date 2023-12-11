console.log("coneected");
let selectedImage;
let level;
let images;
let totalImages;
let currentIndex = 0;
let startTime;
let responseTime;
let responseTimeArray = [];
let pattern = "";
let testImages;
let winningPattern;
let time;
let accuracy;

function calculateAccuracy(winningPattern, pattern) {
  let score = 0;
  for (let i = 0; i < winningPattern.length; i++) {
    if (winningPattern[i] == pattern[i]) {
      score++;
    } else {
    }
  }
  accuracy = (score / winningPattern.length) * 100;
  console.log(accuracy);
}

function displayImage(images, time) {
  console.log(images);
  if (currentIndex < totalImages) {
    let img = document.querySelector("#img");
    console.log(img);
    img.src = `${images[currentIndex]}`;
    startTime = new Date().getTime();
    pattern += "0";
    currentIndex++;
    console.log(currentIndex);

    setTimeout(() => displayImage(images, time), time);
  } else {
    document.querySelector("#img").style.display = "none";
    calculateAccuracy(winningPattern, pattern);
    const sum = responseTimeArray.reduce((a, b) => a + b, 0);
    const avg = sum / responseTimeArray.length || 0;
    console.log(`${avg} seconds`);
    document.querySelector("#results-section").style.display = "block";
    document.querySelector("#accuracy").textContent = `${accuracy.toFixed(
      2
    )}%;`;
    document.querySelector("#response-time").textContent = `${avg.toFixed(
      2
    )} seconds`;

    document.querySelector("#greet").style.display = "block";

    // if (level == "Beginner") {
    // }
  }
}

function displayLevels(levels) {
  const ul = document.querySelector("#levels");

  for (let i = 0; i < levels.length; i++) {
    let li = document.createElement("li");
    let label = document.createElement("label");
    let input = document.createElement("input");

    input.setAttribute("id", levels[i].level_name);
    input.setAttribute("name", "level");
    input.setAttribute("type", "radio");

    label.setAttribute("for", levels[i].level_name);
    label.textContent = levels[i].level_name;
    li.appendChild(input);
    li.appendChild(label);
    ul.appendChild(li);
  }
}

function displayTypes(types) {
  const ul = document.querySelector("#types");

  for (let i = 0; i < types.length; i++) {
    let li = document.createElement("li");
    let label = document.createElement("label");
    let input = document.createElement("input");

    input.setAttribute("id", types[i].type);
    input.setAttribute("name", "image");
    input.setAttribute("type", "radio");

    label.setAttribute("for", types[i].type);
    label.textContent = types[i].type;

    li.appendChild(input);
    li.appendChild(label);
    ul.appendChild(li);
  }
}

window.onload = function () {
  document.querySelector("#select-section").style.display = "block";
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status == 200) {
        let data = JSON.parse(xhr.responseText);
        console.log(data);
        data.reduce;
        displayLevels(data);
      }
    }
  };

  xhr.open("GET", "php/get-levels.php", true);
  xhr.send();

  let xhr2 = new XMLHttpRequest();
  xhr2.onreadystatechange = function () {
    if (xhr2.readyState === XMLHttpRequest.DONE) {
      if (xhr2.status == 200) {
        let data = JSON.parse(xhr2.responseText);
        console.log(data);
        displayTypes(data);
      }
    }
  };

  xhr2.open("GET", "php/get-types.php", true);
  xhr2.send();
};

document.querySelector("#start-test").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("#select-section").style.display = "none";
  console.log("clicked");
  let image = document.querySelector('input[name="image"]:checked');

  let level = document.querySelector('input[name="level"]:checked');
  console.log(level.id);
  level = level.id;

  if (image) {
    selectedType = image.id;

    let xhr2 = new XMLHttpRequest();
    xhr2.onreadystatechange = function () {
      if (xhr2.readyState === XMLHttpRequest.DONE) {
        if (xhr2.status == 200) {
          let data = JSON.parse(xhr2.responseText);
          console.log(data[0]);
          time = data[0].level_time;
          // data.reduce;
          // displayLevels(data);

          let xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status == 200) {
                console.log("reached here");
                let data = JSON.parse(xhr.responseText);
                console.log(data);
                images = data.reduce((acc, curr) => [...acc, curr.image], []);
                //shuffling the array
                images = images
                  .map((value) => ({ value, sort: Math.random() }))
                  .sort((a, b) => a.sort - b.sort)
                  .map(({ value }) => value);

                totalImages = images.length;
                testImages = images.reduce(
                  (acc, curr) => [
                    ...acc,
                    {
                      img: curr,
                      isRepeated: acc.some((obj) => obj.img == curr)
                        ? "1"
                        : "0",
                    },
                  ],
                  []
                );
                winningPattern = testImages.reduce(
                  (acc, curr) => acc + curr.isRepeated,
                  ""
                );
                //keydown event
                document.addEventListener("keydown", function (event) {
                  console.log(event.code);
                  document.activeElement.blur(); //<----- Here my edit
                  if (event.code === "Space") {
                    endTime = new Date().getTime(); //
                    responseTime = (endTime - startTime) / 1000; //
                    responseTimeArray.push(responseTime);
                    pattern = pattern.substring(0, pattern.length - 1) + "1";
                  }
                });

                // displayLevels(data);
                displayImage(images, time);
                console.log(images);
              } else {
                console.log("here");
              }
            }
          };
          xhr.open("GET", `php/get-images.php?type=${selectedType}`, true);
          xhr.send();
        }
      }
    };

    xhr2.open("GET", `php/get-level.php?level=${level}`, true);
    xhr2.send();
  } else {
    // If no radio button with the name "image" is checked
    console.log("No image selected");
  }
  // console.log(image);
});
