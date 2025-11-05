import './ScrollTop.css'

const ScrollTop = () => {
  const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <a 
      href="#" 
      id="scroll-top" 
      className="scroll-top d-flex align-items-center justify-content-center"
      onClick={scrollToTop}
    >
      <i className="bi bi-arrow-up-short"></i>
    </a>
  )
}

export default ScrollTop
