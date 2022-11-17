package dev.amorozzz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import dev.amorozzz.model.Role;

public interface RoleRepository extends JpaRepository<Role,Integer> {
}
