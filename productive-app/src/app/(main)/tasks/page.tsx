"use client";

import React, { useState } from "react";
import NewTask from "@/components/task/NewTask";
import TaskList from "@/components/task/TaskList";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

/**COMPONENT */
const Tasks: React.FC = () => {
  /**VARIABLES */
  const [open, setOpen] = useState(false); // modal state
  // const supabase = await createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // /**Redirect to login if user is not logged in */
  // if (!user) {
  //   redirect("/login");
  // }

  /**TEMPLATE */
  return (
    <div>
      {/* Modal */}
      <NewTask open={open} setOpen={setOpen} />

      {/* Task list with button */}
      <TaskList setOpen={setOpen} />
    </div>
  );
};

export default Tasks;
