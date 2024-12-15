import Banner from "./Banner";
import ContactUs from "./ContactUs";
import Faq from "./Faq";
import Features from "./Features";
import Gallery from "./Gallery";
import Guidelines from "./Guidlines";
import UserReview from "./UserReview";

export default function Home() {
  return (
    <div>
        <Banner />
        <Features />
        <Guidelines />
        <Gallery />
        <Faq />
        <UserReview />
        <ContactUs />
    </div>
  )
}
