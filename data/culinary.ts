// data/culinary.ts
export interface CulinaryItem {
  id: string
  name: string
  category: 'makanan' | 'minuman' | 'camilan'
  description: string
  ingredients: string[]
  price: string
  location: string
  image: string
  rating: number
  isSignature: boolean
  cookingTime?: string
  servingSize?: string
  benefits?: string[]
  contact: string
}


export const culinaryData: CulinaryItem[] = [
  {
    id: 'rujak-soto',
    name: 'Rujak Soto Rejoagung',
    category: 'makanan',
    description: 'Perpaduan unik rujak dan soto khas Desa Rejoagung dengan kuah segar dan bumbu tradisional',
    ingredients: ['Sayuran segar', 'Kuah soto ayam', 'Bumbu rujak', 'Kerupuk', 'Sambal khas'],
    price: 'Rp 12.000 - 15.000',
    location: 'Warung Bu Sari - Jl. Raya Rejoagung',
    image: '/rujak-soto.jpg',
    rating: 4.7,
    isSignature: true,
    cookingTime: '15 menit',
    servingSize: '1 porsi',
    benefits: ['Segar dan bergizi', 'Cocok untuk cuaca panas', 'Menambah nafsu makan'],
    contact: '0812-3456-7890'
  },
  {
    id: 'gudeg-rejoagung',
    name: 'Gudeg Rejoagung',
    category: 'makanan',
    description: 'Gudeg khas dengan cita rasa manis gurih, dimasak dengan nangka muda pilihan dan santan kelapa',
    ingredients: ['Nangka muda', 'Santan kelapa', 'Gula jawa', 'Daun salam', 'Lengkuas'],
    price: 'Rp 18.000 - 25.000',
    location: 'Warung Gudeg Pak Jarwo - Dusun Krajan',
    image: '/gudeg-rejoagung.jpeg',
    rating: 4.8,
    isSignature: true,
    cookingTime: '3 jam',
    servingSize: '1 porsi + nasi',
    benefits: ['Kaya serat', 'Mengenyangkan', 'Nutrisi lengkap'],
    contact: '0821-2345-6789'
  },
  {
    id: 'es-dawet-gula-merah',
    name: 'Es Dawet Gula Merah',
    category: 'minuman',
    description: 'Minuman segar es dawet dengan gula merah asli produksi desa, santan kental dan es serut',
    ingredients: ['Dawet hijau', 'Gula merah Rejoagung', 'Santan kental', 'Es serut', 'Tape singkong'],
    price: 'Rp 8.000 - 12.000',
    location: 'Es Dawet Mbah Tini - Pasar Desa Rejoagung',
    image: '/es-dawet.jpg',
    rating: 4.6,
    isSignature: true,
    cookingTime: '10 menit',
    servingSize: '1 gelas',
    benefits: ['Menghilangkan dahaga', 'Sumber energi alami', 'Menyegarkan tubuh'],
    contact: '0852-3456-7890'
  },
  {
    id: 'pecel-lele-sambal-terasi',
    name: 'Pecel Lele Sambal Terasi',
    category: 'makanan',
    description: 'Lele segar digoreng garing dengan sambal terasi pedas khas desa dan lalapan segar',
    ingredients: ['Lele segar', 'Sambal terasi', 'Lalapan', 'Nasi hangat', 'Kerupuk'],
    price: 'Rp 15.000 - 20.000',
    location: 'Pecel Lele Bu Yanti - Jl. Masjid Rejoagung',
    image: '/pecel-lele.jpg',
    rating: 4.5,
    isSignature: false,
    cookingTime: '20 menit',
    servingSize: '1 porsi',
    benefits: ['Protein tinggi', 'Pedas menghangatkan', 'Menambah nafsu makan'],
    contact: '0813-4567-8901'
  },
  {
    id: 'klepon-gula-merah',
    name: 'Klepon Gula Merah',
    category: 'camilan',
    description: 'Klepon tradisional dengan isian gula merah asli desa dan taburan kelapa parut segar',
    ingredients: ['Tepung ketan', 'Gula merah Rejoagung', 'Kelapa parut', 'Daun pandan', 'Garam'],
    price: 'Rp 10.000 - 15.000',
    location: 'Jajanan Bu Lastri - Dekat Balai Desa',
    image: '/klepon.jpg',
    rating: 4.7,
    isSignature: true,
    cookingTime: '45 menit',
    servingSize: '10 buah',
    benefits: ['Camilan sehat', 'Gula alami', 'Tradisional autentik'],
    contact: '0853-4567-8901'
  },
  {
    id: 'wedang-jahe-gula-merah',
    name: 'Wedang Jahe Gula Merah',
    category: 'minuman',
    description: 'Minuman hangat jahe dengan gula merah yang menghangatkan tubuh dan baik untuk kesehatan',
    ingredients: ['Jahe segar', 'Gula merah Rejoagung', 'Serai', 'Daun jeruk', 'Air panas'],
    price: 'Rp 5.000 - 8.000',
    location: 'Warung Kopi Pak Suroto - Pos Kamling',
    image: '/wedang-jahe.jpg',
    rating: 4.4,
    isSignature: false,
    cookingTime: '15 menit',
    servingSize: '1 gelas',
    benefits: ['Menghangatkan badan', 'Baik untuk pencernaan', 'Menambah stamina'],
    contact: '0812-3456-7891'
  }
]

export const culinaryCategories = {
  makanan: {
    label: 'Makanan Utama',
    icon: '🍛',
    color: 'bg-orange-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-300'
  },
  minuman: {
    label: 'Minuman',
    icon: '🥤',
    color: 'bg-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-300'
  },
  camilan: {
    label: 'Camilan & Jajanan',
    icon: '🍡',
    color: 'bg-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-300'
  }
}