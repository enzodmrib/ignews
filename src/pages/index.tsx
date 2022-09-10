import { GetStaticProps } from 'next'
import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import styles from './home.module.scss'

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

// Client-side-rendering - Não precisa de indexação, informações com alta volatilidade de renderização
// Server-side-rendering - Utilizar para casos de uma página indexada, porém com conteúdo dinâmico da sessão do usuário, informações em tempo real
// Static Site Generations - Utilizar para casos de uma página HTML igual para todos que consomem, e contém informações indexadas

//------------------------------------------------------------------------------------------------------------------------------------------------

// Post do blog

// Conteúdo (SSG)
// Comentário (Client-side)

export default function Home({ product }: HomeProps) { 
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId}/>
        </section>

        <img src="/images/avatar.svg" alt="Girl coding"/>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1Lfg5HJE83xC9KeKlfTl6TRq')
  
  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100)
  };

  return {
    props : {
      product
    }, 
    revalidate: 60 * 60 * 24, // 24 horas
  }
}