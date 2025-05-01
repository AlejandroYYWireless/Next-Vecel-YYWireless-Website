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

const ContactUsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Contact us!</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <CompanyLogo height={150} width={150} className="self-center" />
          <div>
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
            className="h-14 text-3xl"
            placeholder="enter business name.."
          />
        </div>
        <div>
          <Label>Reason for contact</Label>
          <Textarea placeholder="enter business name.." />
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
