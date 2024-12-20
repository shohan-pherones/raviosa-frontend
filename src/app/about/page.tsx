"use client";

import { cn } from "@/src/lib/utils";
import { fadeUp, scaleDown } from "@/src/utils/motion";
import { useMediaQuery } from "@mantine/hooks";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const aboutImages = [
  {
    id: 1,
    image: "/images/about-01.jpg",
    headline: "Aubrey Plaza: The Red Hot Queen",
    description:
      "Aubrey Plaza, our brand ambassador, brings a fiery edge and undeniable confidence to our beauty collection. Known for her unique charm and bold spirit, she embodies the essence of self-expression and empowerment. Discover products that reflect her elegance and radiate the charisma to match her fearless personality.",
  },
  {
    id: 2,
    image: "/images/about-02.jpg",
    headline: "Your Skin Deserves the Best",
    description:
      "Your skin is your canvas, and it deserves nothing less than the finest care. Our skincare essentials are thoughtfully crafted with premium, natural ingredients that work harmoniously to hydrate, rejuvenate, and protect. Embrace a regimen that enhances your natural glow and provides the nourishment your skin craves, day after day.",
  },
  {
    id: 3,
    image: "/images/about-03.jpg",
    headline: "Unleash Your Inner Artist",
    description:
      "Every look is a masterpiece waiting to happen, and our makeup collection is your ultimate toolkit. Whether you're going for daring, dramatic styles or understated, classic elegance, we provide the shades, textures, and tools to help you bring your vision to life. Express yourself like never before with our expertly curated lineup.",
  },
  {
    id: 4,
    image: "/images/about-04.jpg",
    headline: "Beauty Meets Sustainability",
    description:
      "Our commitment goes beyond beauty; it extends to the planet we cherish. By embracing eco-friendly packaging and sustainable practices, we strive to reduce our footprint while empowering you to make mindful choices. Together, we can redefine beauty standards and create a future that is as sustainable as it is stunning.",
  },
];

