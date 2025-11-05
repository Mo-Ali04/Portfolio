import './Header.css'

const Header = () => {
  return (
    <header id="header" className="header dark-background d-flex flex-column">
      <i className="header-toggle d-xl-none bi bi-list"></i>

      <div className="profile-img">
        <img src="/assets/img/my-profile-img.jpg" alt="Mohammad Ali" className="img-fluid rounded-circle" />
      </div>

      <a href="/" className="logo d-flex align-items-center justify-content-center">
        <h1 className="sitename">Mohammad Ali</h1>
      </a>

      <div className="social-links text-center">
        <a href="https://www.facebook.com/share/15UwcdrhMi/" className="facebook" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-facebook"></i>
        </a>
        <a href="https://www.instagram.com/mohammad.ali104?igsh=dm11bzFvdHVncXVj" className="instagram" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-instagram"></i>
        </a>
        <a href="https://www.linkedin.com/in/mohammad-ali-4a692931a" className="linkedin" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-linkedin"></i>
        </a>
      </div>

      <nav id="navmenu" className="navmenu">
        <ul>
          <li><a href="#hero" className="active"><i className="bi bi-house navicon"></i>Home</a></li>
          <li><a href="#about"><i className="bi bi-person navicon"></i> About</a></li>
          <li><a href="#resume"><i className="bi bi-file-earmark-text navicon"></i> Resume</a></li>
          <li><a href="#portfolio"><i className="bi bi-images navicon"></i> Portfolio</a></li>
          <li><a href="#services"><i className="bi bi-hdd-stack navicon"></i> Services</a></li>
          <li><a href="#contact"><i className="bi bi-envelope navicon"></i> Contact</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
