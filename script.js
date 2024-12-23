let selectedRow = null

function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

document.querySelector(".btn-primary").addEventListener("click", (e) => {
    clearFields()
})

document.querySelector("#student-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const status = document.querySelector("#status").value;

    if(name == "" || email == "" || status == ""){
        showAlertForm("Please fill in all fields", "danger")
    }
    else{
        if(selectedRow === null){
            const list = document.querySelector("#student-list")
            const row = document.createElement("tr")

            row.innerHTML = `
                <td>${name}</td>
                <td>${email}</td>
                <td>${status}</td>
                <td>
                <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlertForm("Person Added", "success")
            clearFields()
        }
        else{
            selectedRow.children[0].textContent = name;
            selectedRow.children[1].textContent = email;
            selectedRow.children[2].textContent = status;
            selectedRow = null
            showAlertForm("Person Info Edited", "info")
        }
        clearFields()
    }
});

document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    console.log(target)
    if(target.classList.contains("edit")){
        target.setAttribute("data-bs-toggle", "modal")
        target.setAttribute("data-bs-target", "#staticBackdrop")
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#name").value = selectedRow.children[0].textContent;
        document.querySelector("#email").value = selectedRow.children[1].textContent;
        document.querySelector("#status").value = selectedRow.children[2].textContent;   
    }
})

document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Person Data Deleted", "danger");
    }
});

function showAlertForm(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".modal-body");
    const main = document.querySelector("#student-form");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

function clearFields(){
    document.querySelector("#name").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#status").value = "";
}
