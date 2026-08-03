import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CATEGORY_LABELS, type Project } from '../data/projects'
import { projectSrcSetFromPath } from '../utils/projectImages'
import { ProjectImage } from './ProjectImage'

type ProjectCardProps = {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className={`project-card project-card--${project.size ?? 'standard'}`}>
      <Link to={`/projetos/${project.slug}`} className="project-card-link" aria-label={`Ver projeto: ${project.title}`}>
        <ProjectImage
          src={project.coverImage}
          srcSet={projectSrcSetFromPath(project.coverImage, project.imageBase)}
          sizes="(max-width: 700px) calc(100vw - 28px), (max-width: 980px) 50vw, 38vw"
          alt={project.alt}
          style={{ objectPosition: project.objectPosition }}
          width={960}
          height={720}
        />
        <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
        <span className="project-card-copy">
          <small>{CATEGORY_LABELS[project.category]}</small>
          <strong>{project.title}</strong>
          <p>{project.description}</p>
          {project.location && <span className="project-location">{project.location}</span>}
          <span className="project-card-action">Ver projeto <ArrowUpRight aria-hidden="true" /></span>
        </span>
      </Link>
    </article>
  )
}
