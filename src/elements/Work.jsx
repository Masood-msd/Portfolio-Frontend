import { Link } from "react-router-dom";
import { useAuth } from "../store/auth.jsx";
import "../styles/work.css";

export default function MyWork() {
  const { work } = useAuth();
  // console.log(work);

  return (
    <>
      <main className="work-page">
        <section className=" grid-three-cols">
          <div className="card-section">
            {work?.map((details) => (
              <div className="card" key={details._id}>
                <div className="card-image">
                  <img src={details.image} alt={details.title} />
                </div>

                <h3 className="card-title">{details.title}</h3>

                <p className="card-text">{details.description}</p>

                <div className="card-footer">
                  <a
                    className="card-link border-1 rounded-1"
                    href={details.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Github
                  </a>
                  <a
                    className="card-link"
                    href={details.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Website
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
