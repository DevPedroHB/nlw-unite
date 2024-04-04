import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { Attendee } from "../types/attendee";

interface IGetEventAttendees {
  event: string;
  page?: number;
  perPage?: number;
  search?: string;
}

interface IGetEventAttendeesResponse {
  attendees: Attendee[];
  total: number;
}

export function getEventAttendees({
  event,
  page = 1,
  perPage = 10,
  search,
}: IGetEventAttendees) {
  const query = useQuery({
    queryKey: ["attendees", event, page, perPage, search],
    queryFn: async () => {
      try {
        const response = await api.get<IGetEventAttendeesResponse>(
          `/events/${event}/attendees?page=${page}&perPage=${perPage}&query=${search}`,
        );

        return response.data;
      } catch (error) {
        console.log(error);

        throw new Error("Ocorreu um erro ao processar a requisição.");
      }
    },
  });

  return query;
}
