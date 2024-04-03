package dev.pedrohb.passinjava.domain.checkin;

import dev.pedrohb.passinjava.domain.attendee.Attendee;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "check_ins")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CheckIn {
  @Id
  @Column(nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  @Column(nullable = false, name = "created_at")
  private LocalDateTime createdAt;
  @OneToOne
  @JoinColumn(name = "attendee_id", nullable = false)
  private Attendee attendee;
}
