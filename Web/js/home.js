// enter log_in not display other interface
var usernamedisplay = "";
function log_in_button() {
    document.getElementById('login_modal').style.display = 'block';
    document.getElementById('register_modal').style.display = 'none';
    document.getElementById('error_box').style.display = 'none';
    document.getElementById('leaderboard_page').style.display = 'none';
    document.getElementById('introduction_model').style.display = 'none';
    document.getElementById('user_modal').style.display = 'none';
}

// enter introduction button  not display other interface
function introduction_button() {
    document.getElementById('introduction_model').style.display = 'block';
    document.getElementById('login_modal').style.display = 'none';
    document.getElementById('register_modal').style.display = 'none';
    document.getElementById('error_box').style.display = 'none';
    document.getElementById('leaderboard_page').style.display = 'none';
    document.getElementById('user_modal').style.display = 'none';
}

if (!localStorage.user_id || !localStorage.pass) {
    localStorage.user_id = "";
    localStorage.pass = "";
} else {
    document.getElementById("login-username").value = localStorage.user_id;
    document.getElementById("login-password").value = localStorage.pass;
    Login();
    document.getElementById("error_box").style.display = "none";
    document.getElementById("login_modal").style.display = "none";
}
fetch('https://api.dxh000130.top/api/GetVersion', {
    credentials: 'include',
    method: 'GET'
})
    .then(function (response) {
        return response.text()
    })
    .then(function (myJson) {
        console.log('Version' + myJson);
    });
let valid_log = false;




// log in
function Login() {
    document.getElementById("error_box").style.display = "block";
    var username = document.getElementById("login-username").value;
    var password = document.getElementById("login-password").value;
    let headers1 = new Headers();
    var text = document.getElementById("error_text");

    // prompt if user not input all information
    if (username == "" && password != "") {
        text.innerText = "Please Enter Your Username !";
    } else if (username != "" && password == "") {
        text.innerText = "Please enter your password !";
    } else if (username == "" && password == "") {
        text.innerText = "Please enter your username and password !";
    } else {
        headers1.append('Authorization', 'Basic ' + btoa(username + ":" + password));
        fetch('https://api.dxh000130.top/api/Login', {
            credentials: 'include',
            method: 'GET',
            headers: headers1
        }).then(r => {
            if (r.status == 200) {
                let temp1 = r.text();
                temp1.then(function (return_text) {
                    localStorage.user_id = return_text
                })
                localStorage.pass = password;
                text.innerText = "You have successfully logged in!";
                valid_log = true;

                // display in sign box
                if (document.getElementById("login-username").value.length > 9) {
                    usernamedisplay = document.getElementById("login-username").value.substring(0, 9) + "...";
                } else {
                    usernamedisplay = document.getElementById("login-username").value;
                }

                // if log in, set auto close log in inpterface after 2s
                if (valid_log == true) {
                    setTimeout(function(){
                    document.getElementById("login_modal").style.display = "none";
                    document.getElementById("error_box").style.display = "none";
                },2000)}
                const button = document.getElementById("error_button");
                button.onclick = function () {
                    document.getElementById("error_box").style.display = "none";
                    document.getElementById("login_modal").style.display = "none";
                }
                // change word in log in box
                document.getElementById("log_in_button_container").style.display = "none";
                document.getElementById("log_out_button_container").style.display = "block";
                document.getElementById("log_out_typeface1").innerHTML = "Welcome, " + usernamedisplay + "!";
            } else {
                text.innerText = "Your username or password is wrong ! Please try it again !";
                valid_log = false;
                document.getElementById("login-username").value = "";
                document.getElementById("login-password").value = "";
            }
        });
    }
}

// log out
function log_out() {
    document.getElementById("log_in_button_container").style.display = "block";
    document.getElementById("log_out_button_container").style.display = "none";
    valid_log = false;
    document.getElementById("error_box").style.display = "none";
    document.getElementById("login_modal").style.display = "none";
    document.getElementById('introduction_model').style.display = 'none';
    document.getElementById('register_modal').style.display = 'none';
    document.getElementById('leaderboard_page').style.display = 'none';
    document.getElementById('user_modal').style.display = 'none';
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut();
    localStorage.user_id = "";
    localStorage.pass = "";
}



