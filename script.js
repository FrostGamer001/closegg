document.documentElement.requestFullscreen(); // Tam ekran
const video = document.getElementById("camera");
const canvas = document.getElementById("canvas");
const photo = document.getElementById("photo");
const output = document.getElementById("output");
const fakeMouse = document.getElementById("fakeMouse");
const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const ctx = canvas.getContext("2d");

// Kamera erişimi
navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    video.srcObject = stream;
    video.play();

    setTimeout(() => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imgData = canvas.toDataURL("image/png");
        photo.src = imgData;
        photo.style.display = "block";
        photo.alt = "closegg";
        output.style.display = "block";

        video.style.display = "none";
        fakeMouse.style.display = "block";

        moveFakeMouse();
    }, 10000); // 10 saniye bekle
});

function moveFakeMouse() {
    let x = 100;
    let y = 100;
    const interval = setInterval(() => {
        x += 10;
        y += 10;
        fakeMouse.style.left = `${x}px`;
        fakeMouse.style.top = `${y}px`;

        if (x > window.innerWidth - 50) {
            clearInterval(interval);
            fakeMouse.style.left = `${yesBtn.offsetLeft + 10}px`;
            fakeMouse.style.top = `${yesBtn.offsetTop + 10}px`;

            setTimeout(() => {
                simulateTyping("12345"); // Şifreyi yaz
            }, 1000);
        }
    }, 100);
}

function simulateTyping(password) {
    let typed = "";
    const interval = setInterval(() => {
        if (typed.length < password.length) {
            typed += password[typed.length];
        } else {
            clearInterval(interval);
            grantAccess();
        }
    }, 300);
}

function grantAccess() {
    document.body.innerHTML = "<h1 style='color: green;'>Access Granted</h1>";
    setTimeout(() => {
        window.close();
    }, 2000);
}