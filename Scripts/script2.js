const scanner = new Html5QrcodeScanner('read', {
    qrbox:{
        width: 250,
        height: 250,
    },
    fps: 20,
});

scanner.render(success, error);

function success(result){
    document.querySelector('.outputBox').value = result;
}

function error(err){
    console.error(err);
}