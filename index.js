function func() {
    var reg = document.getElementById('register');
    var log = document.getElementById('login');
    var getSelectedValue = document.querySelector('input[name="input_data"]:checked').value;

    if (getSelectedValue == "register") {
        reg.style.display = "block";
        log.style.display = "none";
    }
    else {
        log.style.display = "block";
        reg.style.display = "none";
    }
}

function getData() {
    let email = document.getElementById('email').value;
    let username = document.getElementById('uname').value;
    let pwd = document.getElementById('pwd').value;
    let fname = document.getElementById('fname').value;
    let lname = document.getElementById('lname').value;
    let gen = document.getElementById('gen').value;
    let roles = document.querySelector('input[type=radio][name=role]:checked').value;
    let role;
    if (roles == 'admin') {
        role = document.getElementById('admin').value;
    }
    else if (roles == 'operations') {
        role = document.getElementById('oper').value;

    }
    else if (roles == 'sales') {
        role = document.getElementById('sales').value;

    }


    else {
        let user_record = new Array();
        user_record = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : [];

        if (user_record.some((v) => { return v.email == email })) {
            alert("same record");
        }
        else {
            user_record.push({
                "email": email,
                "username": username,
                "password": pwd,
                "first-name": fname,
                "last-name": lname,
                "gender": gen,
                "role": role
            })

            localStorage.setItem("users", JSON.stringify(user_record));


            document.getElementById('email').value = "";
            document.getElementById('uname').value = "";
            document.getElementById('pwd').value = "";
            document.getElementById('fname').value = "";
            document.getElementById('lname').value = "";
            document.getElementById('gen').value = "";
            document.getElementById(roles).checked = false;
        }
    }
}


function checkData() {
    if (document.getElementById('email_chk').readOnly == true) {
        document.getElementById('button').disabled = true;
        document.getElementById('error').innerHTML = "please logout";
        document.getElementById('error').style.color = "red";
        document.getElementById('error').style.float = "right";
        document.getElementById('error').style.marginRight = "20px";

    }
    else {
        let arr = [];
        let email = document.getElementById('email_chk').value;
        let pwd = document.getElementById('pwd_chk').value;
        let user_record = new Array();
        user_record = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : [];
        if (user_record.some((v) => { return v.email == email && v.password == pwd })) {
            document.getElementById('user1').style.display = "block";
            let curr_user = user_record.filter((v) => { return v.email == email && v.password == pwd })[0];
            let curr_role = curr_user.role;
            arr = user_record.filter((v) => { return v.role == curr_role });
            for (var i = 0; i < arr.length; i++) {

                document.getElementById('user_role').innerHTML = "Showing users with role: " + curr_role;


                let box = document.getElementById('box');
                let li = document.createElement('li');
                li.style.color = "white";
                li.style.fontSize = "25px";
                li.style.marginBottom = "10px";
                li.textContent = arr[i]['username'];

                let pos = box.firstElementChild;
                if (pos == null)
                    box.appendChild(li);
                else
                    box.insertBefore(li, pos);
            }

        }
        else {
            alert("please enter proper credentials");
        }
        document.getElementById('email_chk').readOnly = true;
        document.getElementById('pwd_chk').readOnly = true;

    }
}


function validateForm() {
    let email = document.forms["myForm"]["email"].value;
    let username = document.forms["myForm"]['uname'].value;
    let pwd = document.forms["myForm"]['pwd'].value;
    let fname = document.forms["myForm"]['fname'].value;
    let lname = document.forms["myForm"]['lname'].value;
    let gen = document.forms["myForm"]['gen'].value;
    let roles = document.forms["myForm"]['role'].value;
    if (email == "") {
        alert("Email must be filled out");
        return false;
    }
    else if (username == "") {
        alert("username must be filled out");
        return false;
    }
    else if (pwd == "") {
        alert("password must be filled out");
        return false;
    }
    else if (fname == "") {
        alert("first name must be filled out");
        return false;
    }
    else if (lname == "") {
        alert("last name must be filled out");
        return false;
    }
    else if (gen == "") {
        alert("gender must be filled out");
        return false;
    }
    else if (roles == "") {
        alert("role must be chosen");
        return false;
    }
    return true;
}


function readonly_val() {

    if (document.getElementById('email_chk').readOnly == true) {
        document.getElementById('error').innerHTML = "please logout";
        document.getElementById('error').style.color = "red";
        document.getElementById('error').style.float = "right";
        document.getElementById('error').style.marginRight = "20px";


    }
}

function logout() {
    document.getElementById('email_chk').value = "";
    document.getElementById('pwd_chk').value = "";
    document.getElementById('user1').style.display = "none";
    document.getElementById('email_chk').readOnly = false;
    document.getElementById('pwd_chk').readOnly = false;
    document.getElementById('error').innerHTML = "";
    document.getElementById('button').disabled = false;
} 
