/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { Download, Search, SortAsc, SortDesc, User } from "lucide-react";
import { type ReactNode, useMemo, useState } from "react";

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
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLimit } from "../../../store/pagination/slice";
import { useUpdateParam } from "../../../utils/update-search-param";
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
  hideOnMobile?: boolean;
};

interface DataTableProps {
  title?: string;
  columns: Column[];
  data: any[];
  onAdd?: ReactNode;
  onEdit?: (item: any) => void;
  onDelete?: (item: string) => void;
  onExport?: () => void;
  rute?: string;
  totalItems?: number;
  lastPages?: number;
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
  lastPages = 1,
}: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const limitValue = useSelector((state: any) => state.limit);
  const dispatch = useDispatch();
  const { updateSearchParams } = useUpdateParam();

  // Función para actualizar los parámetros de URL

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

  const handleClickForLink = (id: string) => {
    if (rute !== undefined && id) {
      navigate(`${rute}/${id}`);
    }
  };

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const itemDelay = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  // Mobile card view for better responsiveness
  const MobileCard = ({ item }: { item: any }) => (
    <Card className="mb-4 p-4">
      <div className="space-y-2">
        {columns.map((column) => (
          <div key={column.id} className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">
              {column.label}:
            </span>
            <span className="text-sm">
              {column.render
                ? column.render(item[column.id], item)
                : item[column.id]}
            </span>
          </div>
        ))}
        {(onEdit || onDelete) && (
          <div className="flex gap-2 pt-2 border-t">
            <RowActions item={item} onEdit={onEdit} onDelete={onDelete} />
          </div>
        )}
      </div>
    </Card>
  );

  return (
    <div className="w-full space-y-4">
      {/* Header - Responsive layout */}
      <h2 className="text-xl sm:text-2xl font-semibold ">{title}</h2>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-7 space-y-2 sm:space-y-0">
        {/* Search */}
        <div className="w-full sm:w-80 md:w-64 lg:w-72">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar..."
              className="pl-10 h-9 text-sm border-0"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* Botones Exportar + Agregar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 w-full sm:w-auto">
          {onExport && (
            <Button
              variant="outline"
              onClick={onExport}
              className="w-full sm:w-auto"
            >
              <Download className="mr-2 h-4 w-4" />
              <span className="sm:inline">Exportar</span>
            </Button>
          )}
          <div className="w-full sm:w-auto">{onAdd}</div>
        </div>
      </div>

      {/* Table - Hidden on mobile, shown on larger screens */}
      <div className="hidden md:block">
        <div className="rounded-md border overflow-x-auto">
          <motion.table
            className="w-full"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead
                    key={column.id}
                    className={
                      column.hideOnMobile ? "hidden lg:table-cell" : ""
                    }
                  >
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
                <motion.tr
                  className="border-1 hover:bg-background/20  dark:hover:bg-black/60 focus-visible:bg-background"
                  key={index}
                  variants={itemDelay}
                  onDoubleClick={() => handleClickForLink(item.id)}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      className={
                        column.hideOnMobile ? "hidden lg:table-cell" : ""
                      }
                    >
                      {column.render
                        ? column.render(item[column.id], item)
                        : item[column.id]}
                    </TableCell>
                  ))}
                  {(onEdit || onDelete) && (
                    <TableCell>
                      <RowActions
                        item={item}
                        onEdit={onEdit}
                        onDelete={onDelete}
                      />
                    </TableCell>
                  )}
                </motion.tr>
              ))}
            </TableBody>
          </motion.table>
        </div>
      </div>

      {/* Mobile Card View - Shown only on mobile */}
      <div className="md:hidden">
        {paginatedData.map((item, index) => (
          <MobileCard key={index} item={item} />
        ))}
      </div>

      {/* Empty state */}
      {data.length === 0 && (
        <Card className="w-full border-dashed bg-gradient-to-br from-muted/30 to-muted/10 border-muted-foreground/20">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <motion.div
              className="relative mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="rounded-full bg-primary/10 p-4 mb-2 relative">
                <User className="h-8 w-8 text-primary" />
                <motion.div
                  className="absolute -top-1 -right-1 rounded-full bg-primary/20 p-1"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-3 h-3 rounded-full bg-primary/60" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="space-y-3 max-w-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-foreground">
                {searchTerm || data.length <= 0
                  ? "Sin resultados"
                  : "¡Comienza aquí!"}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {searchTerm
                  ? `No se encontraron resultados para "${searchTerm}". Intenta con otros términos de búsqueda.`
                  : "Aún no tienes datos registrados. Crea tu primer registro para comenzar a organizar tu información."}
              </p>
            </motion.div>

            {!searchTerm && onAdd && (
              <motion.div
                className="mt-6 flex flex-col sm:flex-row gap-3 items-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex-shrink-0">{onAdd}</div>
                {onExport && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-1 h-1 rounded-full bg-muted-foreground/40"></div>
                    <span>o importa datos existentes</span>
                  </div>
                )}
              </motion.div>
            )}

            {searchTerm && (
              <motion.div
                className="mt-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button
                  variant="outline"
                  onClick={() => setSearchTerm("")}
                  className="gap-2"
                >
                  Limpiar búsqueda
                </Button>
              </motion.div>
            )}

            <motion.div
              className="mt-8 flex items-center justify-center gap-4 text-xs text-muted-foreground/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500/60"></div>
                <span>Seguro</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-500/60"></div>
                <span>Rápido</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-purple-500/60"></div>
                <span>Organizado</span>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      )}

      {/* Pagination - Responsive layout */}
      {lastPages > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 flex-wrap">
          <div className="text-sm text-muted-foreground text-center sm:text-left">
            Mostrando {paginatedData.length} de {totalItems} registros
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2">
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
              <PaginationContent className="flex-wrap gap-1">
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
