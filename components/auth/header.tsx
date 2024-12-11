import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export interface HeaderProps {
  headerTitle?: string,
  headerDesc: string
}

export function Header({ headerTitle, headerDesc }: HeaderProps) {
  return (
    <CardHeader className='text-center'>
      <CardTitle className='text-md md:text-2xl capitalize pt-5'>{headerTitle}</CardTitle>
      <CardDescription className='text-lg'>{headerDesc}</CardDescription>
    </CardHeader>
  )
}
