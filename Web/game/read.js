//阅读控件(字体大小，字体粗细，字体family，背景颜色，全屏缩屏)
//字体大小
if (!localStorage.zitidaxiao) {
    localStorage.zitidaxiao = "20";
    document.getElementById("content").style.fontSize = localStorage.zitidaxiao + 'px';
} else
    document.getElementById("content").style.fontSize = localStorage.zitidaxiao + 'px';

function zitibianda() {
    localStorage.zitidaxiao++;
    document.getElementById("content").style.fontSize = localStorage.zitidaxiao + 'px';
}

function zitibianxiao() {
    localStorage.zitidaxiao--;
    document.getElementById("content").style.fontSize = localStorage.zitidaxiao + 'px';
}


//字体粗细
if (localStorage.jiacu)
    document.getElementById("content").style.fontWeight = localStorage.jiacu;

function jiacu() {
    if (document.getElementById("content").style.fontWeight != "611") {
        document.getElementById("content").style.fontWeight = "611";
        localStorage.jiacu = "611";
    } else {
        document.getElementById("content").style.fontWeight = "normal";
        localStorage.jiacu = "normal";
    }
}

//字体family，字体family按键自适应
if (!localStorage.ziti) {
    localStorage.ziti = "SimSun";
    localStorage.zitiname = "SimSun";
    document.getElementById("content").style.fontFamily = localStorage.ziti;
    document.getElementById("ziti").innerHTML = localStorage.zitiname;
} else {
    document.getElementById("content").style.fontFamily = localStorage.ziti;
    document.getElementById("ziti").innerHTML = localStorage.zitiname;
}

function ziti() {
    if (localStorage.ziti == "SimSun") {
        localStorage.ziti = "SimHei";
        localStorage.zitiname = "SimHei"
    } else if (localStorage.ziti == "SimHei") {
        localStorage.zitiname = "KaiTi";
        localStorage.ziti = "KaiTi";
    } else {
        localStorage.zitiname = "SimSun";
        localStorage.ziti = "SimSun";
    }
    document.getElementById("content").style.fontFamily = localStorage.ziti;
    document.getElementById("ziti").innerHTML = localStorage.zitiname;
}
if (document.body.scrollWidth < 650) {
    document.getElementById('ziti').style.display = 'none';
}

//背景颜色
if (!localStorage.bg) {
    localStorage.bg = "#18222d";
    localStorage.content = "#adadad";
    document.body.style.backgroundColor = localStorage.bg;
    document.getElementById("content").style.color = localStorage.content;
} else {
    document.body.style.backgroundColor = localStorage.bg;
    document.getElementById("content").style.color = localStorage.content;
}

function bg() {
    if (localStorage.bg == "#ffffff")
        localStorage.bg = "#f6f1e7";
    else if (localStorage.bg == "#f6f1e7")
        localStorage.bg = "#dadada";
    else if (localStorage.bg == "#dadada")
        localStorage.bg = "#dae9da";
    else if (localStorage.bg == "#dae9da")
        localStorage.bg = "#ebcece";
    else if (localStorage.bg == "#ebcece") {
        localStorage.bg = "#18222d";
        localStorage.content = "#adadad";
        document.getElementById("content").style.color = localStorage.content;
    } else if (localStorage.bg == "#18222d") {
        localStorage.bg = "#ebddae";
        localStorage.content = "";
        document.getElementById("content").style.color = localStorage.content;
    } else if (localStorage.bg == "#ebddae")
        localStorage.bg = "#dfecf0";
    else
        localStorage.bg = "#ffffff";
    document.body.style.backgroundColor = localStorage.bg;
}


