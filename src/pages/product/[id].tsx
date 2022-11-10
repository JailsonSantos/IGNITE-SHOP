import Stripe from "stripe";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import { stripe } from "../../lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product";
// import { useRouter } from "next/router";

interface ProductProps {
  product: {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
    description: string;
  }
}

export default function Product({ product }: ProductProps) {
  // Buscando parametros pela rota
  //const { query } = useRouter();

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={410} height={350} alt="" />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>

        <button>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}

// Criando SSG com parametros dinâmicos
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_MlqtPjMYvbV0vd' } }
    ],
    fallback: false,
  }
}


// Criando SSG para paginas produtos
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      products: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        description: product.description,
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount / 100),
      }
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}