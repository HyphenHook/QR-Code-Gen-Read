document.querySelector(".dark").addEventListener("input", changeColor);
document.querySelector(".light").addEventListener("input", changeColor);
document.querySelector(".txtin").addEventListener("input", changeTxt);
document.querySelector(".sizes").addEventListener("change", changeSize);
document.querySelector(".share").addEventListener("click", getShare);

const defaultTxt = "Hello World!";
let colorLight = "#fff",
    colorDark = "#000",
    text = defaultTxt,
    size = 450;

function changeColor(e){
    if(e.target.classList.contains("light")){
        colorLight = e.target.value;
    }
    else{
        colorDark = e.target.value;
    }
    changeQR();
}

function changeTxt(e){
    text = e.target.value;
    if(!text){
        text = defaultTxt;
    }
    changeQR();
}

function changeSize(e){
    document.querySelector(".outSize").innerText = e.target.value + "x" + e.target.value;
    size = e.target.value;
    changeQR();
}

async function changeQR(){
    document.querySelector("#options").innerHTML = "";
    new QRCode("options", {
        text,
        height: size,
        width: size,
        colorLight,
        colorDark,
    });
    document.querySelector(".download").href = await resolveDataUrl();
}

async function getShare(){
    setTimeout(async function() {
        try{
            const base64url = await resolveDataUrl();
            const blob = await (await fetch(base64url)).blob();
            const file = new File([blob], "QRCode.png", {
                type: blob.type,
            });
            await navigator.share({
                files: [file],
                title: text,
            });
        }catch(error){
            alert("Unsupported Browser!");
        }
    }, 100);
}
function resolveDataUrl(){
    return new Promise((resolve) =>{
        setTimeout(function() {
            const img = document.querySelector("#options img");
            if(img.currentSrc){
                resolve(img.currentSrc);
                return;
            }
            const canvas = document.querySelector("canvas");
            resolve(canvas.toDataURL());
        }, 50);
    });
}
changeQR();

/* QRCode.js example -> https://github.com/davidshimjs/qrcodejs?utm_source=cdnjs&utm_medium=cdnjs_link&utm_campaign=cdnjs_library */