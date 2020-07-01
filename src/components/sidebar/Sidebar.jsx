import React, { useState, useEffect } from "react";
import api from "../../Api";
import { Link } from "react-router-dom";

function Sidebar(props) {
  const [topStream, setTopStream] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(" https://api.twitch.tv/helix/streams");

      let dataArray = result.data.data;

      let gameIDs = dataArray.map((stream) => {
        return stream.game_id;
      });
      let userIDs = dataArray.map((stream) => {
        return stream.user_id;
      });
      //console.log('game : ', gameIDs, "user : ", userIDs);

      // Creation des urls personnalisées

      let baseUrlGames = "https://api.twitch.tv/helix/games?";
      let baseUrlUsers = "https://api.twitch.tv/helix/users?";

      let queryParamsGame = "";
      let QueryParamsUser = "";

      gameIDs.map((id) => {
        return (queryParamsGame = `${queryParamsGame}id=${id}&`);
      });
      userIDs.map((id) => {
        return (QueryParamsUser = QueryParamsUser + `id=${id}&`);
      });

      // URL final

      let urlFinalGames = baseUrlGames + queryParamsGame;
      let urlFinalUsers = baseUrlUsers + QueryParamsUser;

      //APPEL
      let gamesNames = await api.get(urlFinalGames);
      let getUsers = await api.get(urlFinalUsers);

      let gamesNameArray = gamesNames.data.data;
      let arrayUsers = getUsers.data.data;

      //CREATION DU TABLEAU FINAL
      let finalArray = dataArray.map((stream) => {
        stream.gameName = "";
        stream.truePic = "";
        stream.login = "";

        gamesNameArray.forEach((name) => {
          arrayUsers.forEach((user) => {
            if (stream.user_id === user.id && stream.game_id === name.id) {
              stream.truePic = user.profile_image_url;
              stream.gameName = name.name;
              stream.login = user.login;
            }
          });
        });
        return stream;
      });
      setTopStream(finalArray.slice(0, 6));
    };

    fetchData();
  }, []);

  return (
    <div className="sidebar">
      <h2 className="titreSidebar">Chaînes recommandées</h2>
      <ul className="listeStream">
        {topStream.map((stream, index) => (
          <Link
          key={index}
            className="lien"
            to={{
              pathname: `/live/${stream.login}`,
            }}
          >
            <li key={index} className="containerFlexSidebar">
              <img
                src={stream.truePic}
                alt={stream.user_name}
                className="profilePicRonde"
              />
              <div className="streamUser">{stream.user_name}</div>
              <div className="viewerRight">
                <div className="pointRouge"> </div>
                <div>{stream.viewer_count}</div>
              </div>
              <div className="gameNameSidebar">{stream.gameName}</div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
