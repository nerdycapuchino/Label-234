import { redirect } from "next/navigation";

// The old static product demo page is retired.
// Product detail now lives at /collections/[slug] backed by the real API.
export default function ProductRedirect() {
  redirect("/collections");
}
