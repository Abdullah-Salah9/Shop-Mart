import Loading from '@/app/loading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CategoryI } from '@/interfaces';
import Image from 'next/image';
import Link from 'next/link';

export default async function Categories() {


  const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories');
  const {data: catData} : {data: CategoryI[]} = await response.json();
  console.log(catData)
  

  return <>
  
  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
    {
      catData.map((cat) => <Card className='text-center cursor-pointer hover:scale-105 transform transition-all' key={cat._id}>
        <Link href={'/categories/'+cat._id}>
        <div>
          <Image className='size-64 object-cover' src={cat.image} alt={cat.name} width={300} height={300}/>
        </div>
        <div>
          <CardTitle>{cat.name}</CardTitle>
        </div>
        </Link>
      </Card>)
    }
  </div>
  

  </>
}