const AboutPage = () => {
  const [expandedItem, setExpandedItem] = useState<number>(1);
  const desktop = useMediaQuery("(min-width: 85em)");

  useEffect(() => {
    if (!desktop) {
      setExpandedItem(1);
    }
  }, [desktop, expandedItem]);

  return (
    <main>
      <section className="h-[calc(100vh-4rem)] flex">
        {aboutImages.slice(0, desktop ? 5 : 1).map((item, index) => (
          <div
            key={item.id}
            className={cn(
              desktop && expandedItem === item.id && "w-[calc(100vw-60rem)]",
              desktop && expandedItem !== item.id && "w-80",
              !desktop && "w-full",
              "h-full overflow-hidden transition-['width'] duration-1000 relative"
            )}
            onMouseOver={() => setExpandedItem(item.id)}
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={scaleDown(index * 0.1, 1)}
              className="w-full h-full"
            >
              <Image
                src={item.image}
                alt={item.headline}
                width={1920}
                height={1080}
                priority
                className={cn(
                  expandedItem === item.id
                    ? "grayscale-0 brightness-100"
                    : "grayscale brightness-[0.25]",
                  "w-full h-full object-cover object-top transition duration-1000"
                )}
              />
            </motion.div>
            {expandedItem === item.id && (
              <div className="absolute top-0 left-0 bottom-0 right-0 w-full h-full bg-black/30">
                <div className="wrapper h-full flex flex-col justify-center gap-5 text-neutral-content">
                  <div className="overflow-hidden">
                    <motion.h3
                      initial="hidden"
                      whileInView="visible"
                      variants={fadeUp(0.6)}
                      className="text-5xl font-bold"
                    >
                      {item.headline}
                    </motion.h3>
                  </div>
                  <div className="overflow-hidden">
                    <motion.p
                      initial="hidden"
                      whileInView="visible"
                      variants={fadeUp(0.7)}
                      className="hidden sm:block"
                    >
                      {item.description}
                    </motion.p>
                  </div>
                  <div className="overflow-hidden">
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      variants={fadeUp(0.8)}
                    >
                      <Link href="/products" className="btn">
                        Browse Products
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </section>
      <section className="wrapper grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10">
        <div>
          <div className="overflow-hidden">
            <motion.h3
              initial="hidden"
              whileInView="visible"
              variants={fadeUp()}
              className="text-2xl md:text-3xl font-bold mb-2.5"
            >
              Raviosa Cosmetics Shop
            </motion.h3>
          </div>
          <div className="overflow-hidden">
            <motion.p
              initial="hidden"
              whileInView="visible"
              variants={fadeUp()}
            >
              Welcome to Raviosa Cosmetics Shop, where beauty meets excellence!
              We offer a wide range of high-quality skincare, makeup, and beauty
              products carefully selected to enhance your natural beauty.
              Whether you&apos;re looking for luxurious creams, vibrant makeup
              shades, or the latest beauty trends, Raviosa has everything you
              need to look and feel your best. Our products are sourced from
              trusted brands and formulated with the finest ingredients,
              ensuring a flawless experience every time. Join us and discover
              the beauty that awaits you at Raviosa!
            </motion.p>
          </div>
        </div>
        <div>
          <div className="overflow-hidden">
            <motion.h3
              initial="hidden"
              whileInView="visible"
              variants={fadeUp()}
              className="text-2xl md:text-3xl font-bold mb-2.5"
            >
              Product Authenticity
            </motion.h3>
          </div>
          <div className="overflow-hidden">
            <motion.p
              initial="hidden"
              whileInView="visible"
              variants={fadeUp()}
            >
              At Raviosa Cosmetics Shop, authenticity is our top priority. We
              are committed to offering only 100% genuine, high-quality beauty
              products. Each item in our collection is sourced directly from
              authorized manufacturers and trusted suppliers, ensuring that
              every product you purchase is authentic and safe. We understand
              the importance of using skincare and makeup products that you can
              rely on, which is why we meticulously verify each batch for
              quality and authenticity. With Raviosa, you can shop with
              confidence, knowing that you&apos;re investing in products that
              are not only effective but also safe and true to their promises.
            </motion.p>
          </div>
        </div>
        <div>
          <div className="overflow-hidden">
            <motion.h3
              initial="hidden"
              whileInView="visible"
              variants={fadeUp()}
              className="text-2xl md:text-3xl font-bold mb-2.5"
            >
              Delivery Service
            </motion.h3>
          </div>
          <div className="overflow-hidden">
            <motion.p
              initial="hidden"
              whileInView="visible"
              variants={fadeUp()}
            >
              Raviosa Cosmetics Shop offers fast, reliable, and secure delivery
              services to ensure your beauty essentials reach you in perfect
              condition. We provide nationwide shipping with various delivery
              options to suit your needs, including express and standard
              shipping. Each order is carefully packaged to prevent damage
              during transit, so you can enjoy your products as soon as they
              arrive. With tracking updates available, you&apos;ll always know
              the status of your order. Enjoy a hassle-free shopping experience
              with Raviosa&apos;s efficient delivery service, bringing beauty
              right to your doorstep.
            </motion.p>
          </div>
        </div>
        <div>
          <div className="overflow-hidden">
            <motion.h3
              initial="hidden"
              whileInView="visible"
              variants={fadeUp()}
              className="text-2xl md:text-3xl font-bold mb-2.5"
            >
              User Privacy
            </motion.h3>
          </div>
          <div className="overflow-hidden">
            <motion.p
              initial="hidden"
              whileInView="visible"
              variants={fadeUp()}
            >
              At Raviosa Cosmetics Shop, your privacy is of utmost importance to
              us. We are dedicated to protecting your personal information and
              ensuring that your shopping experience is both secure and private.
              Our privacy policy is designed to be transparent about how we
              collect, use, and safeguard your data. We only collect the
              necessary information to process your orders and improve your
              shopping experience. Your details are stored securely and are
              never shared with third parties without your consent. Trust
              Raviosa to provide a safe and private online shopping environment,
              where your personal information is always protected.
            </motion.p>
          </div>
        </div>
        <div>
          <div className="overflow-hidden">
            <motion.h3
              initial="hidden"
              whileInView="visible"
              variants={fadeUp()}
              className="text-2xl md:text-3xl font-bold mb-2.5"
            >
              Ambassador Aubrey Plaza
            </motion.h3>
          </div>
          <div className="overflow-hidden">
            <motion.p
              initial="hidden"
              whileInView="visible"
              variants={fadeUp()}
            >
              Raviosa Cosmetics Shop is proud to partner with the talented and
              versatile actress, Aubrey Plaza, as our brand ambassador. Known
              for her unique charm, wit, and confidence, Aubrey perfectly
              embodies the spirit of Raviosa – a brand that celebrates
              individuality and empowers everyone to feel beautiful in their own
              skin. As an advocate for authenticity and self-expression,
              Aubrey’s passion for beauty aligns with our commitment to offering
              high-quality, genuine products. Together, we&apos;re excited to
              inspire confidence and redefine beauty standards with every
              product, every look, and every person.
            </motion.p>
          </div>
        </div>
        <div>
          <div className="overflow-hidden">
            <motion.h3
              initial="hidden"
              whileInView="visible"
              variants={fadeUp()}
              className="text-2xl md:text-3xl font-bold mb-2.5"
            >
              Privacy Policy
            </motion.h3>
          </div>
          <div className="overflow-hidden">
            <motion.p
              initial="hidden"
              whileInView="visible"
              variants={fadeUp()}
            >
              At Raviosa Cosmetics Shop, your privacy is a top priority. We are
              committed to safeguarding your personal information and ensuring a
              secure shopping experience. We collect necessary details, such as
              your name, contact information, and payment data, only to process
              your orders and enhance your experience. We never share your
              information with third parties for marketing purposes and use
              industry-standard security measures to protect your data. By using
              our services, you agree to this policy, and you can contact us at
              any time to update or delete your information.
            </motion.p>
          </div>
        </div>
        <div>
          <div className="overflow-hidden">
            <motion.h3
              initial="hidden"
              whileInView="visible"
              variants={fadeUp()}
              className="text-2xl md:text-3xl font-bold mb-2.5"
            >
              Terms and Conditions
            </motion.h3>
          </div>
          <div className="overflow-hidden">
            <motion.p
              initial="hidden"
              whileInView="visible"
              variants={fadeUp()}
            >
              By using Raviosa Cosmetics Shop&apos;s website and services, you
              agree to the following terms and conditions. All products are
              subject to availability, and we reserve the right to limit
              quantities or refuse orders at our discretion. Prices and
              promotions may change without prior notice. Customers must provide
              accurate and complete information during the ordering process, and
              are responsible for ensuring the security of their account
              information. We are not liable for any damages resulting from the
              use or inability to use our products. These terms are subject to
              change, and any updates will be posted on this page. For
              questions, please contact us.
            </motion.p>
          </div>
        </div>
        <div>
          <div className="overflow-hidden">
            <motion.h3
              initial="hidden"
              whileInView="visible"
              variants={fadeUp()}
              className="text-2xl md:text-3xl font-bold mb-2.5"
            >
              Taxes and Shipping
            </motion.h3>
          </div>
          <div className="overflow-hidden">
            <motion.p
              initial="hidden"
              whileInView="visible"
              variants={fadeUp()}
            >
              All prices listed on Raviosa Cosmetics Shop are exclusive of
              applicable taxes. Sales tax will be applied based on the shipping
              address and local tax laws. The total tax amount will be displayed
              during the checkout process before you complete your purchase. As
              for shipping, we offer various delivery options, including
              standard and express shipping. Shipping fees are calculated based
              on your location and the shipping method selected. Orders will be
              processed and shipped within 5 business days, and tracking
              information will be provided once your order is dispatched. Please
              note that shipping times may vary depending on your region.
            </motion.p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
