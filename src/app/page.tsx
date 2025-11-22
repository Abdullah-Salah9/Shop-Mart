import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return <>
  <div className='min-h-[60vh] flex justify-center items-center flex-col'>
    <div className="flex flex-col items-center justify-center max-w-2xl mb-8">
      <h2 className='text-5xl font-bold  mb-6'>Welcome To ShopMart</h2>
      <p className="text-center text-lg text-muted-foreground mb10">Discover the latest technology, fashion, and lifestyle products Quality guaranteed with fast shipping and excellent customer service</p>
    </div>
    <div className="flex gap-4 items-center">
      <Link href={'/products'}>
        <Button className="cursor-pointer px-8 py-5">
          Shop Now
        </Button>
      </Link>
      <Link href={'/categories'}>
        <Button className="cursor-pointer px-8 py-5 border-black" variant={"outline"}>
          Browse Categories
        </Button>
      </Link>
    </div>
  </div>
  </>
}
