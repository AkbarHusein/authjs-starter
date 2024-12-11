import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

export interface FormAlertprops {
    type: string | undefined
    message: string | undefined
}

export function FormAlert({ type, message }: FormAlertprops) {
    switch (type) {
        case 'error':
            return (<div
                className='bg-destructive/15 text-destructive rounded-md p-3 flex items-center gap-x-2 mb-5'>
                <ExclamationTriangleIcon className='w-4 h-4' />
                {message}
            </div>)
        case 'success':
            return (<div
                className='bg-emerald-500/15 text-emerald-500 rounded-md p-3 flex items-center gap-x-2 mb-5'>
                <ExclamationTriangleIcon className='w-4 h-4' />
                {message}
            </div>)
        default:
            return null
    }
}