//获取文章
let ArticleChooseheader = new Headers();
ArticleChooseheader.append('Authorization', 'Basic ' + btoa("dxh000130" + ":" + "duan002349"));
ArticleChooseheader.append('Content-Type', 'application/json')
ArticleChooseheader.append('Accept', 'text/plain')
let articleid = 999;
let error_remain = 999;
let wholearticle = "";
const ArticleChoose = fetch("https://api.dxh000130.top/api/ArticleChoose", {
    method: "POST",
    credentials: 'include',
    headers: ArticleChooseheader,
    body: JSON.stringify({
        "Difficulty": "H", //需关联选择页面 需修改
        "Type": "Tech",//需关联选择页面 需修改
    })
});
ArticleChoose.then(res => {
    res.json().then(function(return_text) {
        console.log(return_text.article)
        document.querySelector('#content').innerHTML = return_text.article
        error_remain = return_text.errorRemain;
        articleid = return_text.id;
        wholearticle = return_text.article;
    })
//键盘监听
})
var AlreadyCorrect = ""
var textinput = document.getElementById("User-input-answer")
textinput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        //console.log("回车");
        Enterbutton = 1;
        ArticleProcessMainFunction(Enterbutton)
    } else {
        Enterbutton = 0;
        ArticleProcessMainFunction(Enterbutton, 0)
            //console.log("没回车");
    }
});
//Hint
function Hint() {
    document.getElementById("User-input-answer").value = "";
    ArticleProcessMainFunction(0, 1);
}//高亮 加减分 hint主程序
function ArticleProcessMainFunction(Enterbutton, hint) {
    let headers2 = new Headers();
    headers2.append('Authorization', 'Basic ' + btoa("dxh000130" + ":" + "duan002349")); //需修改
    headers2.append('Content-Type', 'application/json')
    headers2.append('Accept', 'text/plain')
    var textinput = document.getElementById("User-input-answer")
    var username = textinput.value;

    if (username !== "" && username.search(" ") === -1) { //避免用户未输入或删除已输入内容报错
        //console.log(Enterbutton)
        const ArticleProcess = fetch("https://api.dxh000130.top/api/ArticleProcess", {
            method: "POST",
            credentials: 'include',
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
            res.json().then(function(return_text1) {
                if (username !== "") {
                    //console.log(return_text1)
                    document.querySelector('#content').innerHTML = return_text1.articleDisp
                    if (return_text1.correct === "yes,add score") { //用户答题正确
                        wholearticle = return_text1.article;
                        AlreadyCorrect = return_text1.alreadyCorrect;
                        console.log(return_text1.correct + " Score:" + return_text1.score); //可查看增加了多少分
                    } else if (return_text1.correct === "No, minus score") { //回答错误 减分
                        console.log(return_text1.correct + " Score:" + return_text1.score);
                    } else{
                        console.log(return_text1.correct) //不加分不减分， 用户输入文章中的错误单词：tryagain, No plus or minus score， 用户输入已经答对的单词：Already Input, No plus or minus score， 高亮单词： No, No plus or minus score
                    }
                } else {
                    document.querySelector('#content').innerHTML = wholearticle;
                }
            })

        })
    } else {
        if (hint === 1) {
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
                res.json().then(function(return_text1) {
                    console.log(return_text1.hint); //Hint内容
                    document.querySelector('#content').innerHTML = return_text1.articleDisp; //高亮hint内容
                })
            })
        }
        document.querySelector('#content').innerHTML = wholearticle;
    }
}
//屏宽
if (!localStorage.pingkuan) {
    localStorage.pingkuan = "700px";
    document.getElementById("content").style.maxWidth = localStorage.pingkuan;
} else { document.getElementById("content").style.maxWidth = localStorage.pingkuan; }

function pingkuan() {
    if (localStorage.pingkuan == "700px")
        localStorage.pingkuan = "800px";
    else if (localStorage.pingkuan == "800px")
        localStorage.pingkuan = "900px";
    else if (localStorage.pingkuan == "900px")
        localStorage.pingkuan = "1000px";
    else if (localStorage.pingkuan == "1000px")
        localStorage.pingkuan = "1100px";
    else if (localStorage.pingkuan == "1100px")
        localStorage.pingkuan = "1200px";
    else if (localStorage.pingkuan == "1200px")
        localStorage.pingkuan = "1300px";
    else if (localStorage.pingkuan == "1300px")
        localStorage.pingkuan = "100%";
    else if (localStorage.pingkuan == "100%")
        localStorage.pingkuan = "600px";
    else if (localStorage.pingkuan == "600px")
        localStorage.pingkuan = "700px";
    document.getElementById("content").style.maxWidth = localStorage.pingkuan;
}
if (document.body.scrollWidth < 600) {
    document.getElementById('pingkuan').style.display = 'none';
}

//全屏
function ExecuteFun(a) {
    var full = a.innerHTML == '全屏';
    full ? fullscreen() : exitfullscreen();
    a.innerHTML = full ? '缩屏' : '全屏';
    return false;
}

function fullscreen() {
    var el = document.documentElement,
        rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen,
        wscript;
    if (typeof rfs != "undefined" && rfs) {
        rfs.call(el);
        return;
    }
    if (typeof window.ActiveXObject != "undefined") {
        wscript = new ActiveXObject("WScript.Shell");
        if (wscript) {
            wscript.SendKeys("{F11}");
        }
    }
}

function exitfullscreen() {
    var el = document,
        cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen,
        wscript;
    if (typeof cfs != "undefined" && cfs) {
        cfs.call(el);
        return;
    }
    if (typeof window.ActiveXObject != "undefined") {
        wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
            wscript.SendKeys("{F11}");
        }
    }
}