// register
function register() {
    document.getElementById("error_box").style.display = "block";
    var username = document.getElementById("register-username").value;
    var password = document.getElementById("register-password").value;
    var email = document.getElementById("register-email").value;
    var verification = document.getElementById("register-verification").value;
    var text = document.getElementById("error_text");

    // if not complete all information, then cannot register
    if (username == "" && password != "" && email != "" && verification != "") {
        text.innerText = "Please Enter Your Username !";
    } else if (username != "" && password == "" && email != "" && verification != "") {
        text.innerText = "Please Enter Your Password !";
    } else if (username != "" && password != "" && email == "" && verification != "") {
        text.innerText = "Please Enter your Email !";
    } else if (username != "" && password != "" && email != "" && verification == "") {
        text.innerText = "Please Enter your Verification Code !";
    } else if (username != "" && password != "" && !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email) && verification == "") {
        text.innerText = "Please Enter Correct Email !";
    } else if (username != "" && password != "" && email != "" && verification != "") {
        const signup = fetch("https://api.dxh000130.top/api/Register", {
            credentials: 'include',
            method: "POST",
            headers: {

                "Content-Type": "application/json",
                "Accept": "text/plain",
            },
            body: JSON.stringify({
                "UserName": username,
                "Password": password,
                "Email": email,
                "Code": verification,
            })
        });
        signup.then(res => {
            res.text().then(function (return_text) {
                text.innerText = return_text;
                if (return_text == "User successfully registered.") {
                    const button = document.getElementById("error_button");
                    button.onclick = function () {
                        document.getElementById("error_box").style.display = "none";
                        document.getElementById("register_modal").style.display = "none";
                    }
                    setTimeout(function(){
                        document.getElementById("register_modal").style.display = "none";
                        document.getElementById("error_box").style.display = "none";
                    },2000)
                } else {
                    const button = document.getElementById("error_button");
                    button.onclick = function () {
                        document.getElementById("error_box").style.display = "none";
                        document.getElementById("register_modal").style.display = "block";
                    }
                }
            });
        });
    } else {
        text.innerText = "Please Complete All Information !";
    }
}


// mailbox verification in register interface
function verification() {
    var email = document.getElementById("register-email").value;
    var text = document.getElementById("error_text");
    document.getElementById("error_box").style.display = "block";
    if (email == "") {
        text.innerText = "Please Enter your Email !";
        // make sure input correct email
    } else if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)) {
        text.innerText = "Please Enter your Correct Email !";
    } else {
        document.getElementById("error_box").style.display = "none";
        const url = fetch("https://api.dxh000130.top/api/Registrationverificationcode/" + email, {
            // credentials: 'include',
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        }).then(res => {
            res.text().then(function (return_text) {
                console.log(return_text);
                if(return_text == '"yes"'){
                    document.getElementById("error_box").style.display = "block";
                    text.innerText = "Verification code successfully sent!";
                    t = setInterval(function () {
                        countdown()
                    }, 1000)
                    countdown();
                }
                else if (return_text == '"This email has been registered by another user"') {
                    document.getElementById("error_box").style.display = "block";
                    text.innerText = "This Email Has Been Resgistered !";
                }
            });
        })
    }
}



// set up when after 60s could click get verfication again
var time = 60;
function countdown() {
    if (time == 0) {
        // Click the email verification button again when time is 0
        document.getElementById("code").onclick = "verification()";
        document.getElementById("code").value = "Get Verification Code";
        time = 60;
        clearInterval(t);
    } else {
        // cannot Click the email verification button again
        document.getElementById("code").onclick = "";
        document.getElementById("code").value = "Resend in " + time + "s";
        time--;
    }
}





///google log in
function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    // console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    // console.log('Full Name: ' + profile.getName());
    // console.log('Given Name: ' + profile.getGivenName());
    // console.log('Family Name: ' + profile.getFamilyName());
    // console.log("Image URL: " + profile.getImageUrl());
    // console.log("Email: " + profile.getEmail());
    var text1 = document.getElementById("error_text");
    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    // console.log("ID Token: " + id_token);
    const signup = fetch("https://api.dxh000130.top/api/vaildgoogleAsync", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "text/plain",
        },
        body: JSON.stringify({
            "Email": profile.getEmail(),
            "ID": id_token,
            "Name": profile.getName(),
        })

    })
    signup.then(res => {
        res.text().then(function (text) {
            // if username is too long, then display 9 digit username
            usernamedisplay=profile.getEmail().substring(0, 9) + "...";
            if (text != "This email has been occupied, please log in first and then bind Google" && text != "no") {
                user = text.split(",");
                localStorage.user_id = user[0];
                localStorage.pass = user[1];
                valid_log = true;
                document.getElementById("log_out_typeface1").innerHTML = "Welcome, " + usernamedisplay + "!";
                const button = document.getElementById("error_button");
                document.getElementById("login_modal").style.display = "none";
                document.getElementById("log_in_button_container").style.display = "none";
                document.getElementById("log_out_button_container").style.display = "block";
                document.getElementById("error_box").style.display = "none";
            } else if (text == "This email has been occupied, please log in first and then bind Google") {
                document.getElementById("error_box").style.display = "block";
                text1.innerText = "This email has been occupied, please log in first and then bind Google!";
                valid_log = false;
                document.getElementById("login-username").value = "";
                document.getElementById("login-password").value = "";
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut()
            }
        });

    });
}


