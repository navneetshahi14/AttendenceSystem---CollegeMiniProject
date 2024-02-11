const rollno = document.getElementById('rollno')
const type = document.getElementById('type')
const label = document.getElementById('label')
const label1 = document.getElementById('label1')
const label2 = document.getElementById('label2')
const label3 = document.getElementById('label3')
const label4 = document.getElementById('label4')
const section = document.getElementById('section')
const it1 = document.getElementById('it1')
const it2 = document.getElementById('it2')
const it3 = document.getElementById('it3')


type.onchange =()=>{
    if(type.value === "isTeacher"){
        rollno.type = "hidden"
        rollno.name = ""
        rollno.placeholder = ""
        section.type = "hidden"
        section.name = ""
        section.placeholder = ""
        it1.name = "it1"
        it2.name = "it2"
        it3.name = "it3"

        it1.classList.remove('hidden')
        it2.classList.remove('hidden')
        it3.classList.remove('hidden')

        label.classList.add('hidden')
        label1.classList.add('hidden')
        label2.classList.remove('hidden')
        label3.classList.remove('hidden')
        label4.classList.remove('hidden')


    }else if(type.value === "isStudent"){
        rollno.classList.remove('hidden')

        rollno.type = "number"
        rollno.name = "rollno"
        rollno.placeholder = "RollNo"
        section.type = "text"
        section.name = "section"
        section.placeholder = "Section"
        it1.name = ""
        it2.name = ""
        it3.name = ""


        it1.classList.add('hidden')
        it2.classList.add('hidden')
        it3.classList.add('hidden')

        label.classList.remove('hidden')
        label1.classList.remove('hidden')
        label2.classList.add('hidden')
        label3.classList.add('hidden')
        label4.classList.add('hidden')

    }
    else{
        rollno.classList.add('hidden')
        label.classList.add('hidden')
        label1.classList.add('hidden')
        it1.classList.add('hidden')
        it2.classList.add('hidden')
        it3.classList.add('hidden')
        label2.classList.add('hidden')
        label3.classList.add('hidden')
        label4.classList.add('hidden')
        section.classList.add('hidden')

    }
}



const cover = document.getElementById('cover')
const cross = document.getElementById('cross')
const icon = document.getElementById('icon')
const image = document.getElementById('image')
const profile = document.getElementById('profile')


profile.onchange =()=>{
    if(profile.value){
        image.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNT7FpSubaFuW3-r6Lv7mm0cW_NQETCNcZXm-yxFQIDQ&s"
    }
}

icon.addEventListener('click',()=>{
    cover.classList.remove('hidden')
})

cross.addEventListener('click',()=>{
    cover.classList.add('hidden')
})
