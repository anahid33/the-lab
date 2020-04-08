function playVideo(){
    var c = $("#samplevideo");
    console.log(c);
    if (c.length > 0){
        c[0].play();
    }
}