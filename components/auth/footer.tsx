import { CardFooter } from '@/components/ui/card'

export interface FooterProps {
    children: React.ReactNode
}
export function Footer({ children }: FooterProps) {
    return (
        <CardFooter className='justify-center flex-col'>
            {children}
        </CardFooter>
    )
}
