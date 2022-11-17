package dev.amorozzz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import dev.amorozzz.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByUsername(String username);
}
