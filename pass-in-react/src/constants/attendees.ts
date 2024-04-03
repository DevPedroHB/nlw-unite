import { faker } from "../lib/faker";

const length = faker.number.int({ min: 100, max: 200 });

export const attendees = Array.from({ length }).map(() => {
  const name = faker.person.fullName();
  const checkedInAt = faker.date.recent({ days: 7 });

  return {
    id: faker.number.int({ min: 10000, max: 20000 }),
    name,
    email: faker.internet.email({
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1],
    }),
    createdAt: faker.date.recent({ refDate: checkedInAt }),
    checkedInAt,
  };
});
