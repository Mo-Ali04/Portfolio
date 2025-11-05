import { useEffect, useRef, useState } from 'react'
import './Skills.css'

const skillsData = [
  { name: 'HTML', value: 95 },
  { name: 'CSS', value: 90 },
  { name: 'JavaScript', value: 85 },
  { name: 'TypeScript', value: 75 },
  { name: 'React', value: 75 },
  { name: 'Tailwind CSS', value: 85 },
  { name: 'Bootstrap', value: 75 },
  { name: 'Java', value: 75 },
  { name: 'Python', value: 60 }
]

const SkillItem = ({ name, value }) => {
  const [animated, setAnimated] = useState(false)
  const progressRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            setAnimated(true)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (progressRef.current) {
      observer.observe(progressRef.current)
    }

    return () => {
      if (progressRef.current) {
        observer.unobserve(progressRef.current)
      }
    }
  }, [animated])

  return (
    <div className="progress" ref={progressRef}>
      <span className="skill">
        <span>{name}</span> <i className="val">{value}%</i>
      </span>
      <div className="progress-bar-wrap">
        <div 
          className="progress-bar" 
          role="progressbar" 
          aria-valuenow={value} 
          aria-valuemin="0" 
          aria-valuemax="100"
          style={{ width: animated ? `${value}%` : '0%' }}
        ></div>
      </div>
    </div>
  )
}

const Skills = () => {
  return (
    <section id="skills" className="skills section light-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>Skills</h2>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row skills-content skills-animation">
          <div className="col-lg-6">
            {skillsData.slice(0, 5).map((skill, index) => (
              <SkillItem key={index} name={skill.name} value={skill.value} />
            ))}
          </div>

          <div className="col-lg-6">
            {skillsData.slice(5).map((skill, index) => (
              <SkillItem key={index} name={skill.name} value={skill.value} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
