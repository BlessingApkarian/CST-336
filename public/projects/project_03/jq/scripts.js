// JavaScript File
// actually jquery lol 
/*global $*/


$("#keyword").on("change", function(){
    
    $.ajax({
        method: "GET",
        url: "https://www.behindthename.com/api/lookup.json",
        datatype: "json",
        data: { 
                "key"  : "bl385575546",
                "name" : $("#keyword").val()
        },
        success: function(result,status){
            // alert(result[0].gender);
            
            $("#gender").html("");
            $("#lang").html("");
            $("#langList").html("");
            
            if(result[0].gender == "m"){
                $("#gender").html("Gender: Male");
                $("#body").css("background-color", "#55A9F1");
                $("#body").css("background-image", "none");
            }
            else if(result[0].gender == "f"){
                $("#gender").html("Gender: Female");
                $("#body").css("background-color", "#FCBAD7");
                $("#body").css("background-image", "none");
            }
            else {
                $("#gender").html("Gender: Male and Female");
                $("#body").css("background-color", "#55A9F1");
                $("#body").css("background-image", "linear-gradient(to bottom right, #FCBAD7, #55A9F1)");
            }
            
            // alert(result[0].usages[0].usage_gender);
            $("#lang").html("Languages used in: ");
            for(let i = 0; i < result[0].usages.length; i++) {
                $("#langList").append("<li>" + result[0].usages[i].usage_full + "</li>");
            }
        }
    });
    $("#search").css("color", "white");
});