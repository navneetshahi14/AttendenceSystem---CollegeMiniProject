const navbar = document.getElementById('navbar')
const dashboard = document.getElementById('dashboard')
const img = document.getElementById('img')
const bars = document.getElementById('bars')
const d = document.getElementById('details')
const logout = document.getElementById('logout')
const button = document.getElementById('button')
const logoutdiv = document.getElementById('logoutdiv')
const Attendence = document.getElementById('Attendence')
const Notes = document.getElementById('notes')
const marker = document.getElementById('marker')
const sticky = document.getElementById('sticky')
const markerIcon = document.getElementById('markerIcon')
const stickyIcon = document.getElementById('stickyIcon')




bars.addEventListener('click',()=>{
    if(dashboard.style.width === '80%'){
        dashboard.style.width = '95%'
        navbar.style.width = '5%'    
        bars.style.left = '75px'
        img.style.height = '45px'
        img.style.width = '45px'
        
        d.style.display = 'none'
        img.style.top = '-43%'
        logout.style.display = 'none'
        navbar.classList.add('borderradius')
        button.style.padding = '5px 10px'
        logoutdiv.style.top = '40%'
        Attendence.style.display = 'none'
        Notes.style.display = 'none'
        marker.style.padding = '5px 10px'
        sticky.style.padding = '5px 10px'
    }else{
        dashboard.style.width = '80%'
        navbar.style.width = '20%'
        bars.style.left = '280px'
        img.style.height = '80px'
        img.style.width = '80px'

        d.style.display = 'flex'
        logout.style.display = 'inline'
        img.style.top = '-35%'
        navbar.classList.remove('borderradius')
        button.style.padding = '10px 20px'
        logoutdiv.style.top = '30%'
        Attendence.style.display = 'inline'
        Notes.style.display = 'inline'
        marker.style.padding = '5px 30px'
        sticky.style.padding = '5px 30px'
        
    }
    
    
})


const notesmodalcross = document.getElementById('notesmodalcross')
const notesUploadModal = document.getElementById('notesUploadModal')
const notesmodal = document.getElementById('notesmodal')

notesmodalcross.addEventListener('click',()=>{
    notesUploadModal.classList.add('hidden')
})

notesmodal.addEventListener('click',()=>{
    notesUploadModal.classList.remove('hidden')
})


const openPdf = document.getElementById('openPdf')
const notesmodalcrosses = document.getElementById('notesmodalcrosses')
const pdfupload = document.getElementById('pdfupload')

openPdf.addEventListener('click',()=>{
    pdfupload.classList.remove('hidden')
})

notesmodalcrosses.addEventListener('click',()=>{
    pdfupload.classList.add('hidden')
})


const EditopenBy= (e)=>{
    try{
        const b = document.getElementById(e)
        b.classList.remove('hidden')
    }catch(err){
        console.log(err)
    }
}
const EditcloseBy= (e)=>{
    try{
        const x = document.getElementById(e)
        x.classList.add('hidden')
    }catch(err){
        console.log(err)
    }
}