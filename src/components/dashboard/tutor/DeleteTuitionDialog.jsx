"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteTuitionData } from "@/lib/actions/tutor/tutor";
import { useRouter } from "next/navigation";

const DeleteTuitionDialog = ({ tuition }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDeleteTuition = async () => {
    try {
      setLoading(true);

      const res = await deleteTuitionData(tuition._id);

      if (!res.success) {
        toast.error(res?.message || "Failed to delete tuition!");
        return;
      }

      toast.success(res?.message || "Tuition deleted successfully!");

      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            variant="outline"
            className="h-9 gap-2 border-red-200 bg-white text-red-600 hover:border-red-300 hover:bg-red-50 hover:text-red-700 cursor-pointer"
          />
        }
      >
        <Trash2 className="h-4 w-4" />
        Delete
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold text-[#17211F]">
            Delete Tuition?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-sm leading-relaxed">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-[#17211F]">
              {tuition.title}
            </span>
            ? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading} className="cursor-pointer">
            Cancel
          </AlertDialogCancel>

          <Button
            onClick={handleDeleteTuition}
            disabled={loading}
            className="cursor-pointer bg-red-600 text-white hover:bg-red-700"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {loading ? "Deleting..." : "Delete Tuition"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTuitionDialog;
