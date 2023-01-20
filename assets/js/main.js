let contacts = [];

getALLContacts();
function getALLContacts() {
    fetch('/contacts', {method: 'GET'})
    .then(res => res.json())
    .then(data => {
        contacts = data;
        let allContacts = '';
        let contactsCounter = 1;
        data.forEach(e => {
            allContacts += `
            <div class="book-item">
            <span>${contactsCounter++}</span>
            <span>${e.name}</span>
            <span>${e.phone}</span>
            <span class="update-btn" onclick="updateContactValues('${e._id}')">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                    <path d="M16 5l3 3"></path>
                </svg>
            </span>
            <span class="del-btn" onclick="delContact('${e._id}')">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <line x1="4" y1="7" x2="20" y2="7"></line>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                </svg>
            </span>
        </div>
            `
        })
        document.querySelector('.books-content').innerHTML = allContacts;
    })
}

function addContact() {
    let addNewContact = {};
    addNewContact.name=document.getElementById("contact-name").value;
    addNewContact.phone=document.getElementById("contact-phone").value;
    fetch('/contacts', {
        method:"POST",
        headers:{'content-type':"application/json"},
        body:JSON.stringify(addNewContact)
    }).then(getALLContacts());
    document.getElementById("contact-name").value = '';
    document.getElementById("contact-phone").value = '';

}

function searchContact(search) {
    fetch('/contacts/'+search, {method: 'Get'})
    .then(res => res.json())
    .then(data => {
        let allContacts = '';
        let contactsCounter = 1;
        data.forEach(e => {
            allContacts += `
            <div class="book-item">
            <span>${contactsCounter++}</span>
            <span>${e.name}</span>
            <span>${e.phone}</span>
            <span class="update-btn" onclick="updateContactValues('${e._id}')">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                    <path d="M16 5l3 3"></path>
                </svg>
            </span>
            <span class="del-btn" onclick="delContact('${e._id}')">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <line x1="4" y1="7" x2="20" y2="7"></line>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                </svg>
            </span>
        </div>
            `
        })
        document.querySelector('.books-content').innerHTML = allContacts;
    });
}

function delContact(id) {
    fetch('/contacts/'+id, {method: 'DELETE'})
    .then(getALLContacts());
}

function updateContact() {
    let updatedContact = {};
    updatedContact._id=document.getElementById("contact-update-id").value;
    updatedContact.name=document.getElementById("contact-update-name").value;
    updatedContact.phone=document.getElementById("contact-update-phone").value;
    fetch('/contacts', {
        method: 'Put',
        headers:{'content-type':"application/json"},
        body:JSON.stringify(updatedContact)
    })
    .then(getALLContacts());
    document.getElementById("contact-update-name").value ='';
    document.getElementById("contact-update-phone").value ='';
}

function updateContactValues(id) {
    let contact = contacts.find(p => p._id == id);
    document.getElementById('contact-update-id').value = id;
    document.getElementById('contact-update-name').value = contact.name;
    document.getElementById('contact-update-phone').value = contact.phone;
    document.querySelector('.add-book-sec').scrollIntoView({
        behavior: 'smooth'
    })
}