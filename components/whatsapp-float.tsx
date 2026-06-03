import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/utils";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Hello Green Hub, I want to inquire about premium Assam tea supply.")}
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-105"
      aria-label="Chat on WhatsApp"
      target="_blank"
      rel="noreferrer"
    >
      <MessageCircle className="h-7 w-7" aria-hidden />
    </a>
  );
}
