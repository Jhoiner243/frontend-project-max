/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Search,
  SortAsc,
  SortDesc,
  User,
} from "lucide-react";
import { ReactNode, useState } from "react";

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
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../card";
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
  title: string;
  columns: Column[];
  data: any[];
  onAdd?: ReactNode;
  onEdit?: (item: any) => void;
  onDelete?: (item: string) => void;
  onExport?: () => void;
  rute: string;
}

export function DataTable({
  title,
  columns,
  data,
  onAdd,
  onEdit,
  onDelete,
  onExport,
  rute,
}: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  // Filter data based on search term
  const filteredData = data.filter((item) => {
    return Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Sort data based on sort column and direction
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn || !sortDirection) return 0;

    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
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
            {paginatedData.length > 0 &&
              paginatedData.map((item, index) => (
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

      {totalPages > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Mostrando {paginatedData.length} de {filteredData.length} registros
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => {
                setPageSize(Number(value));
                setCurrentPage(1); // Reset to first page when changing page size
              }}
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

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
                <span className="sr-only">Primera página</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Página anterior</span>
              </Button>
              <span className="text-sm">
                Página {currentPage} de {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Página siguiente</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
                <span className="sr-only">Última página</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