// leaderboard
localStorage.score = 0;
function GetLeaderboard() {
    document.getElementById('login_modal').style.display = 'none';
    document.getElementById('register_modal').style.display = 'none';
    document.getElementById('error_box').style.display = 'none';
    document.getElementById('introduction_model').style.display = 'none';
    document.getElementById('user_modal').style.display = 'none';
    // in order to click button again and get new rank
    ClearLeaderBoard();
    // make sure log in first
    if (valid_log == false) {
        document.getElementById("first_page").style.display = "block";
        document.getElementById("login_modal").style.display = "block";
        // document.getElementById("difficult_page").style.display = "none";
        document.getElementById("play_homepage").style.display = "none";
        document.getElementById("error_box").style.display = "block";
        document.getElementById("error_text").innerHTML = "Please log in first";
    } else {
        document.getElementById('leaderboard_page').style.display = 'block';
        var htmltable = document.getElementById("rank");
        let headers2 = new Headers();
        headers2.append('Authorization', 'Basic ' + btoa(localStorage.user_id + ":" + localStorage.pass));
        fetch("https://api.dxh000130.top/api/Leaderboard/" + localStorage.user_id, {
            credentials : 'include',
            method: 'GET',
            headers: headers2
        }).then(r => {
            r.json().then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    var row = ` <tr>
                                <td>${data[i].index}</td>
                                <td>${data[i].username}</td>
                                <td>${data[i].score}</td>
                            </tr>`
                    htmltable.innerHTML += row
                }
            })
        })
    }
}


// get currect score and display it in leaderborad
function getscore() {
    let headers2 = new Headers();
    headers2.append('Authorization', 'Basic ' + btoa(localStorage.user_id + ":" + localStorage.pass));
    fetch("https://api.dxh000130.top/api/Leaderboard/" + localStorage.user_id, {
        credentials : 'include',
        method: 'GET',
        headers: headers2
    }).then(r => {
        r.json().then(function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].username == localStorage.user_id) {
                    localStorage.score = data[i].score;
                    console.log(localStorage.score);
                    document.getElementById("current_score_div").innerHTML = localStorage.score;
                }
            }
        })
    })
};
// clear correct leaderboard
function ClearLeaderBoard() {
    var table = document.getElementById("rank");
    table.innerHTML = "";
}


// enter play button not display other interface
function display_game() {
    if (valid_log == false) {
        document.getElementById("first_page").style.display = "block";
        document.getElementById("login_modal").style.display = "block";
        // document.getElementById("difficult_page").style.display = "none";
        document.getElementById("play_homepage").style.display = "none";
        document.getElementById("error_box").style.display = "block";
        document.getElementById("error_text").innerHTML = "Please log in first";
        document.getElementById('register_modal').style.display = 'none';
        document.getElementById('leaderboard_page').style.display = 'none';
        document.getElementById('introduction_model').style.display = 'none';
        document.getElementById('user_modal').style.display = 'none';
    } else {
        // display_play("L","Inspirational");
        document.getElementById("play_homepage").style.display = "block";
        document.getElementById("first_page").style.display = "none";
        // document.getElementById("login_modal").style.display="none";
        // document.getElementById("difficult_page").style.display = "block";
        document.getElementById("hand_span1").className = "hand_span8";
        document.getElementById("hand_span2").className = "hand_span8";
        document.getElementById("hand_span3").className = "hand_span8";
        document.getElementById("hand_span4").className = "hand_span8";
        document.getElementById("hand_span5").className = "hand_span8";
        document.getElementById("hand_span6").className = "hand_span8";

    }
}


// click theme button in game interface, and then these button have a animation, which written in css
function openTab(evt) {
    var i;
    var tablinks;
    tablinks = document.getElementsByClassName("tab");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    evt.currentTarget.className += " active";
}



// enter back home button which in top right for all interface
function BackToHome() {

    document.getElementById("first_page").style.display = "block";
    // document.getElementById("difficult_page").style.display = "none";
    document.getElementById("play_homepage").style.display = "none";
    document.getElementById('login_modal').style.display = 'none';
    document.getElementById('register_modal').style.display = 'none';
    document.getElementById('error_box').style.display = 'none';
    document.getElementById('introduction_model').style.display = 'none';
    document.getElementById('leaderboard_page').style.display = 'none';
    document.getElementById("user_modal").style.display = "none";
    // Set the timer on the game interface to 0
    display_play("", "");
    // document.getElementById('play_homepage').innerHTML.reload();
    // window.location.reload();
    document.getElementById("dictionaries_input").value = "";
    document.getElementById("definition").innerHTML = "<h3>Definition</h3>";
    // refresh timer
    document.getElementById("hand_span1").removeAttribute("style");
    document.getElementById("hand_span2").removeAttribute("style");
    document.getElementById("hand_span3").removeAttribute("style");
    document.getElementById("hand_span4").removeAttribute("style");
    document.getElementById("hand_span5").removeAttribute("style");
    document.getElementById("hand_span6").removeAttribute("style");
    // refresh theme button
    document.getElementById("tab1").className = "tab";
    document.getElementById("tab2").className = "tab";
    document.getElementById("tab3").className = "tab";
    document.getElementById("tab4").className = "tab";
    document.getElementById("tab5").className = "tab";
    document.getElementById("tab6").className = "tab";


}



