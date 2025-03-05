import { FunctionComponent } from "react"
import { Link, useLocation } from "react-router-dom"
import { NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

interface StyledNavLinkProps {
  to: string
  children: React.ReactNode
  onClick?: () => void;
}

export const StyledNavLink: FunctionComponent<StyledNavLinkProps> = ({ to, children, onClick }) => {
  const location = useLocation()
  const active = location.pathname === to

  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          to={to}
          className={cn(
            "text-lg font-semibold transition-colors px-4 py-2 rounded-md",
            active ? "text-primary border-b-2 border-primary" : "text-muted-foreground",
            "hover:text-primary hover:bg-accent/50"
          )}
          onClick={onClick}
        >
          {children}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}


// import {FunctionComponent, PropsWithChildren} from 'react'
// import {NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle} from '@/components/ui/navigation-menu.tsx'
// import { Link, useLocation } from 'react-router-dom'

// interface StyledNavLinkProps extends PropsWithChildren {
//   to: string
// }

// export const StyledNavLink: FunctionComponent<StyledNavLinkProps> = ({to, children}) => {
//   const location = useLocation()
//   const active = location.pathname === to
  
//   return (
//     <NavigationMenuItem>
//       <NavigationMenuLink className={navigationMenuTriggerStyle()} 
//         asChild active={active}>
//         <Link to={to}>{children}</Link>
//       </NavigationMenuLink>
//     </NavigationMenuItem>
//   )
// }