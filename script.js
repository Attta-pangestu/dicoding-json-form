const arrayUser = [];
const USER_KEY = 'LOCAL_USER_DATA';
const RENDER_DATA = 'render-data';



// Event Ketika Website Load 

document.addEventListener('DOMContentLoaded', function() {

  // Periksa apakah browser mendukung local storage
  if (isStorageAvail) {
    const dataLocals = JSON.parse(localStorage.getItem(USER_KEY));
     // Jika terdapat data di local maka data di load ke array dan dirender
  if ( dataLocals !== null) {
    for (let dataLocal of dataLocals) {
      // Load data dari local ke array
      arrayUser.push(dataLocal);
    }
    // render data yang sudah ada
     document.dispatchEvent(new Event(RENDER_DATA));
  }
    
  }

 
 
  // Event Ketika Tombol submit diklik
  const submitForm = document.getElementById('form-data-user');

  submitForm.addEventListener('submit', function(event) {
    event.preventDefault();
    saveData();
    document.dispatchEvent(new Event(RENDER_DATA));
  });

});

document.addEventListener(RENDER_DATA, function() {
  const userTbody = document.getElementById('user-list-detail') ; 
  // Clearing inner html
  userTbody.innerHTML = '' ; 
  
  let dataUsers = arrayUser;

  // Membuat element tabel 
  for (let dataUser of dataUsers) {
    const userRow = document.createElement('tr') ; 
    const {nama, umur, domisili} = dataUser ; 
      
    userRow.innerHTML = `<td> ${nama} </td>` ; 
    userRow.innerHTML += `<td> ${umur} </td>` ;
    userRow.innerHTML += `<td> ${domisili} </td>` ;

    userTbody.append(userRow) ; 
  } 

  

  
  
});

function saveData() {
  // Mendapatkan nilai dari form
  const nama = document.getElementById('nama').value;
  const umur = document.getElementById('umur').value;
  const domisili = document.getElementById('domisili').value;

  // Membuat object user
  const objectUser = makeObjectUser(nama, umur, domisili);


  // Menyimpan data user di list array user
  arrayUser.unshift(objectUser);


  // Menyimpan data user di local storage
  saveLocal();
}


function saveLocal() {
  if (isStorageAvail()) {
    const stringed = JSON.stringify(arrayUser);
    localStorage.setItem(USER_KEY, stringed);

  }
}

function isStorageAvail() {
  if (typeof (Storage) === undefined) {
    return false;
    alert('Browser tidak mendukung local storage') ; 
  }
  return true;
}

function makeObjectUser(nama, umur, domisili) {
  return {
    nama,
    umur,
    domisili
  };
}
