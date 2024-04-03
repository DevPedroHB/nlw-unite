let participants = [
  {
    name: "Diego Fernandes",
    email: "diego@gmail.com",
    registrationDate: new Date(2024, 2, 1, 19, 23),
    checkInDate: new Date(2024, 2, 1, 20, 20),
  },
  {
    name: "Mayk Brito",
    email: "mayk@gmail.com",
    registrationDate: new Date(2024, 2, 23, 19, 23),
    checkInDate: new Date(2024, 2, 25, 20, 20),
  },
  {
    name: "Ana Souza",
    email: "ana@gmail.com",
    registrationDate: new Date(2024, 0, 3, 19, 23),
    checkInDate: new Date(2024, 0, 4, 20, 20),
  },
  {
    name: "João Silva",
    email: "joao@gmail.com",
    registrationDate: new Date(2023, 11, 4, 19, 23),
    checkInDate: new Date(2023, 11, 5, 20, 20),
  },
  {
    name: "Maria Oliveira",
    email: "maria@gmail.com",
    registrationDate: new Date(2023, 10, 5, 19, 23),
    checkInDate: new Date(2023, 10, 6, 20, 20),
  },
  {
    name: "Pedro Santos",
    email: "pedro@gmail.com",
    registrationDate: new Date(2023, 9, 6, 19, 23),
    checkInDate: new Date(2023, 9, 7, 20, 20),
  },
  {
    name: "Carla Lima",
    email: "carla@gmail.com",
    registrationDate: new Date(2023, 8, 7, 19, 23),
    checkInDate: new Date(2023, 8, 8, 20, 20),
  },
  {
    name: "Lucas Sousa",
    email: "lucas@gmail.com",
    registrationDate: new Date(2023, 7, 8, 19, 23),
    checkInDate: new Date(2023, 7, 9, 20, 20),
  },
  {
    name: "Paula Costa",
    email: "paula@gmail.com",
    registrationDate: new Date(2023, 6, 9, 19, 23),
    checkInDate: new Date(2023, 6, 10, 20, 20),
  },
  {
    name: "Gabriel Almeida",
    email: "gabriel@gmail.com",
    registrationDate: new Date(2023, 5, 10, 19, 23),
    checkInDate: new Date(2023, 5, 11, 20, 20),
  },
];

function createNewParticipant(participant) {
  const registrationDate = dayjs(Date.now()).to(participant.registrationDate);
  let checkInDate = dayjs(Date.now()).to(participant.checkInDate);

  if (!participant.checkInDate) {
    checkInDate = `
      <button
        data-email="${participant.email}"
        onclick="makeCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `;
  }

  return `
  <tr>
    <td>
      <strong>
        ${participant.name}
      </strong>
      <br>
      <small>
        ${participant.email}
      </small>
    </td>
    <td>${registrationDate}</td>
    <td>${checkInDate}</td>
  </tr>
  `;
}

function updateList(participants) {
  let output = "";

  for (const participant of participants) {
    output = output + createNewParticipant(participant);
  }

  document.querySelector("tbody").innerHTML = output;
}

updateList(participants);

function addParticipant(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const participant = {
    name: formData.get("name"),
    email: formData.get("email"),
    registrationDate: new Date(),
    checkInDate: null,
  };

  const participantExists = participants.find(
    (p) => p.email == participant.email
  );

  if (participantExists) {
    return alert("Email já cadastrado.");
  }

  participants = [participant, ...participants];

  updateList(participants);

  event.target.querySelector('[name="name"]').value = "";
  event.target.querySelector('[name="email"]').value = "";
}

function makeCheckIn(event) {
  const result = confirm("Tem certeza que deseja fazer o check-in?");

  if (!result) return;

  const participant = participants.find(
    (p) => p.email === event.target.dataset.email
  );

  participant.checkInDate = new Date();

  updateList(participants);
}
