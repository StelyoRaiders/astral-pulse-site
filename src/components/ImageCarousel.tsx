import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "./ui/button";
import carouselCars from "@/assets/carousel-cars.jpg";
import carouselPolice from "@/assets/carousel-police.jpg";
import carouselNightlife from "@/assets/carousel-nightlife.jpg";

const slides = [
  {
    image: carouselCars,
    title: "Vehículos Premium",
    description: "Conduce los coches más exclusivos de la ciudad",
    tag: "GARAGE",
  },
  {
    image: carouselPolice,
    title: "Fuerzas del Orden",
    description: "Únete a la policía y protege a los ciudadanos",
    tag: "LSPD",
  },
  {
    image: carouselNightlife,
    title: "Vida Nocturna",
    description: "Experimenta la vibrante escena de clubes",
    tag: "NIGHTLIFE",
  },
];

const ImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section id="gallery" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-muted/50 to-transparent" />
      </div>

      <div className="container px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl md:text-6xl mb-4">
            <span className="text-gradient">EXPLORA</span>
            <br />
            <span className="text-foreground">NUESTRO MUNDO</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Descubre las infinitas posibilidades en Nova Roleplay
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main Carousel */}
          <div className="relative aspect-[16/9] overflow-hidden">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  index === currentSlide
                    ? "opacity-100 translate-x-0 scale-100"
                    : index < currentSlide
                    ? "opacity-0 -translate-x-full scale-95"
                    : "opacity-0 translate-x-full scale-95"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 p-8 md:p-12">
                  {/* Tag */}
                  <span className="inline-block px-4 py-1 bg-primary/90 font-heading text-sm tracking-wider text-background mb-4 skew-x-[-5deg]">
                    <span className="skew-x-[5deg] inline-block">{slide.tag}</span>
                  </span>
                  
                  <h3 className="font-heading text-4xl md:text-5xl text-foreground mb-2">
                    {slide.title}
                  </h3>
                  <p className="text-foreground/80 text-lg max-w-md">
                    {slide.description}
                  </p>
                </div>

                {/* Play Button */}
                <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center hover:scale-110 transition-transform shadow-glow-strong">
                  <Play className="w-8 h-8 text-background ml-1" fill="currentColor" />
                </button>
              </div>
            ))}

            {/* Navigation Arrows */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 glass-dark hover:bg-primary/20 w-12 h-12"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 glass-dark hover:bg-primary/20 w-12 h-12"
              onClick={nextSlide}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Slide Counter */}
            <div className="absolute bottom-8 right-8 md:right-12 font-heading text-4xl text-foreground/30">
              <span className="text-primary">{String(currentSlide + 1).padStart(2, '0')}</span>
              <span>/</span>
              <span>{String(slides.length).padStart(2, '0')}</span>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex justify-center gap-4 mt-8">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative w-32 h-20 overflow-hidden transition-all duration-300 skew-x-[-5deg] ${
                  index === currentSlide
                    ? "ring-2 ring-primary shadow-glow scale-105"
                    : "opacity-50 hover:opacity-80"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover skew-x-[5deg] scale-110"
                />
              </button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="flex justify-center gap-2 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1 transition-all duration-300 skew-x-[-10deg] ${
                  index === currentSlide
                    ? "w-12 bg-primary"
                    : "w-4 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;