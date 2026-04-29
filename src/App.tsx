import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartProvider";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Layout from "./components/Layout";
import Index from "./pages/Index.tsx";
import Product from "./pages/Product.tsx";
import About from "./pages/About.tsx";
import Delivery from "./pages/Delivery.tsx";
import Payment from "./pages/Payment.tsx";
import Returns from "./pages/Returns.tsx";
import Promotions from "./pages/Promotions.tsx";
import Faq from "./pages/Faq.tsx";
import Reviews from "./pages/Reviews.tsx";
import Contact from "./pages/Contact.tsx";
import Checkout from "./pages/Checkout.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/produkt/:id" element={<Product />} />
              <Route path="/o-sklepie" element={<About />} />
              <Route path="/dostawa" element={<Delivery />} />
              <Route path="/platnosc" element={<Payment />} />
              <Route path="/zwroty" element={<Returns />} />
              <Route path="/promocje" element={<Promotions />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/opinie" element={<Reviews />} />
              <Route path="/kontakt" element={<Contact />} />
              <Route path="/zamowienie" element={<Checkout />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
