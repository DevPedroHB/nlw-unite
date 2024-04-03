package dev.pedrohb.passinjava.repositories;

import dev.pedrohb.passinjava.domain.event.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, String> {
}
