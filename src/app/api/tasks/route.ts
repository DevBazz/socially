/* eslint-disable @typescript-eslint/no-unused-vars */
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface CreateTaskRequest {
  title: string;
}

const tasks: Task[] = [
  { id: 1, title: "Learn Next.js", completed: false },
  { id: 2, title: "Build a project", completed: false },
];

export async function GET(){
    return Response.json(tasks)
}

export async function POST(request: Request){
    try {
        const body: CreateTaskRequest = await request.json()

    if(!body.title){
        return Response.json({error: "Title is required"}, {status: 400})
    }

    const newTask: Task = {
        id: tasks.length + 1,
        title: body.title,
        completed: false
    }
     tasks.push(newTask)
     return Response.json(newTask, {status: 201})
    } catch (error) {
        return Response.json({error: "Internal Server Error"}, {status: 500})
    }
}

export async function DELETE(request: Request){
    try {
        const {searchParams} = new URL(request.url)
        const id = parseInt(searchParams.get('id') || '')

        if(!id){
            return Response.json({error: "Invalid task ID"}, {status: 400})
        }
        const taskIndex = tasks.findIndex(task => task.id === id)
        if(taskIndex === -1){
            return Response.json({error: "Task not found"}, {status: 404})
        }
        tasks.splice(taskIndex, 1)
        return Response.json({message: "Task deleted successfully"}, {status: 200})
    } catch (error) {
        return Response.json({error: "Internal Server Error"}, {status: 500})   
    }
}