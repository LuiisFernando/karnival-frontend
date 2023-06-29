import React, { ReactNode } from "react";
import Slider from "react-slick";

interface ICarouselProps {
    className: string;
    children: ReactNode,
}

function Carousel({
    className,
    children,
    ...rest
}: ICarouselProps) {
    return (
        <Slider className={className} autoplay={false} {...rest}>
            {children}
        </Slider>
    );
}

export default Carousel;
