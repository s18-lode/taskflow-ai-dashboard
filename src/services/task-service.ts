import { supabase } from "@/lib/supabase";
import { Task } from "@/types/task";



//fetch all created data from supabase
export const fetchTasks = async (
    userId: string
): Promise<Task[]> => {
    const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", userId)
        .order("id", {
            ascending: true,
        })
    // console.log("DATA:", data);
    // console.log("ERROR:", error);

    if (error) {
        throw new Error(error.message);
    }

    return data || [];
};

//Create Data and add to table in supabase
export const createTasks = async (
    title: string,
    userId: string,
    parentId: number | null = null
) => {
    const { data, error } = await supabase
        .from("tasks")
        .insert([
            {
                title,
                completed: false,
                user_id: userId,
                parent_id: parentId,
            }
        ])
        .select();

    if (error) {
        throw new Error(error.message);
    }
    return data;
};

// Update Task based on user edit task.
export const updateTaskStatus = async (
    id: number,
    completed: boolean
) => {
    const { error } = await supabase
        .from("tasks")
        .update({
            completed
        })
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }
};


//Delete task based on id
export const deleteTaskById = async (
    id: number,
) => {
    const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }
};


//edit Task bases on id, and title.

export const editTaskTitle = async (
    id: number,
    title: string,
) => {
    const { error } = await supabase
        .from("tasks")
        .update({
            title,
        })
        .eq("id", id)

    if (error) {
        throw new Error(error.message)
    }
}