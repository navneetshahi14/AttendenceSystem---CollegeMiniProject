const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});




// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})




const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {

	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})


// drag and drop  classess 

let draggedRow = null;

function handleDragStart(e) {
  draggedRow = e.target;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', draggedRow.innerHTML);
}

function handleDragOver(e) {
  e.preventDefault();
  
  document.getElementById('deleteContainer').classList.add('drag-over');
}

function handleDrop(e) {
  e.preventDefault();
  document.getElementById('deleteContainer').classList.remove('drag-over');

  if (draggedRow) {
    const table = document.getElementById('myTable');
    const tbody = table.getElementsByTagName('tbody')[0];

    if(confirm("Are you sure")){
    tbody.removeChild(draggedRow);
    draggedRow = null;
  }
  }
}

function deleteRow() {
  // Handle delete logic here
  console.log('Row deleted');
}


// new creation of class

const CreateNewClass=document.getElementById('NewClass');
const HiddenDIv=document.querySelector('.hidden');

CreateNewClass.addEventListener("click",()=>{
    HiddenDIv.style.display="block";
    

})


