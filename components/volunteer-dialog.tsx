"use client";

import { useFormspree } from "../hooks/use-formspree";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formId: string;
};

export function VolunteerDialog({ open, onOpenChange, formId }: Props) {
  const { status, handleSubmit } = useFormspree(formId);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Volunteer for the Campaign</DialogTitle>
          <DialogDescription>
            Add your email below to join our volunteer list. You'll receive
            updates on campaign events, canvassing opportunities, and other ways
            to get involved.
          </DialogDescription>
        </DialogHeader>
        {status === "success" ? (
          <div className="bg-green-50 border border-green-200 rounded-sm p-4 text-center">
            <p className="text-green-800 font-semibold text-sm">
              You're signed up!
            </p>
            <p className="text-green-700 text-xs mt-1">
              Thanks for joining — we'll be in touch with ways to help.
            </p>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Email address
              </label>
              <Input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="h-11"
                required
              />
            </div>
            {status === "error" && (
              <p className="text-xs text-red-600">
                Something went wrong. Please try again.
              </p>
            )}
            <Button
              className="w-full bg-[var(--color-button-bg)] hover:bg-[var(--color-button-bg-hover)] text-white h-11"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Submitting..." : "Sign Me Up"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
