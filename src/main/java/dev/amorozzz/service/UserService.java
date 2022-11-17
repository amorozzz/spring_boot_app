package dev.amorozzz.service;

import dev.amorozzz.model.Role;
import dev.amorozzz.model.User;

import java.util.List;

public interface UserService {
    void add(User user);
    List<User> listUsers();
    User getUser(int id);
    void updateUser(User user);
    void deleteUser(int id);
    User getUserByUsername(String username);
    List<Role> listRoles();
}
