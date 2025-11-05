import './Resume.css'

const Resume = () => {
  return (
    <section id="resume" className="resume section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Resume</h2>
        <p>Here's a brief overview about me, and my educational background.</p>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <h3 className="resume-title">Summary</h3>

            <div className="resume-item pb-0">
              <h4 style={{ marginBottom: '1rem' }}>Mohammad Ali</h4>
              <p><em>
                A dedicated, detail-oriented Front-end Developer, and a fresh graduate of Computer Science,  
                looking to grow and learn in a dynamic and innovative environment.
              </em></p>
            </div>
          </div>

          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
            <h3 className="resume-title">Education</h3>

            <div className="resume-item">
              <h4>Bachelor of Computers &amp; Information</h4>
              <h5>2020 - 2024</h5>
              <p><em>Sadat Academy for Management Sciences, Maadi, Cairo</em></p>
              <p>
                Studied Computer Science as the major with a focus on 
                software development, web development, algorithms, and data structures.
                Software Engineering my minor.
              </p>
              <p><strong>GPA 3.1</strong></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Resume
