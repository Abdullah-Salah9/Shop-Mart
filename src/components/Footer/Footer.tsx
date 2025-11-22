import { LocationEdit, Mail, Phone } from 'lucide-react'
import React from 'react'

export default function Footer() {

    return <>
    <footer className='border-t w-full bg-white'>
        <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
                {/* shopMart */}
                <div>
                    <h2 className='text-2xl font-bold mb-4'><span className='py-1 px-3 bg-black text-white'>T</span> ShopMart</h2>
                    <p className='text-sm text-muted-foreground'> Your one-stop destination for the latest technology, fashion, and lifestyle 
                        products. Quality guaranteed with fast shipping and excellent customer service.</p>
                    <div className='mt-4 space-y-2 text-sm text-muted-foreground'>
                        <div className='flex items-center gap-2'>
                            <LocationEdit className='w-4 h-4'/><span>123 Shop Street, October City, DC 12345</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Phone className='w-4 h-4'/><span>(+20) 01093333333</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Mail className='w-4 h-4'/><span>support@shopmart.com</span>
                        </div>
                    </div>
                </div>
                {/* shop */}
                <div>
                    <h3 className='font-semibold mb-3'>SHOP</h3>
                    <ul className='text-muted-foreground space-y-2 text-sm'>
                        <li>Electronics</li>
                        <li>Fashion</li>
                        <li>Home & Garden</li>
                        <li>Sports</li>
                        <li>Deals</li>
                    </ul>
                </div>
                {/* customer service */}
                <div>
                    <div>
                    <h3 className='font-semibold mb-3'>CUSTOMER SERVICE</h3>
                    <ul className='text-muted-foreground space-y-2 text-sm'>
                        <li>Contact Us</li>
                        <li>Help Center</li>
                        <li>Track Your Order</li>
                        <li>Returns & Exchanges</li>
                        <li>Size Guide</li>
                    </ul>
                </div>
                </div>
                {/* about */}
                <div>
                    <div>
                    <h3 className='font-semibold mb-3'>ABOUT</h3>
                    <ul className='text-muted-foreground space-y-2 text-sm'>
                        <li>About ShopMart</li>
                        <li>Careers</li>
                        <li>Press</li>
                        <li>Investor Relations</li>
                        <li>Sustainability</li>
                    </ul>
                </div>
                </div>
                {/* policies */}
                <div>
                    <div>
                    <h3 className='font-semibold mb-3'>POLICIES</h3>
                    <ul className='text-muted-foreground space-y-2 text-sm'>
                        <li>Privacy Policy</li>
                        <li>Terms Of Service</li>
                        <li>Cookie Policy</li>
                        <li>Shipping Policy</li>
                        <li>Refund Policy</li>
                    </ul>
                </div>
                </div>
                
            </div>
            {/* bottom */}
            <div className="text-center text-sm text-muted-foreground border-t pt-4 mt-4">
                    © {new Date().getFullYear()} ShopMart. All rights reserved.
                </div>
        </div>
    </footer>
    </>
}
 