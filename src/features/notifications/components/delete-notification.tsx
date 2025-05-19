import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";
import { DeleteIcon } from "../../ai/components/icons";

interface DeleteNotification {
  id: string;
  onDelete: (id: string) => void;
}

export default function DeleteNotification({
  onDelete,
  id,
}: DeleteNotification) {
  return (
    <div className="flex flex-1 ">
      <Separator
        orientation="vertical"
        className="mx-2 data-[orientation=vertical]:h-10"
      />
      <Button onClick={() => onDelete(id)} variant="ghost" size="icon">
        <DeleteIcon />
      </Button>
    </div>
  );
}
