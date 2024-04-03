package dev.pedrohb.passinjava.repositories;

import dev.pedrohb.passinjava.domain.attendee.Attendee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendeeRepository extends JpaRepository<Attendee, String> {
}
