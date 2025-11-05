import './Footer.css'

const Footer = () => {
  return (
    <footer id="footer" className="footer position-relative light-background">
      <div className="container">
        <div className="copyright text-center">
          <p>© <span>Copyright</span> <strong className="px-1 sitename">iPortfolio</strong> <span>All Rights Reserved</span></p>
        </div>
        <div className="credits">
          Designed by <a href="https://bootstrapmade.com/" target="_blank" rel="noopener noreferrer">BootstrapMade</a> Distributed by <a href="https://themewagon.com" target="_blank" rel="noopener noreferrer">ThemeWagon</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
