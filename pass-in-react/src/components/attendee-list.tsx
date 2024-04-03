import { MoreHorizontal, Search } from "lucide-react";
import { useState } from "react";
import { attendees } from "../constants/attendees";
import dayjs from "../lib/dayjs";
import { IconButton } from "./icon-button";
import { Pagination } from "./pagination";
import { Table } from "./table";

export function AttendeeList() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;
  const attendeesFiltered = attendees.slice(
    (page - 1) * perPage,
    page * perPage,
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="flex w-72 items-center gap-3 rounded-lg border border-white/10 px-3 py-1.5">
          <Search className="size-4 text-emerald-300" />
          <input
            className="flex-1 border-0 bg-transparent p-0 text-sm outline-none"
            placeholder="Buscar participante..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <Table.Root>
        <thead>
          <Table.Row>
            <Table.Header style={{ width: 48 }}>
              <input
                type="checkbox"
                className="size-4 rounded border border-white/10 bg-black/20"
              />
            </Table.Header>
            <Table.Header>Código</Table.Header>
            <Table.Header>Participante</Table.Header>
            <Table.Header>Data de inscrição</Table.Header>
            <Table.Header>Data do check-in</Table.Header>
            <th
              style={{ width: 64 }}
              className="px-4 py-3 text-left text-sm font-semibold"
            ></th>
          </Table.Row>
        </thead>
        <tbody>
          {attendeesFiltered.map((attendee) => {
            const createdAt = dayjs(attendee.createdAt).fromNow();
            const checkedInAt = dayjs(attendee.checkedInAt).fromNow();

            return (
              <Table.Row key={attendee.id} className="hover:bg-white/5">
                <Table.Data>
                  <input
                    type="checkbox"
                    className="size-4 rounded border border-white/10 bg-black/20"
                  />
                </Table.Data>
                <Table.Data>{attendee.id}</Table.Data>
                <Table.Data>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">
                      {attendee.name}
                    </span>
                    <span>{attendee.email}</span>
                  </div>
                </Table.Data>
                <Table.Data>{createdAt}</Table.Data>
                <Table.Data>{checkedInAt}</Table.Data>
                <Table.Data>
                  <IconButton variant="transparent">
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                </Table.Data>
              </Table.Row>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <Table.Data colSpan={3}>
              Mostrando {attendeesFiltered.length} de {attendees.length} itens
            </Table.Data>
            <Table.Data className="text-right" colSpan={3}>
              <Pagination
                items={attendees}
                page={page}
                perPage={perPage}
                setPage={setPage}
              />
            </Table.Data>
          </tr>
        </tfoot>
      </Table.Root>
    </div>
  );
}
