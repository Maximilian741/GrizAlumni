async function randomizeV2() {
    // this is a second attempt at the randomize function
    const response = await fetch('https://raw.githubusercontent.com/Rileyj-m/TESTALUM.io/master/AlmunDisplay/Alum_Disp/json/csvjson.json');

    // now we have the json file and can parse it
    const json = await response.text();
    const jsonConverted = JSON.parse(json);

    returnarr = [];
    // we pull out the json objects in the json array when they dont have keys
    for (var i = 0; i < jsonConverted.length; i++) {
        var jsonstring = JSON.stringify(jsonConverted[i]["Q11"]);
        // check if the string is an email
        if (jsonstring.includes("@")) {
            // add to the return array
            returnarr.push(jsonConverted[i]);
        }
    }
    // console.log(returnarr);

    // now lets pull out the business that have a Q23
    var returnarr2 = [];
    for (var i = 0; i < returnarr.length; i++) {
        if (returnarr[i]["Q23"] == "GoodsandServices") {
            returnarr2.push(returnarr[i]);
        }
    }
    // for each value in the returnarr2 we need to display it
    var container = document.getElementById("GoodsandServicesBusiness");
    console.log(returnarr2.length)
    for (var i = 0; i < returnarr2.length; i++) {
        // create a div
        var div = document.createElement("div");
        div.className = "col-md-4";

        // create a team item
        var teamitem = document.createElement("div");
        teamitem.className = "team-item";

        // create a team image
        var teamimage = document.createElement("div");
        teamimage.className = "team-image";

        // create a team text
        var teamtext = document.createElement("div");
        teamtext.className = "team-text";

        // create a h3
        var h3 = document.createElement("h3");
        h3.innerHTML = returnarr2[i]["Q8"];

        // create a team position
        var teamposition = document.createElement("div");
        teamposition.className = "team-position";
        teamposition.innerHTML = returnarr2[i]["Q1"];

        // create a p
        var poplink = document.createElement("a");
        var p = document.createElement("p");
        poplink.href = "#";
        poplink.setAttribute("data-toggle", "modal");
        poplink.setAttribute("data-target", "#myModal" + i);
        poplink.innerHTML = "More Info";
        p.appendChild(poplink);
        setpopup(p,i,returnarr2);
        // create an a
        var a = document.createElement("a");
        a.className = "btn btn-primary";
        a.innerHTML = "Website";
        a.href = returnarr2[i]["Q3"];

        // append the elements

        teamtext.appendChild(h3);
        teamtext.appendChild(teamposition);
        teamtext.appendChild(p);
        teamtext.appendChild(a);

        teamitem.appendChild(teamimage);
        teamitem.appendChild(teamtext);

        div.appendChild(teamitem);

        container.appendChild(div);
    }
}
randomizeV2();

function setpopup(p,j,returnarr2) {
    var modal = document.createElement("div");
            modal.className = "modal fade";
            modal.id = "myModal" + j;
            modal.setAttribute("role", "dialog");
            modal.setAttribute("aria-labelledby", "myModalLabel");
            modal.setAttribute("aria-hidden", "false");

            //increase size of text
            modal.style = "font-size: 1.5em;";
            //change the cakground color
            modal.style = "background-color: #000000;";
            //change the color of the text to black
            modal.style = "color: #000000;";
           

        


            // create a modal dialog pull the information from the json array
            var modalDialog = document.createElement("div");
            modalDialog.className = "modal-dialog";
            modalDialog.id = "modalDialog" + j;
            modalDialog.innerHTML = returnarr2[j]["Q1"];
            modalDialog.style = "background-color: #ffffff;"
            //Increase the size of the text"

            // create a modal content
            var modalContent = document.createElement("div");
            modalContent.className = "modal-content";
            modalContent.id = "modalcontent" + j;
            modalContent.innerHTML = returnarr2[j]["Q2"];

            // create a modal header
            var modalHeader = document.createElement("div");
            modalHeader.className = "modal-header";
            modalHeader.id = "modalheader" + j;
            modalHeader.innerHTML = returnarr2[j]["Q3"];

            // create a modal body
            var modalBody = document.createElement("div");
            modalBody.className = "modal-body";
            modalBody.id = "modalbody" + j;
            //Change return array to phone number format.
            modalBody.innerHTML = returnarr2[j]["Q4"];

            // create a modal footer
            var modalFooter = document.createElement("div");
            modalFooter.className = "modal-footer" + j;
            modalFooter.id = "modalfooter" + j;
            modalFooter.innerHTML = returnarr2[j]["Q5"];
          
        

            //create footer for twitter link
            var twitter = document.createElement("div");
            twitter.className = "modal-footer" + j + "t";
            if (returnarr2[j]["Q6_1"] == "") {
                twitter.innerHTML = "No Twitter";
            }
            else
            {
            twitter.innerHTML = returnarr2[j]["Q6_1"];
            }

            //Facebook link
            var facebook = document.createElement("div");
            facebook.className = "modal-footer" + j + "f";
            facebook.innerHTML = returnarr2[j]["Q6_2"];
            if (returnarr2[j]["Q6_2"] == "") {
                facebook.innerHTML = "No Facebook";
            }
            else
            {
                
                facebook.innerHTML = "Facebook: " + returnarr2[j]["Q6_2"];
                
            }

            //Instagram link
            var instagram = document.createElement("div");
            instagram.className = "modal-footer" + j + "i";
            if (returnarr2[j]["Q6_3"] == "") {
                instagram.innerHTML = "No Instagram";
            }
            else
            {
                instagram.innerHTML = returnarr2[j]["Q6_3"];
            }


            p.appendChild(modal);
            modal.appendChild(modalDialog);
            modalDialog.appendChild(modalContent);
            modalContent.appendChild(modalHeader);
            modalContent.appendChild(modalBody);
            modalContent.appendChild(modalFooter);
            modalContent.appendChild(twitter);
            modalContent.appendChild(facebook);
            modalContent.appendChild(instagram);
}