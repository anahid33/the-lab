function toggleAccordion() {
    $("#panelID").toggleClass("showmenu");
    $("#page-title").toggleClass("showmenu");
}

function goToPage(page,e) {
    if(page<1 || page>5){
        return;
    }
    currentform = page;
    $("#panelID").removeClass("showmenu");
    $("#page-title").removeClass("showmenu");
    $(".form-panel").addClass("hidden");
    $("#form-" + page).removeClass("hidden");

    $("[class*='form-selector']").removeClass("progress-active");
    $(".form-selector-" + page).addClass("progress-active");
    
    $("#page-title").text($(e).text());
}

var currentform = 1;
function nextPage() {
    goToPage(currentform + 1);
}

function lastPage() {
    goToPage(currentform - 1);
}

function toggleVisibility(e, visible) {
    if(visible) {
        $("#"+e).removeClass("hidden");
    }else {
        $("#"+e).addClass("hidden");
    }
}