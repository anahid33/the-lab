function toggleAccordion() {
    $("#panelID").toggleClass("showmenu");
}

function goToPage(page) {
    if(page<1 || page>5){
        return;
    }
    currentform = page;
    $("#panelID").removeClass("showmenu");
    $(".form-panel").addClass("hidden");
    $("#form-" + page).removeClass("hidden");

    $(".form-selector").removeClass("progress-active");
    $("#form-selector-" + page).addClass("progress-active");
}

var currentform = 1;
function nextPage() {
    goToPage(currentform + 1);
}

function lastPage() {
    goToPage(currentform - 1);
}


