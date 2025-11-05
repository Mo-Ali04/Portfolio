import './Services.css'

const servicesData = [
  {
    id: 1,
    icon: 'bi-window-stack',
    title: 'Front-End Development',
    description: 'Crafting responsive, visually appealing, and user-friendly web interfaces using HTML, CSS, and JavaScript.',
    delay: 100
  },
  {
    id: 2,
    icon: 'bi-filetype-js',
    title: 'JavaScript Solutions',
    description: 'Building dynamic features and interactive experiences using JavaScript, including API integrations and asynchronous functionality.',
    delay: 200
  },
  {
    id: 3,
    icon: 'bi-window-sidebar',
    title: 'Web Design',
    description: 'Designing clean and intuitive layouts for websites that enhance user engagement.',
    delay: 300
  }
]

const Services = () => {
  return (
    <section id="services" className="services section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Services</h2>
        <p>
          Unlock your website's full potential with cutting-edge solutions tailored to your needs. 
          From seamless integration of dynamic features to troubleshooting challenges, I bring 
          creativity and technical precision to every project. Explore my services to discover 
          how I can enhance your online presence and create impactful user experiences.
        </p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {servicesData.map((service) => (
            <div 
              key={service.id} 
              className="col-lg-4 col-md-6 service-item d-flex" 
              data-aos="fade-up" 
              data-aos-delay={service.delay}
            >
              <div className="icon flex-shrink-0">
                <i className={`bi ${service.icon}`}></i>
              </div>
              <div>
                <h4 className="title stretched-link">{service.title}</h4>
                <p className="description">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
