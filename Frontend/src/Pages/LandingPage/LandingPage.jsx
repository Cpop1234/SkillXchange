import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

const demoUsers = [
  { username: "alexa_mentor", name: "Alexa Rivera", skill: "React + UI Systems", availability: "Today, 7:30 PM" },
  { username: "milan_ai", name: "Milan Verma", skill: "Python + ML", availability: "Tomorrow, 9:00 AM" },
  { username: "chef_nova", name: "Nova Shah", skill: "Content + Storytelling", availability: "Today, 10:00 PM" },
];

const LandingPage = () => {
  return (
    <div className="landing-wrap">
      <section className="hero-block">
        <div className="orb orb-one" />
        <div className="orb orb-two" />
        <div className="orb orb-three" />

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-kicker">Collaborative Skill Network</p>
            <h1 className="hero-title">Trade Knowledge. Build Together.</h1>
            <p className="hero-subtitle">
              SkillXchange helps learners and mentors connect in real time through guided sessions, direct chats, and
              practical collaboration.
            </p>
            <a className="hero-cta" href="/discover">
              Explore Mentors
            </a>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="pulse-ring pulse-ring-a" />
            <div className="pulse-ring pulse-ring-b" />
            <div className="glass-card card-a">Web Development</div>
            <div className="glass-card card-b">Machine Learning</div>
            <div className="glass-card card-c">Design Systems</div>
          </div>
        </div>

        <div className="ticker">
          <div className="ticker-track">
            <span>LEARN</span>
            <span>MENTOR</span>
            <span>CONNECT</span>
            <span>BUILD</span>
            <span>LEARN</span>
            <span>MENTOR</span>
            <span>CONNECT</span>
            <span>BUILD</span>
          </div>
        </div>
      </section>

      <section id="why-skillxchange" className="why-block">
        <h2>Why SkillXchange</h2>
        <div className="why-grid">
          <article className="why-card">
            <h3>Learn From Real Practitioners</h3>
            <p>Get practical guidance from people actively solving real-world problems in their domain.</p>
          </article>
          <article className="why-card">
            <h3>Share What You Know</h3>
            <p>Teach your strengths, help others grow, and build credibility with ratings and feedback.</p>
          </article>
          <article className="why-card">
            <h3>Grow Through Community</h3>
            <p>Collaborate with peers, exchange ideas, and keep momentum through ongoing sessions.</p>
          </article>
        </div>
      </section>

      <section className="meet-block">
        <h2>Meet Available Users</h2>
        <p className="meet-subtitle">Quick sample list for instant session planning.</p>
        <div className="meet-grid">
          {demoUsers.map((person) => (
            <article key={person.username} className="meet-card">
              <h3>{person.name}</h3>
              <p className="meet-skill">{person.skill}</p>
              <p className="meet-time">Available: {person.availability}</p>
              <div className="meet-actions">
                <Link className="meet-btn" to={`/profile/${person.username}`}>
                  View Profile
                </Link>
                <Link
                  className="meet-btn meet-btn-alt"
                  to={`/chats?meetNow=1&username=${encodeURIComponent(person.username)}&name=${encodeURIComponent(
                    person.name
                  )}`}
                >
                  Meet Now
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
