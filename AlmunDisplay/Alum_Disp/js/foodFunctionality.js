{/* <div class="row" id="FoodBusiness">
                        <!-- SPONSORED ACTOR 1 -->
                        <div class="col-md-4">
                            <div class="team-item">
                                <div class="team-image">
                                    <!--<img src="images/demo/author-2.jpg" class="img-responsive" alt="author">-->
                                </div>
                                <div class="team-text">
                                    <h3>Robert Eskridge</h3>
                                    <div class="team-position"> Eskridge Enterprises LLC.</div>
                                    <p>
                                        We are a service disabled, veteran owned small business that specializes in
                                        contract staffing
                                        of medical providers for government contracts nationwide.

                                    </p>
                                    <!--Pull in the website information from the Json file in the same directory-->
                                    <a href="https://www.eskridgeenterprises.com/" class="btn btn-primary">Website</a>
                                    
                                </div>
                            </div>
                        </div> */}




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
        if (returnarr[i]["Q23"] == "Food") {
            returnarr2.push(returnarr[i]);
        }
    }
    // for each value in the returnarr2 we need to display it
    var container = document.getElementById("FoodBusiness");
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

        //This needs to be a popup modal that displays all the information entered by thebusiness
        // create a popup link modal
        var poplink = document.createElement("a");
        var p = document.createElement("p");
        poplink.href = "#";
        poplink.setAttribute("data-toggle", "modal");
        poplink.setAttribute("data-target", "#myModal");
        poplink.innerHTML = "More Info";
        p.appendChild(poplink);

        // create a modal
        //This will display all the information when the poplink is clicked.  This information needs to be pulled from the json file and be 
        //specifc to each business poplink that is clicked.
        //It muct include all of the information that the business entered into the form that is valid.
         for(var j = 0; j < returnarr2.length; j++){
            var modal = document.createElement("div");
            modal.className = "modal fade";
            modal.id = "myModal";
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
            modalDialog.innerHTML = returnarr2[j]["Q1"];

            // create a modal content
            var modalContent = document.createElement("div");
            modalContent.className = "modal-content";
            modalContent.innerHTML = returnarr2[j]["Q2"];

            // create a modal header
            var modalHeader = document.createElement("div");
            modalHeader.className = "modal-header";
            modalHeader.innerHTML = returnarr2[j]["Q3"];

            // create a modal body
            var modalBody = document.createElement("div");
            modalBody.className = "modal-body";
            modalBody.innerHTML = returnarr2[j]["Q4"];

            // create a modal footer
            var modalFooter = document.createElement("div");
            modalFooter.className = "modal-footer";
            modalFooter.innerHTML = returnarr2[j]["Q5"];
        }



        
        

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

        //This is for the popup content
        // teamitem.appendChild(p);

        p.appendChild(modal);
        modal.appendChild(modalDialog);
        modalDialog.appendChild(modalContent);
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);



        
     

        div.appendChild(teamitem);

        container.appendChild(div);
    }
}
randomizeV2();