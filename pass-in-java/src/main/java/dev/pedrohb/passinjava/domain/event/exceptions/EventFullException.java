package dev.pedrohb.passinjava.domain.event.exceptions;

public class EventFullException extends RuntimeException {
  public EventFullException(String message) {
    super(message);
  }
}
