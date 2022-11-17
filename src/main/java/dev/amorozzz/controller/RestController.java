package dev.amorozzz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import dev.amorozzz.model.Role;
import dev.amorozzz.model.User;
import dev.amorozzz.service.UserService;

import java.security.Principal;
import java.util.List;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api")
public class RestController {
    private final UserService userService;

    @Autowired
    public RestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<User> allUsers() {
        return userService.listUsers();
    }

    @PostMapping("/users")
    @PreAuthorize("hasAuthority('ADMIN')")
    public User addUser(@RequestBody User user) {
        userService.add(user);
        return user;
    }

    @GetMapping("/roles")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<Role> allRoles() {
        return userService.listRoles();
    }

    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public String deleteUser(@PathVariable("id") int id) {
        userService.deleteUser(id);
        return String.format("User with id=%d was deleted.", id);
    }

    @PatchMapping("/users")
    @PreAuthorize("hasAuthority('ADMIN')")
    public User editUser(@RequestBody User user) {
        userService.updateUser(user);
        return user;
    }

    @GetMapping("/user")
    @PreAuthorize("hasAnyAuthority('USER','ADMIN')")
    public User singleUser(Principal principal) {
        return userService.getUserByUsername(principal.getName());
    }
}
