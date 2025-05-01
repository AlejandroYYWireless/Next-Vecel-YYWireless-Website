"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CompanyLogo from "./CompanyLogo";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

const ContactUsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <InteractiveHoverButton>Contact Us</InteractiveHoverButton>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <CompanyLogo height={150} width={150} className="self-center" />
          <div className="space-y-4">
            <DialogTitle className="text-3xl">Lets get in touch.</DialogTitle>
            <DialogDescription className="text-lg">
              We are excited to hear from you! Please fill out the form below
              and we will get back to you very soon.
            </DialogDescription>
          </div>
        </DialogHeader>

        <div>
          <Label className="text-xl">Business Name</Label>
          <Input
            className="h-14 text-lg [&:not(:focus)]:text-lg [&:focus]:text-lg"
            placeholder="enter business name.."
          />
        </div>
        <div>
          <Label className="text-xl">Reason for contact</Label>
          <Textarea
            className="text-lg [&:not(:focus)]:text-lg [&:focus]:text-lg"
            placeholder="tell us more about your needs.."
          />
        </div>
        <DialogFooter>
          <Button type="submit">Submit</Button>
          <Button variant="outline" className="ms-4" type="reset">
            Reset
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContactUsDialog;
