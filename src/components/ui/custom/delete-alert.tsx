import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "sonner";

export const AlertDelete = ({
  id,
  setExpand,
  expand,
  isLoading,
  isSuccess,
  onDelete,
  trigger,
}: {
  trigger: () => void;
  setExpand: Dispatch<SetStateAction<boolean>>;
  expand: boolean;
  isSuccess: boolean;
  id: string;
  isLoading: boolean;
  onDelete: (id: string) => void;
}) => {
  const handleDelete = () => {
    onDelete(id);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Eliminado exitosamente");
      setExpand(false);
    }
  }, [isSuccess, setExpand]);

  return (
    <AlertDialog open={expand} onOpenChange={setExpand}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">
            ¿Seguro que quieres eliminar?
          </AlertDialogTitle>
          <AlertDialogDescription>
            La acción borrará permanentemente los datos en cascada, quiere decir
            que cuando un dato se elimine sus relaciones también ya sea factura,
            pedidos... etc.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isLoading === true}
            onClick={() => setExpand(false)}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading === true}
            onClick={() => {
              handleDelete();
              trigger();
            }}
          >
            {isLoading ? (
              <div>
                {" "}
                <Loader2 className="animate-spin" size={12} />
                {"eliminando..."}
              </div>
            ) : (
              "continue"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
