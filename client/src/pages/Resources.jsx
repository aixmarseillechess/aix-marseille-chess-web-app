import React, { useState } from 'react';
import { FaChess, FaCalendar, FaBook, FaGraduationCap, FaDownload, FaExternalLinkAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './Resources.css';

const Resources = () => {
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
      title: "Basic Rules",
      content: [
        "The game is played on an 8x8 square board with alternating light and dark squares.",
        "Each player starts with 16 pieces: 1 king, 1 queen, 2 rooks, 2 bishops, 2 knights, and 8 pawns.",
        "White always moves first.",
        "The goal is to checkmate the opponent's king.",
        "A king is in check when it is under attack and must move to safety."
      ]
    },
    {
      title: "Piece Movements",
      content: [
        "King: Moves one square in any direction",
        "Queen: Moves any number of squares in any direction",
        "Rook: Moves any number of squares horizontally or vertically",
        "Bishop: Moves any number of squares diagonally",
        "Knight: Moves in an L-shape (2 squares in one direction, then 1 square perpendicular)",
        "Pawn: Moves forward one square, captures diagonally"
      ]
    },
    {
      title: "Special Moves",
      content: [
        "Castling: King and rook move together for king safety",
        "En passant: Pawn captures opponent's pawn that just moved two squares",
        "Pawn promotion: Pawn reaches the opposite end and becomes any piece"
      ]
    }
  ];

  const tournamentSchedule = [
    {
      title: "Weekly Club Meetings",
      time: "Tuesdays & Thursdays",
      timeDetail: "18:00 - 21:00",
      location: "Campus Saint-Charles, Room 201",
      description: "Casual games, strategy discussions, and friendly matches."
    },
    {
      title: "Monthly Rapid Tournament",
      time: "First Saturday of each month",
      timeDetail: "14:00 - 18:00",
      location: "Campus Saint-Charles, Main Hall",
      description: "15+5 time control, prizes for top 3 players."
    },
    {
      title: "University Championship",
      time: "March 15-20, 2024",
      timeDetail: "Daily 19:00 - 22:00",
      location: "Campus Saint-Charles, Auditorium",
      description: "Annual championship with qualification rounds."
    },
    {
      title: "Summer Open Tournament",
      time: "July 10-12, 2024",
      timeDetail: "10:00 - 18:00 daily",
      location: "Campus Saint-Charles, Conference Center",
      description: "Open to all university students and staff."
    }
  ];

  const trainingMaterials = [
    {
      title: "Opening Principles",
      type: "PDF",
      size: "2.3 MB",
      description: "Essential opening principles and common openings for beginners.",
      downloadUrl: "#"
    },
    {
      title: "Tactical Puzzles Collection",
      type: "PDF",
      size: "4.1 MB",
      description: "500 tactical puzzles ranging from beginner to advanced level.",
      downloadUrl: "#"
    },
    {
      title: "Endgame Fundamentals",
      type: "PDF",
      size: "3.7 MB",
      description: "Basic endgame techniques and winning strategies.",
      downloadUrl: "#"
    },
    {
      title: "Strategic Planning Guide",
      type: "PDF",
      size: "5.2 MB",
      description: "How to develop long-term plans and evaluate positions.",
      downloadUrl: "#"
    },
    {
      title: "Chess Notation Tutorial",
      type: "Video",
      size: "15 min",
      description: "Learn algebraic notation to record and analyze games.",
      downloadUrl: "#"
    }
  ];

  const chessLiterature = [
    {
      title: "My System",
      author: "Aron Nimzowitsch",
      year: "1925",
      description: "Classic work on chess strategy and positional play.",
      category: "Strategy"
    },
    {
      title: "Think Like a Grandmaster",
      author: "Alexander Kotov",
      year: "1971",
      description: "Insights into the thinking process of strong players.",
      category: "Psychology"
    },
    {
      title: "Zurich International Chess Tournament 1953",
      author: "David Bronstein",
      year: "1956",
      description: "Famous tournament book with detailed analysis.",
      category: "Tournament"
    },
    {
      title: "The Art of Attack in Chess",
      author: "Vladimir Vuković",
      year: "1965",
      description: "Comprehensive guide to attacking play.",
      category: "Tactics"
    },
    {
      title: "Positional Play",
      author: "Mikhail Botvinnik",
      year: "1973",
      description: "Lessons from the former World Champion.",
      category: "Strategy"
    },
    {
      title: "The Life and Games of Mikhail Tal",
      author: "Mikhail Tal",
      year: "1976",
      description: "Autobiography with annotated games.",
      category: "Biography"
    }
  ];

  return (
    <div className="resources-page">
      <div className="container">
        {/* Header */}
        <div className="resources-header">
          <h1>Chess Resources</h1>
          <p>Everything you need to improve your chess game and stay connected with the community</p>
        </div>

        {/* Chess Rules Section */}
        <section className="resource-section">
          <div className="section-header" onClick={() => toggleSection('rules')}>
            <div className="section-title">
              <FaChess className="section-icon" />
              <h2>Chess Rules & Fundamentals</h2>
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
              <h2>Tournament Schedule</h2>
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
                      <p><strong>Time:</strong> {event.timeDetail}</p>
                      <p><strong>Location:</strong> {event.location}</p>
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
              <h2>Training Materials</h2>
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
                      <span className="material-type">{material.type}</span>
                    </div>
                    <p className="material-description">{material.description}</p>
                    <div className="material-footer">
                      <span className="material-size">{material.size}</span>
                      <button className="btn btn-primary btn-sm">
                        <FaDownload />
                        Download
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
              <h2>Chess Literature</h2>
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
                    <p className="book-author">by {book.author} ({book.year})</p>
                    <p className="book-description">{book.description}</p>
                    <button className="btn btn-secondary btn-sm">
                      <FaExternalLinkAlt />
                      Learn More
                    </button>
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