package dev.pedrohb.passinjava.repositories;

import dev.pedrohb.passinjava.domain.checkin.CheckIn;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CheckInRepository extends JpaRepository<CheckIn, Integer> {
}
