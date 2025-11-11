import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import './Contact.css'

// Map Loader Component for lazy loading
const MapLoader = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const mapRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isMapLoaded) {
          setIsMapLoaded(true)
        }
      },
      { threshold: 0.1 }
    )

    if (mapRef.current) {
      observer.observe(mapRef.current)
    }

    return () => {
      if (mapRef.current) {
        observer.unobserve(mapRef.current)
      }
    }
  }, [isMapLoaded])

  return (
    <div ref={mapRef} style={{ width: '100%', height: '270px', position: 'relative' }}>
      {!isMapLoaded ? (
        <div style={{
          width: '100%',
          height: '100%',
          background: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          color: '#666'
        }}>
          <div style={{ textAlign: 'center' }}>
            <i className="bi bi-geo-alt" style={{ fontSize: '2rem', color: '#149ddd' }}></i>
            <p style={{ marginTop: '10px' }}>Loading map...</p>
          </div>
        </div>
      ) : (
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1728.046647016472!2d31.314363392172268!3d29.97674872561338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2sus!4v1744148885012!5m2!1sen!2sus" 
          style={{ border: 0, width: '100%', height: '270px' }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Location Map"
        ></iframe>
      )}
    </div>
  )
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      // Initialize EmailJS (replace with your actual credentials)
      emailjs.init('T8BXV3x546iEa04rg')
      
      await emailjs.send(
        'service_8y1068i',
        'template_lh92pb3',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message
        }
      )

      setStatus({ 
        type: 'success', 
        message: 'Your message has been sent. Thank you!' 
      })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Error sending message. Please configure EmailJS credentials.' 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="contact section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Contact</h2>
        <p>
          I'd love to hear from you! Whether you have a project in mind, need assistance with web development, 
          or just want to connect, feel free to reach out. Fill out the form below or contact me directly using the provided details.
        </p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          <div className="col-lg-5">
            <div className="info-wrap">
              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="200">
                <i className="bi bi-geo-alt flex-shrink-0"></i>
                <div>
                  <h3>Address</h3>
                  <p>M.S.A For engineering, 4, Maadi, Cairo</p>
                </div>
              </div>

              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
                <i className="bi bi-telephone flex-shrink-0"></i>
                <div>
                  <h3>Call Us</h3>
                  <p>+20 11 48559965</p>
                </div>
              </div>

              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
                <i className="bi bi-envelope flex-shrink-0"></i>
                <div>
                  <h3>Email Us</h3>
                  <p>mohammad.awad106@gmail.com</p>
                </div>
              </div>

              <MapLoader />
            </div>
          </div>

          <div className="col-lg-7">
            <form onSubmit={handleSubmit} className="js-email-form" data-aos="fade-up" data-aos-delay="200">
              <div className="row gy-4">
                <div className="col-md-6">
                  <label htmlFor="name-field" className="pb-2">Your Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    id="name-field" 
                    className="form-control" 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="email-field" className="pb-2">Your Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    name="email" 
                    id="email-field" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-12">
                  <label htmlFor="subject-field" className="pb-2">Subject</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="subject" 
                    id="subject-field" 
                    required 
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-12">
                  <label htmlFor="message-field" className="pb-2">Message</label>
                  <textarea 
                    className="form-control" 
                    name="message" 
                    rows="10" 
                    id="message-field" 
                    required 
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="col-md-12 text-center">
                  {loading && <div className="loading">Loading</div>}
                  {status.type === 'error' && <div className="error-message">{status.message}</div>}
                  {status.type === 'success' && <div className="sent-message">{status.message}</div>}

                  <button type="submit" disabled={loading}>Send Message</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
