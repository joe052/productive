export interface Task {
  _id: string;
  userId?: any;
  title: string;
  description: string;
  scheduledAt: string;
  priority: "high" | "medium" | "low";
}

export interface SignUpInt {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
export interface NewTaskInt {  
  title: string;
  description: string;
  scheduledAt: string;
  priority: "high" | "medium" | "low";
}

export type Nothing = {
  id: number;
  title: string;
  description: string;
  date: string;
  priority: "High" | "Medium" | "Low";
};
