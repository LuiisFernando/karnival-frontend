import dynamic from "next/dynamic";
import Head from "next/head";

import * as Styled from '@/styles/pages/Home';

const Carousel = dynamic(
  () => import("@/components/Carousel"),
  { ssr: true }
);

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }: any) => (
  <button
    {...props}
    type="button"
    style={{ background: '#000', left: 0, zIndex: 2, borderRadius: '50%' }}
  >
    Previous
  </button>
);
const SlickArrowRight = ({ currentSlide, slideCount, ...props }: any) => (
  <button
    {...props}
    style={{ background: '#000', right: 0, borderRadius: '50%' }}
    type="button"
  >
    Next
  </button>
);

export default function Home() {

  const mainCarouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 8000,
    nextArrow: <SlickArrowRight />,
    prevArrow: <SlickArrowLeft />,
};

  return (
    <>
      <Head>
        <title>Karnival</title>
      </Head>
      
      <Styled.HeaderCarousel>
        <Carousel className="Carousel" {...mainCarouselSettings}>
          <Styled.ItemCarousel>
            <picture>
              <source srcSet="/images/services/karnival.jpg" type="image/webp" />
              <img src="/images/services/karnival.jpg" alt="Landscape picture" />
            </picture>
          </Styled.ItemCarousel>
        <Styled.ItemCarousel>
            <picture>
              <source srcSet="/images/services/tatuagem.jpg" type="image/webp" />
              <img src="/images/services/tatuagem.jpg" alt="Landscape picture" />
            </picture>
          </Styled.ItemCarousel>
          <Styled.ItemCarousel>
            <picture>
              <source srcSet="/images/services/barber2.png" type="image/webp" />
              <img src="/images/services/barber2.png" alt="Landscape picture" />
            </picture>
          </Styled.ItemCarousel>
          <Styled.ItemCarousel>
            <picture>
              <source srcSet="/images/services/slide.jpg" type="image/webp" />
              <img src="/images/services/slide.jpg" alt="Landscape picture" />
            </picture>
          </Styled.ItemCarousel>
          <Styled.ItemCarousel>
            <picture>
              <source srcSet="/images/services/salao.png" type="image/webp" />
              <img src="/images/services/salao.png" alt="Landscape picture" />
            </picture>
          </Styled.ItemCarousel>
        </Carousel>
      </Styled.HeaderCarousel>

    </>
    
  )
}
