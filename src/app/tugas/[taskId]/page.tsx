import { notFound } from "next/navigation";
import TaskRunner from "@/components/TaskRunner";
import { TASKS, getTask } from "@/tasks/registry";

export function generateStaticParams() {
  return TASKS.map((t) => ({ taskId: t.id }));
}

export default async function TaskPage({ params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = await params;
  const task = getTask(taskId);
  if (!task) notFound();
  return <TaskRunner taskId={task.id} />;
}
