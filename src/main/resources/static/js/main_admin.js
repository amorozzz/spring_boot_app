// Main table of Users
const usersList = document.querySelector('.users-list');

// Form for add User
const addUserForm = document.querySelector('.add_user_form');
const firstNameInput = document.getElementById('add_firstName');
const lastNameInput = document.getElementById('add_LastName');
const ageInput = document.getElementById('add_Age');
const usernameInput = document.getElementById('add_username');
const passwordInput = document.getElementById('add_password');

let allRoles = null;

const urlUsers = 'http://localhost:8080/api/users';
const urlRoles = 'http://localhost:8080/api/roles';
const urlUser = 'http://localhost:8080/api/user';

const renderSingleUserRoles = (roles) => {
    let output;
    roles.forEach(role => {
        output += `<option value="${role.id}">${role.name}</option>`;
    })
    return output;
}

const renderAllRoles = (userRoles) => {
    let output;
    allRoles.forEach(role => {
        if (userRoles != null) {
            let found = false;
            for (let i = 0; i < userRoles.length; i++) {
                if (userRoles[i].name === role.name) {
                    found = true;
                    output += `<option value="${role.id}" selected>${role.name}</option>`;
                    break;
                }
            }

            if (!found) {
                output += `<option value="${role.id}">${role.name}</option>`;
            }
        } else {
            output += `<option value="${role.id}">${role.name}</option>`;
        }
    })
    return output;
}

const createRowByUser = (user => {
    // language=HTML
    usersList.insertAdjacentHTML('beforeend',
    `<tr id="${user.id}">
        <td class="row-id">${user.id}</td>
        <td class="row-firstname">${user.firstName}</td>
        <td class="row-lastname">${user.lastName}</td>
        <td class="row-age">${user.age}</td>
        <td class="row-username">${user.username}</td>
        <td class="row-roles">${user.roleList.map(a => a.name).join(" ")}</td>  
        <td>
            <!-- Button trigger Edit modal -->
            <button type="button" class="btn btn-primary btn-success" data-bs-toggle="modal" data-bs-target="#editModal${user.id}">
                Edit
            </button>
            <!-- Edit modal -->
            <div class="modal fade" id="editModal${user.id}" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="editModalLabel">Edit user</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                            <div class="modal-body">
                                <div class="row justify-content-center">
                                    <div class="col-6 gap-3 text-center fw-bold">
                                        <div class="row">
                                            <span>ID</span>
                                            <input type="text" class="form-control" aria-label="ID" readonly value="${user.id}">
                                        </div>
                                        <br>
                                        <div class="row">
                                            <span>First Name</span>
                                            <input type="text" class="form-control" value="${user.firstName}" id="firstName">
                                        </div>
                                        <br>
                                        <div class="row">
                                            <span>Last Name</span>
                                            <input type="text" class="form-control" value="${user.lastName}" id="lastName">
                                        </div>
                                        <br>
                                        <div class="row">
                                            <span>Age</span>
                                            <input type="number" class="form-control" value="${user.age}" id="age">
                                        </div>
                                        <br>
                                        <div class="row">
                                            <span>Username</span>
                                            <input type="text" class="form-control" value="${user.username}" id="username">
                                        </div>
                                        <br>
                                        <div class="row">
                                            <span>Password</span>
                                            <input type="password" class="form-control" id="password">
                                        </div>
                                        <br>
                                        <div class="row">
                                            <span>Role</span>
                                            <select class="role_list" multiple="multiple">` +
                                                renderAllRoles(user.roleList)
                                            + `</select>
                                        </div>
                                        <br>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer" data-id="${user.id}">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" id="edit-user" class="btn btn-primary" data-bs-dismiss="modal">Edit</button>
                            </div>
                    </div>
                </div>
            </div>
        </td>
        <td>
            <!-- Button trigger Delete modal -->
            <button type="button" class="btn btn-primary btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal${user.id}">Delete</button>
            <!-- Delete modal -->
            <div class="modal fade" id="deleteModal${user.id}" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="deleteModalLabel">Delete user</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form method="delete" action="@{/admin/${user.id}">
                            <div class="modal-body">
                                <div class="row justify-content-center">
                                    <div class="col-6 text-center fw-bold">
                                        <div class="row">
                                            <span>ID</span>
                                            <input type="text" class="form-control" value="${user.id}" readonly>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <span>First Name</span>
                                            <input type="text" class="form-control" value="${user.firstName}" readonly>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <span>Last Name</span>
                                            <input type="text" class="form-control" value="${user.lastName}" readonly>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <span>Age</span>
                                            <input type="number" class="form-control" value="${user.age}" readonly>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <span>Username</span>
                                            <input type="text" class="form-control" value="${user.username}" readonly>
                                        </div>
                                        <div class="row">
                                            <span>Role</span>
                                            <select class="role_list" multiple="multiple" aria-readonly="true" disabled>` +
                                                renderSingleUserRoles(user.roleList)
                                            + `</select>
                                        </div>
                                    </div>
                                    <br>
                                </div>
                            </div>
                            <div class="modal-footer" data-id="${user.id}">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" id="delete-user" class="btn btn-primary btn-danger" data-bs-dismiss="modal">Delete</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </td>
    </tr>
    `)
})