// Change the background button in the game interface
if (!localStorage.change_background) {
    localStorage.change_background = "#ffffff";
    document.getElementById("text").style.backgroundColor = localStorage.change_background;
    document.getElementById("text").style.color = localStorage.content;
} else {
    document.getElementById("text").style.backgroundColor = localStorage.change_background;
    document.getElementById("text").style.color = localStorage.content;
}
function change_background() {
    if (localStorage.change_background == "#ffffff")
        localStorage.change_background = "#f6f1e7";
    else if (localStorage.change_background == "#f6f1e7")
        localStorage.change_background = "#dadada";
    else if (localStorage.change_background == "#dadada")
        localStorage.change_background = "#dae9da";
    else if (localStorage.change_background == "#dae9da")
        localStorage.change_background = "#ebcece";
    else if (localStorage.change_background == "#ebcece") {
        localStorage.change_background = "#ebddae";
        localStorage.content = "";
        document.getElementById("text").style.color = localStorage.content;
    } else if (localStorage.change_background == "#ebddae")
        localStorage.change_background = "#dfecf0";
    else
        localStorage.change_background = "#ffffff";
    document.getElementById("text").style.backgroundColor = localStorage.change_background;
}


// Change the font button in the game interface
if (!localStorage.change_font_family) {
    localStorage.change_font_family = "Georgia";
    document.getElementById("text").style.fontFamily = localStorage.ziti;
} else {
    document.getElementById("text").style.fontFamily = localStorage.ziti;
}
function change_font_family() {
    if (localStorage.ziti == "Georgia") {
        localStorage.ziti = "Palatino Linotype";
    } else if (localStorage.ziti == "Palatino Linotype") {
        localStorage.ziti = "Times New Roman";
    } else if (localStorage.ziti == "Times New Roman") {
        localStorage.ziti = "Arial";
    } else if (localStorage.ziti == "Arial") {
        localStorage.ziti = "Monaco";
    } else if (localStorage.ziti == "Monaco") {
        localStorage.ziti = "Lucida Handwriting";
    } else if (localStorage.ziti == "Lucida Handwriting") {
        localStorage.ziti = "Lucida Console";
    } else {
        localStorage.ziti = "Georgia";
    }
    document.getElementById("text").style.fontFamily = localStorage.ziti;
}

// Change the font size button in the game interface
if (!localStorage.zitidaxiao) {
    localStorage.zitidaxiao = "20";
    document.getElementById("text").style.fontSize = localStorage.zitidaxiao + 'px';
} else {
    console.log(localStorage.zitidaxiao);
    document.getElementById("text").style.fontSize = localStorage.zitidaxiao + 'px';
}

function change_font_size_big() {
    // set max size
    if (parseInt(localStorage.zitidaxiao)<30){
        localStorage.zitidaxiao++;
        document.getElementById("text").style.fontSize = localStorage.zitidaxiao + 'px';
    }
}

function change_font_size_small() {
    // set min size
    if (parseInt(localStorage.zitidaxiao)>15){
        localStorage.zitidaxiao--;
        document.getElementById("text").style.fontSize = localStorage.zitidaxiao + 'px';
    }

}

// change difficulty level and refresh text box
function display_content_h3() {
    isRunning = false;
    time_reset();
    document.getElementById("text").style.display = "block";
    document.getElementById("think").style.display = "none";
    document.getElementById("btn1").style.display = "none";
    document.getElementById("text").innerHTML = `<h2 style="font-family: 'Papyrus';text-align: center;margin-top: 15%;line-height: 80px;word-spacing: 15px"> Please select the difficulty level and the theme of article first</h2>`;
    document.getElementById("hand_span1").className = "hand_span9";
    document.getElementById("hand_span2").className = "hand_span9";
    document.getElementById("hand_span3").className = "hand_span9";
    document.getElementById("hand_span4").className = "hand_span9";
    document.getElementById("hand_span5").className = "hand_span9";
    document.getElementById("hand_span6").className = "hand_span9";
    document.getElementById('firework').style.display = 'none';
    document.getElementById('play_bottom').style.display = 'none';

}


