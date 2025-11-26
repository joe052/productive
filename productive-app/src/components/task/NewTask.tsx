"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { NewTaskInt } from "@/lib/interfaces";
import { taskApi } from "@/lib/services/api";
import axios from "axios";

/**INTERFACES & TYPES */
interface NewTaskProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

/** COMPONENT */
const NewTask: React.FC<NewTaskProps> = ({ open, setOpen }) => {
  /**VARIABLES */
  if (!open) return null; // Don't render if modal is closed

  /** VALIDATION SCHEMA */
  const TaskValidationSchema = Yup.object().shape({
    title: Yup.string().required("Task title is required"),
    description: Yup.string().required("Task description is required").max(200),
    scheduledAt: Yup.date().required("Task date is required"),
    priority: Yup.string().required("Priority is required"),
  });

  /** INITIAL VALUES */
  const initialValues: NewTaskInt = {
    title: "",
    description: "",
    scheduledAt: "",
    priority: "medium",
  };

  /**FUNCTIONS */
  /**Function to create new task */
  const createTask = async (values: NewTaskInt) => {
    try {
      /**Post user to API */
      const response = await taskApi.post("/tasks", {
        userId: "69243de6dd7a8699e2e73971",
        title: values.title,
        description: values.description,
        scheduledAt: values.scheduledAt,
        priority: values.priority,
      });
      console.log(response);

      /**Alert user on success */
      if (response.data) {
        console.log(response.data);
        /**Alert success */
        toast(response.data.message, {
          className: "bg-sky-300 text-white rounded-xl shadow-md px-4 py-2",
        });
        return response.data;
      }
    } catch (error) {
      let errorMessage = "An unexpected error occurred";

      /**Check if it is an Axios Error */
      if (axios.isAxiosError(error)) {
        /**check if the response exists (server responded with 4xx or 5xx) */
        if (error.response && error.response.data) {
          /**Capture specific 'error' field or 'message' field from backend */
          errorMessage =
            error.response.data.error ||
            error.response.data.message ||
            error.message;

          /** Log the specific backend data for debugging */
          // console.log("Backend Error Data:", error.response.data);
        } else {
          /**No response received (e.g., Network Error, server down) */
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        /**Standard JS Error */
        errorMessage = error.message;
      }
      toast.error(errorMessage);
      console.error(error);
    }
  };

  /**TEMPLATE */
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50">
      <div className="w-full max-w-xl rounded-xl shadow-lg p-6 bg-white relative">
        {/* Modal Header */}
        <h2 className="text-xl font-semibold mb-4">
          <span className="text-black">Create </span>
          <span className="text-green-500">New </span>
          <span className="text-black">Task </span>
        </h2>
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
          {({ handleReset, isValid, isSubmitting, errors, touched }) => (
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
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none
                ${
                  touched.title && errors.title
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-300 focus:ring-1 focus:ring-green-500"
                }`}
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
                  Description *
                </label>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Add any additional details..."
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none resize-none
               ${
                 touched.description && errors.description
                   ? "border-red-500 focus:ring-1 focus:ring-red-500"
                   : "border-gray-300 focus:ring-1 focus:ring-green-500"
               }`}
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
                  Due Date *
                </label>
                <Field
                  type="date"
                  name="scheduledAt"
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none
                ${
                  touched.scheduledAt && errors.scheduledAt
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-300 focus:ring-1 focus:ring-green-500"
                }`}
                />
                <ErrorMessage
                  name="scheduledAt"
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
                    <Field type="radio" name="priority" value="medium" />
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
                {/* Cancel */}
                <button
                  type="button"
                  onClick={() => {
                    handleReset();
                    setOpen(false);
                  }}
                  className="px-4 py-2 rounded-lg border text-white font-bold bg-gray-400 hover:bg-gray-600"
                >
                  Cancel
                </button>

                {/* Create Task */}
                <button
                  type="submit"
                  disabled={!isValid}
                  className="px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-700"
                >
                  {isSubmitting ? "Submitting..." : "Create Task"}
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
