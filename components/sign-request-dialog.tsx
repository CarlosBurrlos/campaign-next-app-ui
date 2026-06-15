"use client";

import { useFormspree } from "../hooks/use-formspree";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
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

export function SignRequestDialog({ open, onOpenChange, formId }: Props) {
  const { status, handleSubmit } = useFormspree(formId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Request a Yard Sign</DialogTitle>
          <DialogDescription>
            Fill out the form below and we'll get a sign to you.
          </DialogDescription>
        </DialogHeader>
        {status === "success" ? (
          <div className="bg-green-50 border border-green-200 rounded-sm p-4 text-center">
            <p className="text-green-800 font-semibold text-sm">
              Request received!
            </p>
            <p className="text-green-700 text-xs mt-1">
              We'll be in touch shortly to arrange delivery.
            </p>
          </div>
        ) : (
          <form className="grid grid-cols-2 gap-3" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <Label htmlFor="signFirstName">First Name</Label>
              <Input id="signFirstName" name="firstName" className="h-10" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="signLastName">Last Name</Label>
              <Input id="signLastName" name="lastName" className="h-10" required />
            </div>
            <div className="space-y-1 col-span-2">
              <Label htmlFor="signEmail">Email</Label>
              <Input id="signEmail" name="email" type="email" className="h-10" required />
            </div>
            <div className="space-y-1 col-span-2">
              <Label htmlFor="signPhone">Phone</Label>
              <Input id="signPhone" name="phone" type="tel" className="h-10" required />
            </div>
            <div className="space-y-1 col-span-2">
              <Label htmlFor="signAddress">Street Address</Label>
              <Input id="signAddress" name="address" className="h-10" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="signCity">City</Label>
              <Input id="signCity" name="city" className="h-10" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="signZip">Zip Code</Label>
              <Input id="signZip" name="zip" className="h-10" required />
            </div>
            <div className="space-y-2 col-span-2">
              <Label>Delivery Preference</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="delivery"
                    value="deliver"
                    defaultChecked
                    className="accent-[var(--color-input-accent)]"
                  />
                  Deliver to my address
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    className="accent-[var(--color-input-accent)]"
                  />
                  I'll pick it up
                </label>
              </div>
            </div>
            {status === "error" && (
              <p className="col-span-2 text-xs text-red-600">
                Something went wrong. Please try again.
              </p>
            )}
            <div className="col-span-2">
              <Button
                className="w-full bg-[var(--color-button-bg)] hover:bg-[var(--color-button-bg-hover)] text-white h-11"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Submitting..." : "Submit Request"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
