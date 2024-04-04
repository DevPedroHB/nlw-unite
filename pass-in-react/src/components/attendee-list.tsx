import { MoreHorizontal, Search } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { getEventAttendees } from "../data/get-event-attendees";
import { setSearchParams } from "../functions/set-search-params";
import dayjs from "../lib/dayjs";
import { IconButton } from "./icon-button";
import { Pagination } from "./pagination";
import { Table } from "./table";

export function AttendeeList() {
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("search")) {
      return url.searchParams.get("search") ?? "";
    }

    return "";
  });
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("page")) {
      return Number(url.searchParams.get("page"));
    }

    return 1;
  });
  const perPage = 10;
  const { data } = getEventAttendees({
    event: "77399dab-b10b-4cbf-be96-8f78eb21e73b",
    page,
    perPage,
    search,
  });

  function onSearchInputChanged(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setPage(1);
    setSearchParams("page", 1);
    setSearch(value);
    setSearchParams("search", value);
  }

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
            onChange={onSearchInputChanged}
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
          {data?.attendees.map((attendee) => {
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
                <Table.Data>
                  {attendee.checkedInAt ? (
                    checkedInAt
                  ) : (
                    <span className="text-zinc-400">Não fez check-in</span>
                  )}
                </Table.Data>
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
              Mostrando {data?.attendees.length} de {data?.total} itens
            </Table.Data>
            <Table.Data className="text-right" colSpan={3}>
              <Pagination
                page={page}
                perPage={perPage}
                total={data?.total}
                setPage={setPage}
              />
            </Table.Data>
          </tr>
        </tfoot>
      </Table.Root>
    </div>
  );
}
