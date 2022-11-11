import { AppProps } from "next/app";
import Image from "next/image";
import Link from "next/link";
import logoImg from '../assets/logo.svg';
import { globalStyles } from "../styles/global";
import { AreaCart, Container, Header } from "../styles/pages/app";

import { useState } from "react";
import { Handbag } from 'phosphor-react';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {

  const [quantity, setQuantity] = useState(1);

  return (
    <Container>
      <Header>
        <Link href="/">
          <a>
            <Image src={logoImg} alt="" />
          </a>
        </Link>
        <AreaCart>
          <Handbag size={30} />
          {quantity > 0 &&
            <span>10</span>
          }
        </AreaCart>
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
