package dev.pedrohb.passinjava.controllers;

import dev.pedrohb.passinjava.dto.attendee.AttendeesListResponseDTO;
import dev.pedrohb.passinjava.dto.event.EventIdDTO;
import dev.pedrohb.passinjava.dto.event.EventRequestDTO;
import dev.pedrohb.passinjava.dto.event.EventResponseDTO;
import dev.pedrohb.passinjava.services.AttendeeService;
import dev.pedrohb.passinjava.services.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventController {
  private final EventService eventService;
  private final AttendeeService attendeeService;

  @GetMapping("/{id}")
  public ResponseEntity<EventResponseDTO> getEvent(@PathVariable String id){
    EventResponseDTO event = this.eventService.getEventDetail(id);

    return ResponseEntity.ok(event);
  }

  @PostMapping
  public ResponseEntity<EventIdDTO> createEvent(@RequestBody EventRequestDTO body, UriComponentsBuilder uriComponentsBuilder) {
    EventIdDTO eventIdDTO = this.eventService.createEvent(body);

    var uri = uriComponentsBuilder.path("/events/{id}").buildAndExpand(eventIdDTO.eventId()).toUri();

    return ResponseEntity.created(uri).body(eventIdDTO);
  }

  @GetMapping("/attendees/{id}")
  public ResponseEntity<AttendeesListResponseDTO> getEventAttendees(@PathVariable String id){
    AttendeesListResponseDTO attendeesListResponse = this.attendeeService.getEventsAttendee(id);

    return ResponseEntity.ok(attendeesListResponse);
  }
}
