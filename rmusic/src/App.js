
import { useState } from 'react';
import './App.css';

function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [tracks, setTracks] = useState([]);
  const getTracks = async () => {
    setIsLoading(true);
    let data = await fetch(`https://v1.nocodeapi.com/rudrans24/spotify/oCUiXpvgsYfFIxAJ/search?q= ${ keyword === "" ? "arijit singh":keyword} &type=track`);
    let convertedData = await data.json();
    console.log(convertedData.tracks.items);
    setTracks(convertedData.tracks.items);
    setIsLoading(false);
  }

  return (
    <>
    <nav className="navbar navbar-dark bg-dark">
      <div className="d-flex p-3 w-100">
        <a href='/' className="navbar-brand w-25 "><strong>r-music</strong></a>
        <input
          value={keyword}
          onChange={(event)=>{
            setKeyword(event.target.value)
          }}
          className="form-control me-2 w-50"
          type="search"
          placeholder="Search artist, song, album to view results.."
          aria-label="Search"
        />
        <button onClick={getTracks} className="btn btn-outline-success">
          Search
        </button>
      </div>
    </nav>

    <div className='container'>
      <div className='row'>
          {tracks.map((element) => {
            return (
              <div key={element.id} className='col-lg-3 col-md-6 py-2'>
                <div className="card">
                  <img src={element.album.images[0].url} className="card-img-top" alt="" />
                  <div className="card-body">
                    <h5 className="card-title">{element.album.name}</h5>
                    <p className="card-text">
                      Artist: {element.album.artists[0].name}
                    </p>
                    <p className="card-text">
                      Release Date: {element.album.release_date}
                    </p>
                    <audio src={element.preview_url} controls className='w-100'></audio>
                  </div>
                </div>
              </div>
            )
          })}
      </div>

      <div className={`row ${isLoading ? "":"d-none"}`}>
        <div className='col-12 py-5 text-center'>
          <div className="spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
