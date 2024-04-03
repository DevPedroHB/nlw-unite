package dev.pedrohb.passinjava.dto.event;

public record EventRequestDTO(
  String title,
  String details,
  Integer maximumAttendees
) {}
