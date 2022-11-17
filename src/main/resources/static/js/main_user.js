// Main table of User
const userList = document.querySelector('.user-list');

const urlUser = 'http://localhost:8080/api/user';

const createRowByUser = (user => {
    // language=HTML
    userList.insertAdjacentHTML('beforeend',
    `<tr id="${user.id}">
            <td class="row-id">${user.id}</td>
            <td class="row-firstname">${user.firstName}</td>
            <td class="row-lastname">${user.lastName}</td>
            <td class="row-age">${user.age}</td>
            <td class="row-username">${user.username}</td>
            <td class="row-roles">${user.roleList.map(a => a.name).join(" ")}</td>
        </tr>`
    )
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

// Get - Read single User
// Method: GET

fetch(urlUser)
    .then(res => res.json())
    .then(user => {
        createRowByUser(user);
        $('#username-header').text(user.username);
        $('#role-user-header').text(user.roleList.map(a => a.name).join(" "));
        $('#nav-roles-page').append(renderNavigation(user.roleList));
    })