// Display articles based on the difficulty and topic of the user's click
var difficulties = "";
var theme = "";
var articleid = 999;
var error_remain = 999;
var wholearticle = "";
var AlreadyCorrect = "";
var textinput = document.getElementById("user_input");
var total_errors = 0;
var timer1 = null;
var isRunning = false;
function display_play(difficulties, theme) {
    // let refresh timer when change theme
    document.getElementById("hand_span1").removeAttribute("style");
    document.getElementById("hand_span2").removeAttribute("style");
    document.getElementById("hand_span3").removeAttribute("style");
    document.getElementById("hand_span4").removeAttribute("style");
    document.getElementById("hand_span5").removeAttribute("style");
    document.getElementById("hand_span6").removeAttribute("style");
    if (difficulties == "" && theme == "") {
        time_reset();
        document.getElementById("i1").checked = true;
        document.getElementById('b1').style.display = 'block';
        document.getElementById('b2').style.display = 'none';
        document.getElementById('b3').style.display = 'none';
        document.getElementById('text').innerHTML = '';
        document.getElementById("play_bottom").style.display = "none";
        document.getElementById("btn1").style.display = "none";
        document.getElementById("text").style.display = "block";
        document.getElementById("think").style.display = "none";
        document.getElementById('content_color').style.backgroundColor = '#e2ba34';
        document.getElementById("text").innerHTML = `<h2 style="font-family: 'Papyrus';text-align: center;margin-top: 15%;line-height: 80px;word-spacing: 15px"> Please select the difficulty level and the theme of article first</h2>`;
        document.getElementById("current_score_div").innerHTML = "";
        document.getElementById("total_error_div").innerHTML = "";
        document.getElementById("remain_error_div").innerHTML = "";
        document.getElementById("play_bottom").style.display = "none";
        document.getElementById("user_input").innerHTML = "";
        document.getElementById("firework").style.display = "none";

    } else {
        document.getElementById("first_page").style.display = "none";
        // document.getElementById("difficult_page").style.display = "none";
        document.getElementById("play_homepage").style.display = "block";
        var ArticleChooseheader = new Headers();
        getscore();
        time_reset();
        document.getElementById("firework").style.display = "none";
        ArticleChooseheader.append('Authorization', 'Basic ' + btoa(localStorage.user_id + ":" + localStorage.pass));
        ArticleChooseheader.append('Content-Type', 'application/json')
        ArticleChooseheader.append('Accept', 'text/plain')
        const ArticleChoose = fetch("https://api.dxh000130.top/api/ArticleChoose", {
            credentials: 'include',
            method: "POST",
            headers: ArticleChooseheader,
            body: JSON.stringify({
                "Difficulty": difficulties,
                "Type": theme,
            })
        })
        ArticleChoose.then(res => {
            res.json().then(function (return_text) {
                // put article into text box
                document.querySelector('#text').innerHTML = return_text.article;
                start_timer();
                document.getElementById("btn1").style.display = "block";
                total_errors = return_text.errorRemain;
                error_remain = total_errors;
                AlreadyCorrect = ""
                document.getElementById("user_input").value = ""
                articleid = return_text.id;
                wholearticle = return_text.article;
                document.getElementById("text").style.display = "block";
                document.getElementById("think").style.display = "none";
                document.getElementById("total_error_div").innerHTML = total_errors;
                document.getElementById("remain_error_div").innerHTML = error_remain;
                document.getElementById("current_score_div").innerHTML = localStorage.score;
                document.getElementById("play_bottom").style.display = "block";
                document.getElementById("prompt_box").style.display = "none";

                // after choose theme, and time will start
                document.getElementById("hand_span1").className = "hand_span1";
                document.getElementById("hand_span2").className = "hand_span2";
                document.getElementById("hand_span3").className = "hand_span3";
                document.getElementById("hand_span4").className = "hand_span4";
                document.getElementById("hand_span5").className = "hand_span5";
                document.getElementById("hand_span6").className = "hand_span6";
            })
        });
    }
    // pause timer animation
    document.getElementById("hand_span1").className = "hand_span9";
    document.getElementById("hand_span2").className = "hand_span9";
    document.getElementById("hand_span3").className = "hand_span9";
    document.getElementById("hand_span4").className = "hand_span9";
    document.getElementById("hand_span5").className = "hand_span9";
    document.getElementById("hand_span6").className = "hand_span9";
}

// A prompt box is displayed after the user enters a word
function input_reminder() {
    if (document.getElementById("user_input").value.length != 0) {
        document.getElementById("prompt_box").style.display = "block";
    } else {
        document.getElementById("prompt_box").style.display = "none";
    }
}

//Hint
function Hint() {
    document.getElementById("user_input").value = "";
    getscore();
    ArticleProcessMainFunction(0, 1);
}

