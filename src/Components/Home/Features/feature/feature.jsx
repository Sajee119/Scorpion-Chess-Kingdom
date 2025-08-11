import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChessKnight, faChalkboardTeacher, faChartLine, 
  faPuzzlePiece, faTrophy, faMobileAlt 
} from '@fortawesome/free-solid-svg-icons';
import './Feature.css';

const feature = ({icon, title, description}) => {
  // Map icon strings to FontAwesome icons
  const iconMap = {
    'fas fa-chess-knight': faChessKnight,
    'fas fa-chalkboard-teacher': faChalkboardTeacher,
    'fas fa-chart-line': faChartLine,
    'fas fa-puzzle-piece': faPuzzlePiece,
    'fas fa-trophy': faTrophy,
    'fas fa-mobile-alt': faMobileAlt
  };

  const iconComponent = iconMap[icon] || faChessKnight;

  return (
    <div className="feature-card">
        <div className="feature-icon">
            <FontAwesomeIcon icon={iconComponent} />
        </div>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-desc">{description}</p>
    </div>
  )
}

export default feature