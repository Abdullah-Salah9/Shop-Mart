'use client'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Loader2, ShoppingCartIcon, UserIcon } from "lucide-react"
import { CartContext } from "../Context/CartContext"
import { useContext } from "react"
import { signOut, useSession } from "next-auth/react"
export default function Navbar() {

  const {isLoading , cartData} = useContext(CartContext);

  const session = useSession()

  return <>
  <nav className="bg-gray-50 py-2 text-2xl font-semibold shadow sticky top-0 z-50">
    <div className="container mx-auto">
      <div className="flex justify-between items-center">

        <h1><Link href={'/'}> ShopMart</Link></h1>

        <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href="/products">Products</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
      <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href="/categories">Categories</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
      <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href="/brands">Brands</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center">
          {
            session.status == 'authenticated' && <h2 className="text-sm me-2">Hi {session.data?.user.name}</h2>
          }
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-0"><UserIcon className="cursor-pointer"/></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {
                session.status == 'authenticated' ? <>
                <Link href={'/profile'}>
                <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                </Link>

                <DropdownMenuItem className="cursor-pointer" onClick={()=> signOut({
                  callbackUrl: '/'
                })}>Logout</DropdownMenuItem>
                </> : <>
                <Link href={'/login'}>
                <DropdownMenuItem className="cursor-pointer">Login</DropdownMenuItem>
                </Link>
                <Link href={'/register'}>
                <DropdownMenuItem className="cursor-pointer">Register</DropdownMenuItem>
                </Link>
                </>
              }
              
              
              
            </DropdownMenuContent>
          </DropdownMenu>
          {
            session.status == 'authenticated' && <Link href={'/cart'} className="relative p-3">
            <ShoppingCartIcon/>
            <Badge className="size-4 rounded-full px-2 py-2 absolute top-0 end-0">
              <span className="">  {isLoading ? <Loader2 className="animate-spin size-4"/> : cartData?.numOfCartItems}  </span>
            </Badge>
          </Link>
          }
        </div>
      </div>
    </div>
  </nav>
  </>
}