var score_animation = 0;
// hight light word, change score, hint
function ArticleProcessMainFunction(Enterbutton, hint) {
    let headers2 = new Headers();
    headers2.append('Authorization', 'Basic ' + btoa(localStorage.user_id + ":" + localStorage.pass));
    headers2.append('Content-Type', 'application/json');
    headers2.append('Accept', 'text/plain');
    var textinput = document.getElementById("user_input");
    var username = textinput.value;
    getscore();
    document.getElementById("current_score_div").innerHTML = localStorage.score;
    if (username !== "") {
        //console.log(Enterbutton)
        const ArticleProcess = fetch("https://api.dxh000130.top/api/ArticleProcess", {
            credentials: 'include',
            method: "POST",
            headers: headers2,
            body: JSON.stringify({
                "ArticleID": articleid,
                "Article": wholearticle,
                "Input": username,
                "AlreadyCorrect": AlreadyCorrect,
                "Enter": Enterbutton,
                "hint": hint,
            })
        });
        ArticleProcess.then(res => {
            res.json().then(function (return_text1) {
                if (username !== "") {
                    //console.log(return_text1)
                    document.querySelector('#text').innerHTML = return_text1.articleDisp
                    // if user input correct spelling
                    if (return_text1.correct === "yes,add score") {
                        document.querySelector("#user_input").value = "";
                        wholearticle = return_text1.article;
                        AlreadyCorrect = return_text1.alreadyCorrect;
                        error_remain -= 1;
                        console.log(return_text1.correct + " Score:" + return_text1.score); //可查看增加了多少分
                        score_animation += 1;
                        document.getElementById("score_animation_number").innerText = "+" + return_text1.scoreChange;
                        document.getElementById("score_animation_thumb").style.backgroundImage = "url(./images/thumb.png)";
                        document.getElementById("score_animation_container").style.display = "block";
                        // set animation time when score changed
                        setTimeout(function () {
                            document.getElementById("score_animation_container").style.display = "none";
                        }, 3500);

                    // if user input wrong anser
                    } else if (return_text1.correct === "No, minus score") { //回答错误 减分
                        console.log(return_text1.correct + " Score:" + return_text1.score);
                        score_animation -= 1;
                        document.getElementById("score_animation_number").innerText = return_text1.scoreChange;
                        document.getElementById("score_animation_thumb").style.backgroundImage = "url(./images/wrong.png)";
                        document.getElementById("score_animation_container").style.display = "block";
                        setTimeout(function () {
                            document.getElementById("score_animation_container").style.display = "none";
                        }, 3500);
                    } else {
                        // console.log(return_text1.correct) //tryagain, No plus or minus score， Already Input, No plus or minus score，  No, No plus or minus score
                        score_animation = 0;
                    }
                } else {
                    document.querySelector('#text').innerHTML = wholearticle;
                    document.getElementById("score_animation_container").style.display = "none";

                }
                // put current score,total errors, remaining errors into box
                document.getElementById("current_score_div").innerHTML = return_text1.score;
                document.getElementById("total_error_div").innerHTML = total_errors;
                document.getElementById("remain_error_div").innerHTML = error_remain;
                // if user find all wrong words, display a completion picture
                if (error_remain == 0) {
                    document.getElementById("text").style.display = "none";
                    document.getElementById("firework").style.display = "block";
                    document.getElementById("btn1").style.display = "none";
                    pause_time();
                    document.getElementById("think").style.display = "none";
                    document.getElementById("play_bottom").style.display = "none";
                }
            })

        })

    } else {
        if (hint === 1) {
            // if user click hint button
            const ArticleProcess = fetch("https://api.dxh000130.top/api/ArticleProcess", {
                method: "POST",
                credentials: 'include',
                headers: headers2,
                body: JSON.stringify({
                    "ArticleID": articleid,
                    "Article": wholearticle,
                    "Input": "Hint",
                    "AlreadyCorrect": AlreadyCorrect,
                    "Enter": Enterbutton,
                    "hint": hint,
                })
            });
            ArticleProcess.then(res => {
                res.json().then(function (return_text1) {
                    console.log(return_text1.hint); //Hint
                    document.querySelector('#text').innerHTML = return_text1.articleDisp; // highlight hint word
                    document.getElementById("score_animation_number").innerText = return_text1.scoreChange;
                    document.getElementById("score_animation_thumb").style.backgroundImage = "url(./images/hint.png)";
                    document.getElementById("score_animation_container").style.display = "block";
                    setTimeout(function () {
                        document.getElementById("score_animation_container").style.display = "none";
                    }, 3500);
                })
            })
        }
        document.querySelector('#text').innerHTML = wholearticle;
    }

}

// When the user enters a word in the input box of the game interface, press enter to determine whether it is correct
document.getElementById('user_input').addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        //console.log("回车");
        Enterbutton = 1;
        ArticleProcessMainFunction(Enterbutton);
        document.getElementById("prompt_box").style.display = "none";

    } else {
        Enterbutton = 0;
        ArticleProcessMainFunction(Enterbutton, 0);
        //console.log("没回车");
    }
});


// dictionaries
function define_dictionaries() {
    const get_input = document.getElementById("dictionaries_input").value;
    const get_meaning = fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + get_input, {
        method: "GET",
        headers: {
            "Accept": "text/plain",
        },
    });
    get_meaning.then(res => res.text()).then(data => {
        // if user input a wrong words
        if (data.indexOf('meanings') == -1) {
            document.getElementById("definition").innerHTML = "Sorry, we couldn't find definitions for the word you were looking for. Please enter again !";
        } else {
            // get meaning from this API
            var first = data.split('meanings')[1];
            // console.log(first);
            var definition_index = first.split("definition")[2];
            var definition_index1 = definition_index.split('definition":"')[0];
            var definition_index2 = definition_index1.split(',"synonyms"')[0];
            var definition_index3 = definition_index2.substr(3,);
            var definition_final = definition_index3.replace('"', "");
            console.log(definition_final);
            // document.getElementById("definition").innerText = definition_final;
            document.getElementById("definition").innerHTML = definition_final;
        }
    });
}


