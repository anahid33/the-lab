function playVideo(){
    var c = $("#arjs-video");
    console.log(c);
    if (c.length > 0){
        c[0].play();
    }
}