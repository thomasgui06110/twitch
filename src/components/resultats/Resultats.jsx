import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../Api";
import Erreur from "../erreur/Erreur";

function Resultats() {
  let { slug } = useParams();

  const [result, setResult] = useState(true);
  const [streamerInfo, setStreamerInfo] = useState([]);

  let cleanSearch = slug.replace(/ /g, "");

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        `https://api.twitch.tv/helix/users?login=${cleanSearch}`
      );
      console.log(result);
      if (result.data.data.length === 0) {
        setResult(false);
      } else {
        setStreamerInfo(result.data.data);
      }
    };
    fetchData();
  }, [cleanSearch]);
  console.log(streamerInfo);

  return ( 
      result ? (
    <div>
      <div className="containerDecaleResultats">
        <h4>Résultats de recherche</h4>
        {streamerInfo.map((stream, index) => (
          <div key={index} className="carteResultats">
            <img
              src={stream.profile_image_url}
              alt="body"
              className="imgCarte"
            />
            <div className="cardBodyResults">
              <h5 className="titreCarteStream">{stream.display_name}</h5>
              <div className="txtResult">{stream.description}</div>
              <Link
                to={{
                  pathname: `/live/${stream.login}`,
                }}
              >
                <div className="btnCarte btnResult">
                  Regarder {stream.display_name}
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Erreur />
  ))
}

export default Resultats;