function display_defintion() {
    if (document.getElementById("dictionaries_input").value.length == 0) {
        document.getElementById("definition").innerHTML = "<h3>Definition</h3>";
    }
}

// audio the words
function audio_dictionaries() {
    const get_input = document.getElementById("dictionaries_input").value;
    var audio = document.getElementById("voice");
    const get_voice = fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + get_input, {
        method: "GET",
        headers: {
            "Accept": "text/plain",
        },
    });
    get_voice.then(res => res.text()).then(data => {
        // if input words is wrong
        if (data.indexOf('.mp3') == -1) {
            audio.src = "http://dict.youdao.com/dictvoice?type=0&audio=" + get_input;
            audio.play();
            audio;
        } else {
            var voice_first = data.indexOf('.mp3","sourceUrl"');
            var voice_first1 = data.indexOf('"audio":"https:');
            var voice_1 = data.substr(voice_first1, voice_first);
            var voice_2 = voice_1.split("sourceUrl")[0];
            var voice_3 = voice_2.split('"audio":"')[1];
            var voice_4 = voice_3.split('","')[0];

            // if this word have uk pronunciation
            if (voice_4 == 'https://api.dictionaryapi.dev/media/pronunciations/en/' + get_input + '-uk.mp3') {
                console.log('不一样');
                audio.src = 'https://api.dictionaryapi.dev/media/pronunciations/en/' + get_input + '-uk.mp3';
                console.log(audio.src);
                audio.play();
                audio;
                // if this word have us pronunciation
            } else if (voice_4 == 'https://api.dictionaryapi.dev/media/pronunciations/en/' + get_input + '-us.mp3') {
                console.log('一样');
                audio.src = 'https://api.dictionaryapi.dev/media/pronunciations/en/' + get_input + '-us.mp3';
                console.log(audio.src);
                audio.play();
                audio;

                // if this word not found in first API,then use this API
            } else {
                audio.src = "http://dict.youdao.com/dictvoice?type=0&audio=" + get_input;
                audio.play();
                audio;
            }
        }
    });
}


// time in game main interface
var i = 0;

function doubleLing(i) {
    if (i < 10) {
        return "0" + i
    } else {
        return i
    }
}
function startBtn() {
    timer1 = setInterval(function () {
        i++
        document.getElementById("second").innerHTML = doubleLing(parseInt(i / 100) % 60);
        document.getElementById("minute").innerHTML = doubleLing(parseInt(i / 6000) % 60);
    }, 10)
}
function pasueBtn() {
    clearInterval(timer1);
}

// in order to refresh timer when click back home button
function time_reset() {
    clearInterval(timer1);
    i = 0;
    isRunning = false;
    document.getElementById("btn1").innerHTML = "Start";
    document.getElementById("second").innerHTML = "00";
    document.getElementById("minute").innerHTML = "00";
}
// pause timer and let timer again
function pause_time() {
    if (!isRunning) {
        document.getElementById("btn1").innerHTML = "Pause";
        isRunning = true;
        startBtn();
        document.getElementById("text").style.display = "block";
        document.getElementById("think").style.display = "none";
        document.getElementById("play_bottom").style.display = "block";

        // make animation start
        document.querySelector(".hand_span1").style.animationPlayState = "running";
        document.querySelector(".hand_span2").style.animationPlayState = "running";
        document.querySelector(".hand_span3").style.animationPlayState = "running";
        document.querySelector(".hand_span4").style.animationPlayState = "running";
        document.querySelector(".hand_span5").style.animationPlayState = "running";
        document.querySelector(".hand_span6").style.animationPlayState = "running";
    } else {
        document.getElementById("btn1").innerHTML = "Start";
        isRunning = false;
        pasueBtn();
        document.getElementById("text").style.display = "none";
        document.getElementById("think").style.display = "block";
        document.getElementById("play_bottom").style.display = "none";
        // make animation pause
        document.querySelector(".hand_span1").style.animationPlayState = "paused";
        document.querySelector(".hand_span2").style.animationPlayState = "paused";
        document.querySelector(".hand_span3").style.animationPlayState = "paused";
        document.querySelector(".hand_span4").style.animationPlayState = "paused";
        document.querySelector(".hand_span5").style.animationPlayState = "paused";
        document.querySelector(".hand_span6").style.animationPlayState = "paused";
    }
}
function start_timer() {
    if (!isRunning) {
        document.getElementById("btn1").innerHTML = "Pause";
        isRunning = true;
        startBtn();
    } else {
        document.getElementById("btn1").innerHTML = "Start";
        isRunning = false;
        pasueBtn();
    }
}


