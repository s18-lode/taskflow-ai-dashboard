import { supabase } from "@/lib/supabase";
import { Task } from "@/types/task";
import { title } from "process";


//fetch all created data from supabase
export const fetchTasks = async (): Promise<Task[]> => {
    const { data, error } = await supabase
        .from("tasks")
        .select("*")
    // console.log("DATA:", data);
    // console.log("ERROR:", error);

    if (error) {
        throw new Error(error.message);
    }

    return data || [];
};

//Create Data and add to table in supabase
export const createTasks = async (
    title: string
) => {
    const { data, error } = await supabase
        .from("tasks")
        .insert([
            {
                title,
                completed: false,
            }
        ])
        .select();

    if (error) {
        throw new Error(error.message);
    }
    return data;

};