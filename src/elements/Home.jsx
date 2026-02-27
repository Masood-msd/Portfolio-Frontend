export default function Home() {
  return (
    <div className="homepage">
      <main>
        <section className="section-hero">
          <div className="grid grid-two-cols">
            <div className="Title">
              <h2 className="heading-name">Syed Masood Ahmed</h2>
              <h2>I build fast, secure, and scalable web applications.</h2>
              <p className="sub-head">
                Full Stack Developer | React • Node • MongoDB • Express
              </p>
              <a href="/service">View My Work</a>
              <a href="/Contact">Hire Me</a>
            </div>
            <div>
              <div className="profile-img">
                <img
                  id="ppimg"
                  src="/1 img.png"
                  className=" img-fluid "
                  alt="Admin Profile Picture"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* middle section */}

      <section className="section-middle">
        <div className="middle-section">
          <div className="div1">
            <h3>Technical Skills</h3>         
            <ul>
              <li>HTML, CSS, JavaScript</li>
              <li>React.js, Node.js</li>
              <li> MongoDB, Express</li>
              <li>Git & GitHub</li>
            </ul>
          </div>
          <div className="div1">
            <h3>Projects</h3>
            <ul>
              <li>E-commerce Website</li>
              <li>Portfolio Website</li>
              <li>Login/Auth System</li>
              <li>REST API</li>
            </ul>
          </div>
          <div className="div1">
            <h3>Currently Learning</h3>
            <ul>
              <li>Advanced React</li>
              <li>Backend Security</li>
              <li>System Design Basics</li>
              <li>DSA</li>
            </ul>
          </div>
          <div className="div1">
            <h3>Career Goal</h3>
            <ul>
              <li>Become Full Stack Developer</li>
              <li>Work in Product-Based Company</li>
              <li>Build Scalable Apps</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Second details */}

      <main>
        <section className="section-hero">
          <div className="grid grid-two-cols">
            <div>
              <div className="">
                <img src="/home-2.png" className=" img-fluid " alt="" />
              </div>
            </div>
            <div className="Title">
              <h2 className="heading-name">Aspiring Web Developer</h2>
              <span className="secondhero-span"></span>
              <p className="sub-head-2">
                {/* Full Stack Developer | React • Node • MongoDB • Express */}
                Skilled in building clean and interactive web interfaces.
                Focused on writing efficient code and growing as a professional
                developer.
              </p>
              <a href="/Contact">Submit a Suggestion</a>
              <a href="/Contact">Contact Us</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
