"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { NewTaskInt } from "@/lib/interfaces";

/**INTERFACES & TYPES */
interface NewTaskProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

/** COMPONENT */
const NewTask: React.FC<NewTaskProps> = ({ open, setOpen }) => {
  /**VARIABLES */
  if (!open) return null; // Don't render if modal is closed

  /**gfgfgf */
  const TaskValidationSchema = Yup.object().shape({
    title: Yup.string().required("Task title is required"),
    description: Yup.string().required("Task description is required"),
    date: Yup.date().required("Task date is required"),
    priority: Yup.string().required(),
  });

  /**gfgfgfgf */
  const initialValues: NewTaskInt = {
    title: "",
    description: "",
    date: "",
    priority: "Medium",
  };

  /**FUNCTIONS */
  /**ffhfhfhf */
  const createTask = (values: NewTaskInt) => {
    console.log("Task Created:", values);

    toast("Task created successfully!", {
      className: "bg-sky-300 text-white rounded-xl shadow-md px-4 py-2",
    });

    return "submitted";
  };

  /**TEMPLATE */
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50">
      <div className="w-full max-w-xl rounded-xl shadow-lg p-6 bg-white relative">
        {/* Modal Header */}
        <h2 className="text-xl font-semibold mb-4">Create New Task</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={TaskValidationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            console.log("Form submitted with:", values);
            /**Sign in with api */
            const data = await createTask(values);
            setSubmitting(false);

            /**Reset form after submit */
            if (data) {
              resetForm();
              setOpen(false); // Close modal after submission
            }
          }}
        >
          {({ handleReset }) => (
            <Form className="space-y-6">
              {/* Task Title */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Task Title *
                </label>
                <Field
                  name="title"
                  type="text"
                  placeholder="e.g., Finish project report"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
                <ErrorMessage
                  name="title"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Add any additional details..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
                <ErrorMessage
                  name="description"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Due Date
                </label>
                <Field
                  type="date"
                  name="date"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
                <ErrorMessage
                  name="date"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Priority
                </label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Field type="radio" name="priority" value="low" />
                    <span>Low</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <Field type="radio" name="priority" value="Medium" />
                    <span>Medium</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <Field type="radio" name="priority" value="high" />
                    <span>High</span>
                  </label>
                </div>
                <ErrorMessage
                  name="priority"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    handleReset();
                    setOpen(false);
                  }}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                >
                  Create Task
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewTask;
