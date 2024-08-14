import { Analytics } from "../components/Analytics";
import { useAuth } from "../store/auth";
export const Home = () => {
  const { isLoggedIn , toggleTheme, darkMode , username} = useAuth();
  // console.log(user)
  return (
    <>
      <main className={ darkMode ? 'dark-mode' : 'light-mode'}>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>We are the World Best IT Company</p>
              <h1>Welcome {username} </h1>
              <p>
                Are you ready to take your business to the next level with
                cutting-edge IT solutions? Look no further! At RoyalX Technical,
                we specialize in providing innovative IT services and solutions
                tailored to meet your unique needs.
              </p>
              <div className="btn btn-group">
                <a href="/contact">
                  <button className="btn">connect now</button>
                </a>
                <a href="/services">
                  <button className="btn secondary-btn">learn more</button>
                </a>
              </div>
            </div>

            {/* hero images  */}
            <div className="hero-image">
              <img
                src="/images/home.png"
                alt="coding together"
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>
<div className="Home-analytics">
      {/* 2nd section  */}
      <Analytics />
      </div>

      {/* 3rd section  */}
      <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <section className="section-hero" >
        <div className="container grid grid-two-cols">
          {/* hero images  */}
          <div className="hero-image">
            <img
              src="/images/design.png"
              alt="coding together"
              width="400"
              height="500"
            />
          </div>

          <div className="hero-content">
            <p>We are here to help you</p>
            <h1>Get Started Today</h1>
            <p>
              Ready to take the first step towards a more efficient and secure
              IT infrastructure? Contact us today for a free consultation and
              lets discuss how Thapa Technical can help your business thrive in
              the digital age.
            </p>
            <div className="btn btn-group">
              <a href="/contact">
                <button className="btn">connect now</button>
              </a>
              <a href="/services">
                <button className="btn secondary-btn">learn more</button>
              </a>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};
