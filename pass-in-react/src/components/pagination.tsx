import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { setSearchParams } from "../functions/set-search-params";
import { IconButton } from "./icon-button";

interface IPagination {
  page: number;
  perPage: number;
  total?: number;
  setPage: (page: number) => void;
}

export function Pagination({ page, perPage, total = 1, setPage }: IPagination) {
  const totalPages = Math.ceil(total / perPage);

  function goToFirstPage() {
    setPage(1);
    setSearchParams("page", 1);
  }

  function goToPreviousPage() {
    const newPage = page - 1;

    setPage(newPage);
    setSearchParams("page", newPage);
  }

  function goToNextPage() {
    const newPage = page + 1;

    setPage(newPage);
    setSearchParams("page", newPage);
  }

  function goToLastPage() {
    setPage(totalPages);
    setSearchParams("page", totalPages);
  }

  return (
    <div className="inline-flex items-center gap-8">
      <span>
        Página {page} de {totalPages}
      </span>
      <div className="flex gap-1.5">
        <IconButton onClick={goToFirstPage} disabled={page <= 1}>
          <ChevronsLeft className="size-4" />
        </IconButton>
        <IconButton onClick={goToPreviousPage} disabled={page <= 1}>
          <ChevronLeft className="size-4" />
        </IconButton>
        <IconButton onClick={goToNextPage} disabled={page >= totalPages}>
          <ChevronRight className="size-4" />
        </IconButton>
        <IconButton onClick={goToLastPage} disabled={page >= totalPages}>
          <ChevronsRight className="size-4" />
        </IconButton>
      </div>
    </div>
  );
}