// could change user information in user detail interface
function edit_profile() {
    let head = new Headers();
    // make sure user is log in
    head.append('Authorization', 'Basic ' + btoa(localStorage.user_id + ":" + localStorage.pass));
    head.append('Content-Type', 'application/json');
    head.append('Accept', 'text/plain');
    const edit_profile = fetch('https://api.dxh000130.top/api/UpdateUserDetail', {
        credentials: 'include',
        method: "POST",
        headers: head,
        body: JSON.stringify({
            "UserName": localStorage.user_id,
            "Name": document.getElementById("name").value,
            "DataofBirth": document.getElementById("DOB").value,
            "Gerder": document.getElementById("gender").value
        }),
    });
    edit_profile.then(res => {
        console.log(res.status)
        if (res.status == 200) {
            if (document.getElementById("change_pass").value != "") {
                change_password();
            } else {
                document.getElementById('error_box').style.display="block";
                // prompt box
                document.getElementById('error_text').innerHTML="Successfully Changed";
                setTimeout(function(){
                    document.getElementById("user_modal").style.display = "none";
                    document.getElementById("error_box").style.display = "none";
                },2000)
            }
            // document.getElementById('error_box').style.display="block";
            // document.getElementById('error_text').innerHTML="Successfully changed";
            document.getElementById("change_pass").value = "";

        } else {
            // alert("Failed");
            document.getElementById('error_box').style.display="block";
            document.getElementById('error_text').innerHTML="Failed";
        }
    });

}

// in order to let user chgange password in user details
function change_password() {
    let head = new Headers();
    head.append('Authorization', 'Basic ' + btoa(localStorage.user_id + ":" + localStorage.pass));
    head.append('Content-Type', 'application/json');
    head.append('Accept', 'text/plain');
    const change_password = fetch('https://api.dxh000130.top/api/ChangePassword', {
        credentials: 'include',
        method: "POST",
        headers: head,
        body: JSON.stringify({
            "UserName": localStorage.user_id,
            "Password": document.getElementById("change_pass").value
        }),
    });
    change_password.then(res => {
        console.log(res.status)
        if (res.status == 200) {
            document.getElementById('error_box').style.display="block";
            document.getElementById('error_text').innerHTML="Successfully Changed and Log In again";
            valid_log=false;
            // auth2.signOut();
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut();
            localStorage.user_id = "";
            localStorage.pass = "";
            document.getElementById("log_in_button_container").style.display = "block";
            document.getElementById("log_out_button_container").style.display = "none";
            setTimeout(function(){
                document.getElementById("user_modal").style.display = "none";
                document.getElementById("error_box").style.display = "none";
            },2000)
        } else {
            document.getElementById('error_box').style.display="block";
            document.getElementById('error_text').innerHTML="Change Failed";
        }
    });
}

// get user  information and display these into user interface
function get_profile() {
    let head = new Headers();
    head.append('Authorization', 'Basic ' + btoa(localStorage.user_id + ":" + localStorage.pass));
    head.append('Content-Type', 'application/json');
    head.append('Accept', 'text/plain');
    const get_profile = fetch('https://api.dxh000130.top/api/GetUserDetail/' + localStorage.user_id, {
        credentials: 'include',
        method: "GET",
        headers: head,
    })
        .then(r => {
            r.json().then(function (data) {
                {
                    if (data.username == localStorage.user_id) {
                        document.getElementById("username").value = data.username;
                        document.getElementById("name").value = data.name;
                        document.getElementById("DOB").value = data.dataofbirth;
                        if(data.gerder!=null){
                            document.getElementById("gender").value = data.gerder;
                        }
                    }
                }
            })
        })
}

// click user button and then display some interface and close some interface
function display_user() {
    if (valid_log == false) {
        document.getElementById("first_page").style.display = "block";
        document.getElementById("login_modal").style.display = "block";
        // document.getElementById("difficult_page").style.display = "none";
        document.getElementById("play_homepage").style.display = "none";
        document.getElementById("error_box").style.display = "block";
        document.getElementById("error_text").innerHTML = "Please log in first";
        document.getElementById('register_modal').style.display = 'none';
        document.getElementById('leaderboard_page').style.display = 'none';
        document.getElementById('introduction_model').style.display = 'none';
        document.getElementById('user_modal').style.display = 'none';
    } else {
        get_profile();
        document.getElementById("user_modal").style.display = "block";
        document.getElementById("username").innerHTML = localStorage.user_id;
        document.getElementById('introduction_model').style.display = 'none';
        document.getElementById('login_modal').style.display = 'none';
        document.getElementById('register_modal').style.display = 'none';
        document.getElementById('error_box').style.display = 'none';
        document.getElementById('leaderboard_page').style.display = 'none';
    }
}
