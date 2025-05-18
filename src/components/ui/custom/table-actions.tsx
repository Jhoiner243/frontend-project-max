/* eslint-disable @typescript-eslint/no-explicit-any */

import { FileEdit, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";

export function RowActions({
  item,
  onEdit,
  onDelete,
}: {
  item: any;
  onEdit?: (item: any) => void;
  onDelete?: (id: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDelete = () => {
    // 1) Cierra el menú para quitar el foco
    setMenuOpen(false);
    // 2) Lanza el diálogo
    onDelete?.(item.id);
  };

  return (
    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {onEdit && (
          <DropdownMenuItem
            onClick={() => {
              setMenuOpen(false);
              onEdit(item);
            }}
          >
            <FileEdit className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
        )}
        {onDelete && (
          <DropdownMenuItem
            onClick={handleDelete}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
