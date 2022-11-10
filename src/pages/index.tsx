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
import Link from "next/link";

interface HomeProps {
  products: {
    id: string;
    name: string;
    price: string;
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
          <Link href={`/product/${product.id}`} key={product.id}>
            <Product className="keen-slider__slide">
              <Image src={product.imageUrl} width={410} height={350} alt="" />

              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </Product>
          </Link>
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
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100), // Recupera o valor de recentavos para reais, já formatado com RS
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