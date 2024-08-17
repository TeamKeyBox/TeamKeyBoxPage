
function ShowDialog() {
    document.getElementById("dialog").className = "dialog";
}

function CloseDialog() {
    document.getElementById("dialog").className = "dialog hidden";
}

function ShowLoginDialog() {
    ShowDialog();
    document.getElementById("dialog_login").className = "";
}

function TryLogin() {
    var user = document.login.user.value;
    var token = document.login.token.value;
    
    document.login.user.setAttribute("disabled", "disabled");
    document.login.token.setAttribute("disabled", "disabled");
    document.login.loginbutton.setAttribute("disabled", "disabled");
    
    GJAPI.UserLoginManual(user, token, function(pResponse)
    {
        if(pResponse.success === "true") {
            console.info("Login successful");
            CloseDialog();
        }
        CheckLoggedIn();
    });
}

var currentuser;

function CheckLoggedIn() {
    if (GJAPI.bLoggedIn) {
        GJAPI.UserFetchCurrent((pResponse) => {
            console.log(pResponse);
            if(!pResponse.users) return;
            //console.info(pResponse.users[0].username + " - " + pResponse.users[0].developer_description);
            currentuser = pResponse.users[0];
            document.getElementById("user_menubutton").innerHTML = currentuser.username;
        });
        document.getElementById("user_loginbutton").style = "display: none;";
        document.getElementById("user_menubutton").style = "display: block;";
    }else{
        document.getElementById("user_loginbutton").style = "display: block;";
        document.getElementById("user_menubutton").style = "display: none;";
    }
}

window.onload = () => {
    CheckLoggedIn();
}