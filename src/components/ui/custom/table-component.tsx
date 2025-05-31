/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { Download, Search, SortAsc, SortDesc, User } from "lucide-react";
import { ReactNode, useCallback, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setLimit } from "../../../store/pagination/slice";
import { Card, CardContent } from "../card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../pagination";
import { RowActions } from "./table-actions";

type SortDirection = "asc" | "desc" | null;
type Column = {
  cod?: string;
  id: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: any) => React.ReactNode;
};

interface DataTableProps {
  title?: string;
  columns: Column[];
  data: any[];
  onAdd?: ReactNode;
  onEdit?: (item: any) => void;
  onDelete?: (item: string) => void;
  onExport?: () => void;
  rute: string;
  totalItems: number;
  lastPages: number;
}

export function DataTable({
  title,
  columns,
  data,
  onAdd,
  onEdit,
  totalItems,
  onDelete,
  onExport,
  rute,
  lastPages,
}: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const limitValue = useSelector((state: any) => state.limit);
  const dispatch = useDispatch();
  const [searchParams, setSearchParam] = useSearchParams();

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

  // Filter data based on search term
  const filteredData = data.filter((item) => {
    return Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Sort data based on sort column and direction
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      if (!sortColumn || !sortDirection) return 0;
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (sortDirection === "asc") return aValue > bValue ? 1 : -1;
      return aValue < bValue ? 1 : -1;
    });
  }, [filteredData, sortColumn, sortDirection]);

  // Paginate data
  const paginatedData = sortedData.slice(
    (currentPage - 1) * limitValue,
    currentPage * limitValue
  );

  const handleClickForLink = (id: string) => navigate(`${rute}/${id}`);
  // Handle sort
  const handleSort = (columnId: string) => {
    if (sortColumn === columnId) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortColumn(null);
        setSortDirection(null);
      }
    } else {
      setSortColumn(columnId);
      setSortDirection("asc");
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      updateSearchParams({ ["page"]: currentPage - 1 });
    }
  };

  const handleNext = () => {
    if (currentPage < lastPages) {
      updateSearchParams({ ["page"]: currentPage + 1 });
    }
  };

  const handleItemsPerPageChange = (value: string) => {
    const newItemsPerPage = Number.parseInt(value);
    const newTotalPages = Math.ceil(sortedData.length / newItemsPerPage);

    dispatch(setLimit(newItemsPerPage));
    // Si la página actual es mayor que el nuevo total de páginas, ir a la última página
    const newPage = currentPage > newTotalPages ? newTotalPages : currentPage;

    updateSearchParams({
      ["limit"]: newItemsPerPage,
      ["page"]: newPage,
    });
  };

  const handlePageClick = (page: number) => {
    updateSearchParams({ ["page"]: page });
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (lastPages <= maxVisiblePages) {
      for (let i = 1; i <= lastPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(lastPages);
      } else if (currentPage >= lastPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = lastPages - 3; i <= lastPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(lastPages);
      }
    }

    return pages;
  };
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex items-center gap-2">
          {onExport && (
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          )}
          {onAdd}
        </div>
      </div>

      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id} className="whitespace-nowrap">
                  {column.sortable ? (
                    <button
                      className="flex items-center gap-1"
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                      {sortColumn === column.id ? (
                        sortDirection === "asc" ? (
                          <SortAsc className="h-4 w-4" />
                        ) : (
                          <SortDesc className="h-4 w-4" />
                        )
                      ) : null}
                    </button>
                  ) : (
                    column.label
                  )}
                </TableHead>
              ))}
              {(onEdit || onDelete) && (
                <TableHead className="w-[100px]">Acciones</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow
                key={index}
                onDoubleClick={() => handleClickForLink(item.id)}
              >
                {columns.map((column) => (
                  <TableCell key={column.id} className="whitespace-nowrap">
                    {column.render
                      ? column.render(item[column.id], item)
                      : item[column.id]}
                  </TableCell>
                ))}
                {(onEdit || onDelete) && (
                  <TableCell key={index}>
                    <RowActions
                      item={item}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {paginatedData.length === 0 && (
          <Card className="w-full items-center border-dashed bg-muted/30 border-muted-foreground/20">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-primary/10 p-3 mb-3">
                <User className="h-6 w-6 text-primary" />
              </div>
              <p className="font-medium text-muted-foreground">
                No hay datos registrados
              </p>
              <p className="text-sm text-muted-foreground/70 max-w-xs mt-1">
                {`
                    Utilice el botón "Agregar" para comenzar a registrar sus datos
                  `}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {lastPages > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Mostrando {paginatedData.length} de {totalItems} registros
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={limitValue.toString()}
              onValueChange={handleItemsPerPageChange}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>

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
                      currentPage === lastPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  );
}
