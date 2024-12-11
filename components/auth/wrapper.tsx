import { Header, HeaderProps } from '@/components/auth/header'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Footer } from '@/components/auth/footer'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Social } from './social'
import { cn } from '@/lib/utils'

interface WrapperProps extends HeaderProps {
    children: React.ReactNode
    footerLabel: string
    footerHref: string
    showSocial: boolean
    className?: string
}

export function Wrapper({
    children,
    headerTitle,
    headerDesc,
    footerLabel,
    footerHref,
    showSocial,
    className
}: WrapperProps) {
    return (
        <Card className={`${cn('w-[467px] bg-slate-50 shadow-xl rounded-lg z-50', className)}`}>
            <Header headerTitle={headerTitle} headerDesc={headerDesc} />
            {children}
            {showSocial &&
                <Footer>
                    <Separator className='mb-4' orientation='horizontal' />
                    <Social />
                </Footer>
            }
            <Footer>
                <Separator className='mb-4' orientation='horizontal' />
                <Button variant='link' size='sm' asChild>
                    <Link href={footerHref}>{footerLabel}</Link>
                </Button>
            </Footer>
        </Card>
    )
}
