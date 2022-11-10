import { useRouter } from "next/router";
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product";

export default function Product() {
  const { query } = useRouter();

  return (
    <ProductContainer>
      <ImageContainer>

      </ImageContainer>
      <ProductDetails>
        <h1>Camisa X</h1>
        <span>R$ 79.90</span>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus quas incidunt esse totam, dolore maiores blanditiis nam molestiae quo minus dicta eaque quasi, nulla quae illo iure eum, dolores vel.
          Quas consequatur voluptatum magni atque ea, repellat repudiandae, facere aliquam maiores ab voluptatem beatae voluptas et dolorum accusantium sapiente minus expedita ipsam vitae ad non corrupti. Nisi magni distinctio est.</p>

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}