const renderNavigation = (roles => {
    let output = '';
    roles.forEach(role => {
        output += '<li class="nav-item">';
        if (document.URL.includes(role.name.toLowerCase())) {
            output += '<a class="nav-link active" aria-current="nav-link page" href="/' + role.name.toLowerCase()+'">' + role.name + '</a>';
        } else {
            output += '<a class="nav-link" aria-current="nav-link" href="/' + role.name.toLowerCase()+'">' + role.name + '</a>';
        }

    })
    return output;
})

// Get - Read all Roles
// Method: GET

fetch(urlRoles)
    .then(res => res.json())
    .then(data => {
        allRoles = data;
        addUserForm.querySelector('#role_select').insertAdjacentHTML('beforeend',renderAllRoles());
    })

// Get - Read all Users
// Method: GET

fetch(urlUsers)
    .then(res => res.json())
    .then(users => {
        users.forEach(user => {
            createRowByUser(user);
        })})

// Create - Add new User
// Method: POST
addUserForm.addEventListener('submit', (ev) => {
    ev.preventDefault()
    const roles = [];
    $('#role_select option:checked').each(function () {
        roles.push({
            id: $(this).attr('value'),
            name: $(this).text()
        });
    });
    fetch(urlUsers, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            age: ageInput.value,
            username: usernameInput.value,
            password: passwordInput.value,
            roleList: roles
        })
    })
        .then(res => res.json())
        .then(data => {
            createRowByUser(data);
            addUserForm.reset();
            document.getElementById("nav-home-tab").click();
        })
})

// Delete and Edit User
usersList.addEventListener('click', evt => {
    evt.preventDefault();
    let editButtonIsPressed = evt.target.id === 'edit-user';
    let deleteButtonIsPressed = evt.target.id === 'delete-user';

    // Delete - Remove User
    // method - DELETE

    if (deleteButtonIsPressed) {
        let id = evt.target.parentElement.dataset.id;

        fetch(`${urlUsers}/${id}`,{
            method: 'DELETE',
        })
            .then(res => res.text())
            .then(() => $(usersList).find('tr#' + id).remove())
    }

    // Edit - Edit User
    // method - PATCH

    if (editButtonIsPressed) {
        let id = evt.target.parentElement.dataset.id;
        let editModal = $('#editModal' + id);
        let roles = [];
        $(editModal).find('option:checked').each(function () {
            roles.push({
                id: $(this).attr('value'),
                name: $(this).text()
            });
        });

        let editRowTable = $(usersList).find('tr#' + id);

        fetch(urlUsers, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                firstName: editModal.find('input[id=firstName]').val(),
                lastName: editModal.find('input[id=lastName]').val(),
                age: editModal.find('input[id=age]').val(),
                username: editModal.find('input[id=username]').val(),
                password: editModal.find('input[id=password]').val(),
                roleList: roles
            })
        })
            .then(res => res.json())
            .then(user => {
                $(editRowTable).find('td[class=row-firstname]').text(user.firstName);
                $(editRowTable).find('td[class=row-lastname]').text(user.lastName);
                $(editRowTable).find('td[class=row-age]').text(user.age);
                $(editRowTable).find('td[class=row-username]').text(user.username);
                $(editRowTable).find('td[class=row-roles]').text(user.roleList.map(a => a.name).join(" "));
            })
    }
})

// Get - Read single User
// Method: GET

fetch(urlUser)
    .then(res => res.json())
    .then(user => {
        $('#username-header').text(user.username);
        $('#role-user-header').text(user.roleList.map(a => a.name).join(" "));
    })

// Get - Read single User
// Method: GET

fetch(urlUser)
    .then(res => res.json())
    .then(user => {
        $('#username-header').text(user.username);
        $('#role-user-header').text(user.roleList.map(a => a.name).join(" "));
        $('#nav-roles-page').append(renderNavigation(user.roleList));
    })