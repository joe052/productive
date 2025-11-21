export interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
  priority: "High" | "Medium" | "Low";
}

export interface NewTaskInt {  
  title: string;
  description: string;
  date: string;
  priority: "High" | "Medium" | "Low";
}

export type Nothing = {
  id: number;
  title: string;
  description: string;
  date: string;
  priority: "High" | "Medium" | "Low";
};
