import SEO from "@/components/SEO";
import Link from "next/link";
import { client } from "@/lib/prismic";
import { GetServerSideProps } from "next";
import { Title } from "../styles/pages/Home";
import Prismic from "prismic-javascript";
import PrismicDOM from "prismic-dom";
import { Document } from "prismic-javascript/types/documents";

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: Document[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  // useEffect(() => {
  //   fetch("http://localhost:3333/recommended").then((response) => {
  //     response.json().then((data) => {
  //       setRecommendedProducts(data);
  //     });
  //   });
  // }, []);

  async function handleSum() {
    const math = (await import("../lib/math")).default;
    alert(math.sum(3, 5));
  }

  return (
    <div>
      <SEO
        title="DevCommerce, your best e-commerce!"
        image="banner.png"
        shouldExcludeTitleSuffix
      />
      <section>
        <Title>Hello World</Title>
        <ul>
          {recommendedProducts.map((recommendedProduct) => {
            return (
              <li key={recommendedProduct.id}>
                <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                  <a>
                    {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <button onClick={handleSum}>Soma</button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at("document.type", "product"),
  ]);

  return {
    props: {
      recommendedProducts: recommendedProducts.results,
    },
  };
};
