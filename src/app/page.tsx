import { redirect } from "next/navigation";
import { DEFAULT_TASK_ID } from "@/tasks/registry";

export default function Home() {
  redirect(`/tugas/${DEFAULT_TASK_ID}`);
}
