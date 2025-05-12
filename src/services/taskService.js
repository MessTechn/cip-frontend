import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

const API_BASE_URL = 'http://127.0.0.1:89/api'

async function handleRequest(url, method = 'GET', body = null, headers = {}) {
    const response = await fetch(url, {
        method,
        headers,
        body,
    })

    if (!response.ok) {
        let errorMessage = `Request failed with status: ${response.status}`
        try {
            const errorData = await response.json()
            errorMessage = errorData.message || errorMessage
        } catch (e) {}

        throw new Error(errorMessage)
    }

    try {
        return await response.json()
    } catch (e) {
        return null
    }
}

async function fetchOpenTasksRequest() {
    return handleRequest(`${API_BASE_URL}/tasks/open`, 'GET', null, { 'Accept': 'application/json' })
}

export function useFetchOpenTasks() {
    return useQuery({
        queryKey: ['openTasks'],
        queryFn: fetchOpenTasksRequest,
    })
}

async function fetchDoneTasksRequest() {
    return handleRequest(`${API_BASE_URL}/tasks/done`, 'GET', null, { 'Accept': 'application/json' })
}

export function useFetchDoneTasks() {
    return useQuery({
        queryKey: ['doneTasks'],
        queryFn: fetchDoneTasksRequest,
    })
}

async function createTaskRequest(createTaskData) {
    return handleRequest(`${API_BASE_URL}/task`, 'POST', JSON.stringify(createTaskData), { 'Content-Type': 'application/json', 'Accept': 'application/json' })
}

export function useCreateTask() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['createTask'],
        mutationFn: createTaskRequest,
        onSuccess: () => {
            queryClient.invalidateQueries(['openTasks', 'doneTasks'])
        },
        onError: (error) => {
            alert(`Failed to create task: ${error.message}`)
            console.error('Error creating task:', error)
        },
    })
}

async function clearTasksRequest() {
    return handleRequest(`${API_BASE_URL}/tasks`, 'DELETE', null, { 'Accept': 'application/json' })
}

export function useClearTasks() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['clearTasks'],
        mutationFn: clearTasksRequest,
        onSuccess: () => {
            queryClient.invalidateQueries(['openTasks', 'doneTasks'])
        },
        onError: (error) => {
            alert(`Failed to clear tasks: ${error.message}`)
            console.error('Error clearing tasks:', error)
        },
    })
}

async function deleteTaskRequest(deleteTaskId) {
    return handleRequest(`${API_BASE_URL}/task/${deleteTaskId}`, 'DELETE', null, { 'Accept': 'application/json' })
}

export function useDeleteTask() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['deleteTask'],
        mutationFn: deleteTaskRequest,
        onSuccess: () => {
            queryClient.invalidateQueries(['openTasks', 'doneTasks'])
        },
        onError: (error) => {
            alert(`Failed to delete task: ${error.message}`)
            console.error('Error deleting task:', error)
        },
    })
}

async function updateTaskRequest(updateTask) {
    return handleRequest(`${API_BASE_URL}/task/${updateTask.id}`, 'PUT', JSON.stringify(updateTask.data), { 'Content-Type': 'application/json', 'Accept': 'application/json' })
}

export function useUpdateTask() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['updateTask'],
        mutationFn: updateTaskRequest,
        onSuccess: () => {
            queryClient.invalidateQueries(['openTasks', 'doneTasks'])
        },
        onError: (error) => {
            alert(`Failed to update task: ${error.message}`)
            console.error('Error updating task:', error)
        },
    })
}