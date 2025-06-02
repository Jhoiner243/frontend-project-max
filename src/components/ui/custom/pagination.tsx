"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setLimit } from "../../../store/pagination/slice";

interface ReusablePaginationProps {
  totalItems: number;
  showItemsPerPageSelector?: boolean;
  itemsPerPageOptions?: number[];
  className?: string;
  pageParam?: string;
  limitParam?: string;
  defaultItemsPerPage?: number;
}

export function ReusablePagination({
  totalItems,
  showItemsPerPageSelector = true,
  itemsPerPageOptions = [10, 20, 50, 100],
  className = "",
  pageParam = "page",
  limitParam = "limit",
  defaultItemsPerPage = 10,
}: ReusablePaginationProps) {
  const [searchParams, setSearchParam] = useSearchParams();
  const dispatch = useDispatch();
  // Obtener valores actuales de los parámetros
  const currentPage = Number(searchParams.get(pageParam)) || 1;
  const itemsPerPage =
    Number(searchParams.get(limitParam)) || defaultItemsPerPage;

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Función para actualizar los parámetros de URL
  const updateSearchParams = useCallback(
    (updates: Record<string, string | number>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value.toString());
        } else {
          params.delete(key);
        }
      });

      setSearchParam(`?${params.toString()}`);
    },
    [setSearchParam, searchParams]
  );

  // Generar números de página a mostrar
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 20;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      updateSearchParams({ [pageParam]: currentPage - 1 });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      updateSearchParams({ [pageParam]: currentPage + 1 });
    }
  };

  const handlePageClick = (page: number) => {
    updateSearchParams({ [pageParam]: page });
  };

  const handleItemsPerPageChange = (value: string) => {
    const newItemsPerPage = Number.parseInt(value);
    const newTotalPages = Math.ceil(totalItems / newItemsPerPage);

    dispatch(setLimit(newItemsPerPage));
    // Si la página actual es mayor que el nuevo total de páginas, ir a la última página
    const newPage = currentPage > newTotalPages ? newTotalPages : currentPage;

    updateSearchParams({
      [limitParam]: newItemsPerPage,
      [pageParam]: newPage,
    });
  };

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Información y selector de elementos por página */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>
          Mostrando {startItem} a {endItem} de {totalItems} resultados
        </div>
        {showItemsPerPageSelector && (
          <div className="flex items-center gap-2">
            <span>Elementos por página:</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={handleItemsPerPageChange}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {itemsPerPageOptions.map((option) => (
                  <SelectItem key={option} value={option.toString()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Controles de paginación */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrevious}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {getPageNumbers().map((page, index) => (
            <PaginationItem key={index}>
              {page === "ellipsis" ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={() => handlePageClick(page as number)}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={handleNext}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
