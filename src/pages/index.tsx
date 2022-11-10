import Image from "next/image"
import { HomeContainer, Product } from "../styles/pages/home"

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

// Exemplo de importação de imagens no NEXT e chamada SSR
// import camiseta1 from '../assets/camisetas/1.png';
// import { GetServerSideProps } from "next";

import { stripe } from "../lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";

interface HomeProps {
  products: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
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


// CHAMADA SSG (STATIC SIDE RENDER)
export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });

  // Dica sempre que for trabalhar com preço, transformar o valor em centavos, ou seja multiplicar x 100
  // Criar uma nova lista, apenas com os dados necessários

  const products = response.data.map(product => {

    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount / 100, // Recupera o valor de recentavos para reais
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 Hours
  }
}

/* 
// CHAMADA SSR (SERVER SIDE RENDER), EXECUTA TODA VEZ QUE A PAGINA HOME É CARREGADA
export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });

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
*/