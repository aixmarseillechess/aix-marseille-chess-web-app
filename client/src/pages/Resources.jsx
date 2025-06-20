import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChess, FaCalendar, FaBook, FaGraduationCap, FaDownload, FaExternalLinkAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './Resources.css';

const Resources = () => {
  const { t } = useTranslation();
  const [expandedSections, setExpandedSections] = useState({
    rules: false,
    schedule: false,
    training: false,
    literature: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const chessRules = [
    {
      title: t('resources.sections.rules.basicRules.title'),
      content: t('resources.sections.rules.basicRules.content', { returnObjects: true })
    },
    {
      title: t('resources.sections.rules.pieceMovements.title'),
      content: t('resources.sections.rules.pieceMovements.content', { returnObjects: true })
    },
    {
      title: t('resources.sections.rules.specialMoves.title'),
      content: t('resources.sections.rules.specialMoves.content', { returnObjects: true })
    }
  ];

  const tournamentSchedule = [
    {
      title: t('resources.sections.tournaments.weeklyMeetings.title'),
      time: t('resources.sections.tournaments.weeklyMeetings.time'),
      timeDetail: t('resources.sections.tournaments.weeklyMeetings.timeDetail'),
      location: t('resources.sections.tournaments.weeklyMeetings.location'),
      description: t('resources.sections.tournaments.weeklyMeetings.description')
    },
    {
      title: t('resources.sections.tournaments.monthlyRapid.title'),
      time: t('resources.sections.tournaments.monthlyRapid.time'),
      timeDetail: t('resources.sections.tournaments.monthlyRapid.timeDetail'),
      location: t('resources.sections.tournaments.monthlyRapid.location'),
      description: t('resources.sections.tournaments.monthlyRapid.description')
    },
    {
      title: t('resources.sections.tournaments.universityChampionship.title'),
      time: t('resources.sections.tournaments.universityChampionship.time'),
      timeDetail: t('resources.sections.tournaments.universityChampionship.timeDetail'),
      location: t('resources.sections.tournaments.universityChampionship.location'),
      description: t('resources.sections.tournaments.universityChampionship.description')
    },
    {
      title: t('resources.sections.tournaments.summerOpen.title'),
      time: t('resources.sections.tournaments.summerOpen.time'),
      timeDetail: t('resources.sections.tournaments.summerOpen.timeDetail'),
      location: t('resources.sections.tournaments.summerOpen.location'),
      description: t('resources.sections.tournaments.summerOpen.description')
    }
  ];

  const trainingMaterials = [
    {
      title: t('resources.sections.training.openingPrinciples.title'),
      type: t('resources.sections.training.openingPrinciples.type'),
      size: t('resources.sections.training.openingPrinciples.size'),
      description: t('resources.sections.training.openingPrinciples.description'),
      downloadUrl: "#"
    },
    {
      title: t('resources.sections.training.tacticalPuzzles.title'),
      type: t('resources.sections.training.tacticalPuzzles.type'),
      size: t('resources.sections.training.tacticalPuzzles.size'),
      description: t('resources.sections.training.tacticalPuzzles.description'),
      downloadUrl: "#"
    },
    {
      title: t('resources.sections.training.endgameFundamentals.title'),
      type: t('resources.sections.training.endgameFundamentals.type'),
      size: t('resources.sections.training.endgameFundamentals.size'),
      description: t('resources.sections.training.endgameFundamentals.description'),
      downloadUrl: "#"
    },
    {
      title: t('resources.sections.training.strategicPlanning.title'),
      type: t('resources.sections.training.strategicPlanning.type'),
      size: t('resources.sections.training.strategicPlanning.size'),
      description: t('resources.sections.training.strategicPlanning.description'),
      downloadUrl: "#"
    },
    {
      title: t('resources.sections.training.notationTutorial.title'),
      type: t('resources.sections.training.notationTutorial.type'),
      size: t('resources.sections.training.notationTutorial.size'),
      description: t('resources.sections.training.notationTutorial.description'),
      downloadUrl: "#"
    }
  ];

  const chessLiterature = [
    {
      title: t('resources.sections.literature.mySystem.title'),
      author: t('resources.sections.literature.mySystem.author'),
      year: t('resources.sections.literature.mySystem.year'),
      description: t('resources.sections.literature.mySystem.description'),
      category: t('resources.sections.literature.mySystem.category')
    },
    {
      title: t('resources.sections.literature.thinkLikeGrandmaster.title'),
      author: t('resources.sections.literature.thinkLikeGrandmaster.author'),
      year: t('resources.sections.literature.thinkLikeGrandmaster.year'),
      description: t('resources.sections.literature.thinkLikeGrandmaster.description'),
      category: t('resources.sections.literature.thinkLikeGrandmaster.category')
    },
    {
      title: t('resources.sections.literature.zurichTournament.title'),
      author: t('resources.sections.literature.zurichTournament.author'),
      year: t('resources.sections.literature.zurichTournament.year'),
      description: t('resources.sections.literature.zurichTournament.description'),
      category: t('resources.sections.literature.zurichTournament.category')
    },
    {
      title: t('resources.sections.literature.artOfAttack.title'),
      author: t('resources.sections.literature.artOfAttack.author'),
      year: t('resources.sections.literature.artOfAttack.year'),
      description: t('resources.sections.literature.artOfAttack.description'),
      category: t('resources.sections.literature.artOfAttack.category')
    },
    {
      title: t('resources.sections.literature.positionalPlay.title'),
      author: t('resources.sections.literature.positionalPlay.author'),
      year: t('resources.sections.literature.positionalPlay.year'),
      description: t('resources.sections.literature.positionalPlay.description'),
      category: t('resources.sections.literature.positionalPlay.category')
    },
    {
      title: t('resources.sections.literature.talLifeAndGames.title'),
      author: t('resources.sections.literature.talLifeAndGames.author'),
      year: t('resources.sections.literature.talLifeAndGames.year'),
      description: t('resources.sections.literature.talLifeAndGames.description'),
      category: t('resources.sections.literature.talLifeAndGames.category')
    }
  ];

  return (
    <div className="resources-page">
      <div className="container">
        {/* Header */}
        <div className="resources-header">
          <h1>{t('resources.title')}</h1>
          <p>{t('resources.subtitle')}</p>
        </div>

        {/* Chess Rules Section */}
        <section className="resource-section">
          <div className="section-header" onClick={() => toggleSection('rules')}>
            <div className="section-title">
              <FaChess className="section-icon" />
              <h2>{t('resources.sections.rules.title')}</h2>
            </div>
            {expandedSections.rules ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          
          {expandedSections.rules && (
            <div className="section-content">
              <div className="rules-grid">
                {chessRules.map((rule, index) => (
                  <div key={index} className="rule-card">
                    <h3>{rule.title}</h3>
                    <ul>
                      {rule.content.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Tournament Schedule Section */}
        <section className="resource-section">
          <div className="section-header" onClick={() => toggleSection('schedule')}>
            <div className="section-title">
              <FaCalendar className="section-icon" />
              <h2>{t('resources.sections.tournaments.title')}</h2>
            </div>
            {expandedSections.schedule ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          
          {expandedSections.schedule && (
            <div className="section-content">
              <div className="schedule-grid">
                {tournamentSchedule.map((event, index) => (
                  <div key={index} className="event-card">
                    <div className="event-header">
                      <h3>{event.title}</h3>
                      <span className="event-time">{event.time}</span>
                    </div>
                    <div className="event-details">
                      <p><strong>{t('resources.time')}:</strong> {event.timeDetail}</p>
                      <p><strong>{t('resources.location')}:</strong> {event.location}</p>
                      <p>{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Training Materials Section */}
        <section className="resource-section">
          <div className="section-header" onClick={() => toggleSection('training')}>
            <div className="section-title">
              <FaGraduationCap className="section-icon" />
              <h2>{t('resources.sections.training.title')}</h2>
            </div>
            {expandedSections.training ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          
          {expandedSections.training && (
            <div className="section-content">
              <div className="materials-grid">
                {trainingMaterials.map((material, index) => (
                  <div key={index} className="material-card">
                    <div className="material-header">
                      <h3>{material.title}</h3>
                      <div className="material-meta">
                        <span className="material-type">{material.type}</span>
                        <span className="material-size">{material.size}</span>
                      </div>
                    </div>
                    <p className="material-description">{material.description}</p>
                    <div className="material-actions">
                      <button className="btn btn-primary">
                        <FaDownload /> {t('resources.download')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Chess Literature Section */}
        <section className="resource-section">
          <div className="section-header" onClick={() => toggleSection('literature')}>
            <div className="section-title">
              <FaBook className="section-icon" />
              <h2>{t('resources.sections.literature.title')}</h2>
            </div>
            {expandedSections.literature ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          
          {expandedSections.literature && (
            <div className="section-content">
              <div className="literature-grid">
                {chessLiterature.map((book, index) => (
                  <div key={index} className="book-card">
                    <div className="book-header">
                      <h3>{book.title}</h3>
                      <span className="book-category">{book.category}</span>
                    </div>
                    <div className="book-details">
                      <p><strong>{t('resources.author')}:</strong> {book.author}</p>
                      <p><strong>{t('resources.year')}:</strong> {book.year}</p>
                      <p className="book-description">{book.description}</p>
                    </div>
                    <div className="book-actions">
                      <button className="btn btn-secondary">
                        <FaExternalLinkAlt /> {t('resources.view')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Additional Resources */}
        <section className="additional-resources">
          <h2>Additional Resources</h2>
          <div className="external-links">
            <a href="https://lichess.org" target="_blank" rel="noopener noreferrer" className="external-link">
              <FaExternalLinkAlt />
              Lichess - Free Online Chess
            </a>
            <a href="https://chess.com" target="_blank" rel="noopener noreferrer" className="external-link">
              <FaExternalLinkAlt />
              Chess.com - Online Chess Platform
            </a>
            <a href="https://fide.com" target="_blank" rel="noopener noreferrer" className="external-link">
              <FaExternalLinkAlt />
              FIDE - World Chess Federation
            </a>
            <a href="https://chess24.com" target="_blank" rel="noopener noreferrer" className="external-link">
              <FaExternalLinkAlt />
              Chess24 - Chess News & Analysis
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resources; 