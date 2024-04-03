import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { IconButton } from "./icon-button";

interface IPagination {
  items: any[];
  page: number;
  perPage: number;
  setPage: (page: number) => void;
}

export function Pagination({ items, page, perPage, setPage }: IPagination) {
  const totalPages = Math.ceil(items.length / perPage);

  function goToFirstPage() {
    setPage(1);
  }

  function goToPreviousPage() {
    setPage(page - 1);
  }

  function goToNextPage() {
    setPage(page + 1);
  }

  function goToLastPage() {
    setPage(totalPages);
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
