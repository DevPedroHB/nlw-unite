package dev.pedrohb.passinjava.domain.checkin.exceptions;

public class CheckInAlreadyExistsException extends RuntimeException {
  public CheckInAlreadyExistsException(String message) {
    super(message);
  }
}