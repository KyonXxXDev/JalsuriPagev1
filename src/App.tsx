import { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsStrip } from './components/StatsStrip';
import { ProductsSection } from './components/ProductsSection';
import { B2BCalculator } from './components/B2BCalculator';
import { PurificationSteps } from './components/PurificationSteps';
import { Maquila3DStudio } from './components/Maquila3DStudio';
import { MaquilaSection } from './components/MaquilaSection';
import { ValueProps } from './components/ValueProps';
import { CoverageAndDelivery } from './components/CoverageAndDelivery';
import { ClosingCTA } from './components/ClosingCTA';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { OrderModal } from './components/OrderModal';
import { Waves } from './components/Waves';
import type { Product } from './data/productsData';

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger, useGSAP);

export function App() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpenOrderModal = (product?: Product) => {
    setSelectedProduct(product || null);
    setIsOrderModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen text-slate-100 flex flex-col font-sans selection:bg-cyanbrand-500 selection:text-white bg-corporate-950">
      {/* Navigation Header */}
      <Navbar onOpenOrderModal={() => handleOpenOrderModal()} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Section with animated SVG waves */}
        <Hero onOpenOrderModal={() => handleOpenOrderModal()} />
         {/* Wave divider into B2B Calculator */}
        <Waves variant="corporate" baseColor="#0f172a" />
        {/* Animated Stats & Trust Strip */}
        <StatsStrip />
        
        {/* Interactive Products Showcase (Without fixed prices) */}
        <ProductsSection onSelectProductForOrder={handleOpenOrderModal} />

        {/* Wave divider into B2B Calculator */}
        <Waves variant="corporate" baseColor="#0f172a" />

        {/* B2B Hydration Calculator by Area & Employees */}
        <B2BCalculator onOpenOrderModal={() => handleOpenOrderModal()} />

        {/* 7-Step Purification Pipeline */}
        <PurificationSteps />

        {/* Wave transition into 3D Studio */}
        <Waves variant="cyan" baseColor="#0b1329" />

        {/* Interactive 3D Container Customizer Studio for Maquila (Three.js) */}
        <Maquila3DStudio />

        {/* B2B Maquila and Private Label Service Details */}
        <MaquilaSection />

        {/* Key Health & Quality Value Propositions */}
        <ValueProps />

        {/* Coverage, Delivery Routes and FAQs */}
        <CoverageAndDelivery />

        {/* High-Impact Closing Call to Action */}
        <ClosingCTA onOpenOrderModal={() => handleOpenOrderModal()} />
      </main>

      {/* Wave transition before Footer */}
      <Waves variant="slate" baseColor="#080d1a" />

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Order & Quotation Modal */}
      <OrderModal
        key={selectedProduct ? selectedProduct.id : 'modal-default'}
        isOpen={isOrderModalOpen}
        onClose={handleCloseOrderModal}
        initialProduct={selectedProduct}
      />
    </div>
  );
}

export default App;