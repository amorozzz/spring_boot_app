package dev.amorozzz.service;

import dev.amorozzz.model.Role;
import dev.amorozzz.model.User;
import dev.amorozzz.repository.RoleRepository;
import dev.amorozzz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImp implements UserService{
   private final UserRepository userRepository;
   private final RoleRepository roleRepository;

   @Autowired
   public UserServiceImp(UserRepository userRepository, RoleRepository roleRepository) {
      this.userRepository = userRepository;
      this.roleRepository = roleRepository;
   }

   @Transactional
   @Override
   public void add(User user) {
      user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
      userRepository.save(user);
   }

   @Transactional(readOnly = true)
   @Override
   public List<User> listUsers() {
      return userRepository.findAll();
   }

   @Transactional(readOnly = true)
   @Override
   public User getUser(int id) {
      return userRepository.getReferenceById(id);
   }

   @Transactional
   @Override
   public void updateUser(User user) {
      User userFromDb = userRepository.getReferenceById(user.getId());
      userFromDb.setFirstName(user.getFirstName());
      userFromDb.setLastName(user.getLastName());
      userFromDb.setAge(user.getAge());
      userFromDb.setUsername(user.getUsername());
      if (user.getPassword().length() != 0) {
         userFromDb.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
      }
      userFromDb.setRoleList(user.getRoleList());
      userRepository.save(userFromDb);
   }

   @Transactional
   @Override
   public void deleteUser(int id) {
      userRepository.deleteById(id);
   }

   @Transactional(readOnly = true)
   @Override
   public User getUserByUsername(String username) {
      Optional<User> user = userRepository.findByUsername(username);
      return user.get();
   }
   @Transactional(readOnly = true)
   @Override
   public List<Role> listRoles() {
      return roleRepository.findAll();
   }
}
