import styled from 'styled-components';
import * as C from '@/styles/Constants';

const carouselImgHeight = 500;

export const ItemCarousel = styled.div`
	outline: 0;
	display: flex;
	width: 100%;
	border-radius: 16px;
    height: 200px;

	img  {
		width: 90%;
        height: 100%;
		margin: 0 auto;
        object-fit: cover;
	}

    @media (min-width: ${C.XL}) {
        height: ${carouselImgHeight}px;
    }

`;

export const HeaderCarousel = styled.div`
	max-width: 100%;
    height: 200px;
    /* background-color: red; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 50px;
	.Carousel {
		display: flex;
	} 
	.slick-slider {
		display: flex; 
		align-items: center;

		&:hover {
			.prev-button, 
			.next-button {
				display: flex;
			}
		}
	}

	.slick-list {
		width: 100%;
        height: 200px;
	}

    .slick-track {
        height: 200px;
    }

	.slick-dots {
        display: none;
		li {
			button {
				&::before {
					color: white;
					opacity: 1;
					font-size: 39px;
					text-shadow: 0px 2px 8px rgba(0, 0, 0, 0.4);
				}
			}

			&.slick-active {
				button {
					&::before {
						color: #000;
						opacity: 1;
						font-size: 39px;
					}
				}
			}
		}
	}

	.slick-next, .slick-prev {
		cursor: pointer;
		border: 0;
		outline: 0;
        background-color: rgba(0, 0, 0, 0.5);
		position: absolute;
		z-index: 1;
		padding: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 19px;
		width: 20px;
		border-radius: 25px;

		svg {
			font-size: 18px;
		}
	}

    @media (min-width: ${C.XL}) {
        height: ${carouselImgHeight}px;

        .slick-list {
            width: 100%;
            height: ${carouselImgHeight}px;
        }

        .slick-track {
            height: ${carouselImgHeight}px;
        }
    }
`;