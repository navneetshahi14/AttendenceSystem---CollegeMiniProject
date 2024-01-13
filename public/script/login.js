const type = document.getElementById('type')
const toggle = document.getElementById('toggel')


type.onchange =()=>{
    if(type.value === "isStudent"){
        toggle.type = "number"
        toggle.name = "rollno"
        toggle.placeholder = "RollNo"
    }
    else if(type.value === "isTeacher"){
        toggle.type = "email"
        toggle.name = "email"
        toggle.placeholder = "Email"
    }
}