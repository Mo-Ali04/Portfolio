import './About.css'

const About = () => {
  return (
    <section id="about" className="about section">
      <div className="container section-title" data-aos="fade-up">
        <h2>About Me</h2>
        <p>
          Hi, I'm Mohammad Ali, a passionate experience-seeking Front-end Developer. 
          With a Bachelor's degree in Computers and Information, I've honed my skills to create engaging, 
          user-friendly websites. Born in Dubai, UAE, I currently live in the bustling city of Cairo, Egypt. 
          My journey in tech is driven by the desire to solve real-world problems through innovation and technology.
        </p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4 justify-content-center">
          <div className="col-lg-4">
            <img src="/assets/img/my-profile-img.jpg" className="img-fluid" alt="Mohammad Ali" />
          </div>
          <div className="col-lg-8 content">
            <h2>Front-end Developer.</h2>
            <p className="fst-italic py-3">
              Whether you're looking for a web developer or simply connect, you can reach me through:
            </p>
            <div className="row">
              <div className="col-lg-6">
                <ul>
                  <li><i className="bi bi-chevron-right"></i> <strong>Birthday:</strong> <span>8 July 2002</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Phone:</strong> <span>+20 11 48559965</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>City:</strong> <span>Cairo, Egypt</span></li>
                </ul>
              </div>
              <div className="col-lg-6">
                <ul>
                  <li><i className="bi bi-chevron-right"></i> <strong>Age:</strong> <span>22</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Degree:</strong> <span>Bachelor</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Email:</strong> <span>mohammad.awad106@gmail.com</span></li>
                </ul>
              </div>
            </div>
            <p className="py-3">
              Leveraging my strong foundation in front-end development, 
              I aim to bridge the gap between functionality and aesthetics in every project I take on. 
              The goal is to deliver solutions that not only meet technical requirements but also captivate users visually.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
