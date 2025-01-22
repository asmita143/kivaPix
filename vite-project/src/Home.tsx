
import "./App.css";

const Home = () => {
    return (
      <div className="app-container">
        {/* Top Bar */}
        <header className="header">
          <div className="left-header">🌟 Dashboard</div>
          <div className="right-header">
            <input
              type="text"
              placeholder="Search"
              className="search-bar"
            />
            <div className="profile">
              <span className="notification">🔔</span>
              <span className="username">Tom Cook</span>
            </div>
          </div>
        </header>
  
        {/* Sidebar and Main Content */}
        <div className="layout">
          {/* Sidebar */}
          <aside className="sidebar">
  <div className="card">
    <img src="https://picsum.photos/200/150" alt="Gallery Item 1" />
    <div className="card-body">
      <h4 className="card-title">Beautiful Landscape</h4>
      <p className="card-description">A serene view of nature.</p>
    </div>
  </div>
  <div className="card">
    <img src="https://picsum.photos/200/150?grayscale" alt="Gallery Item 2" />
    <div className="card-body">
      <h4 className="card-title">City Lights</h4>
      <p className="card-description">A bustling city at night.</p>
    </div>
  </div>
  <div className="card">
    <img src="https://picsum.photos/200/150/?blur" alt="Gallery Item 3" />
    <div className="card-body">
      <h4 className="card-title">Calm Ocean</h4>
      <p className="card-description">Relaxing waves of the sea.</p>
    </div>
  </div>
</aside>

  
          {/* Main Content */}
          <main className="main-content">
            <h1>Welcome to the Dashboard</h1>
            <p>This is your main content area.</p>
          </main>
        </div>
      </div>
    );
  };
  
  export default Home;
  