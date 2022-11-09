import Image from "next/image"
import { HomeContainer, Product } from "../styles/pages/home"

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

import camiseta1 from '../assets/camisetas/1.png';
import camiseta2 from '../assets/camisetas/2.png';
import camiseta3 from '../assets/camisetas/3.png';
import camiseta4 from '../assets/camisetas/4.png';
import { stripe } from "../lib/stripe";
import { GetServerSideProps } from "next";
import Stripe from "stripe";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    price: number;
  }[]
}
export default function Home({ products }: HomeProps) {

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  return (

    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map(product => {
        return (
          <Product key={product.id} className="keen-slider__slide">
            <Image src={product.imageUrl} width={410} height={350} alt="" />

            <footer>
              <strong>{product.name}</strong>
              <span>R$ {product.price}</span>
            </footer>
          </Product>
        )
      })}

    </HomeContainer>
  )
}


export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });

  console.log(response.data);
  // Dica sempre que for trabalhar com preço, transformar o valor em centavos, ou seja multiplicar x 100
  // Criar uma nova lista, apenas com os dados necessários

  const products = response.data.map(product => {

    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      description: product.description,
      price: price.unit_amount / 100, // Recupera o valor de recentavos para reais
    }
  })

  return {
    props: {
      products
    }
  }
}