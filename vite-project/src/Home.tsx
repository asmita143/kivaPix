import "./App.css";

const Home = () => {
  return (
    <div className="app-container">
      {/* Top Bar */}
      <header className="header">
        <div className="left-header">🌟 Dashboard</div>
        <div className="right-header">
          <input type="text" placeholder="Search" className="search-bar" />
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
          <div className="w-64 bg-white shadow-md">
            <div className="p-4">
              <h1 className="text-xl font-bold ">Events</h1>
              <input
                type="text"
                placeholder="Search Events"
                className="mt-4 p-2 w-full border rounded-md font"
              />
            </div>
            <nav className="mt-6">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer ">
                  Home
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Your Events
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Going
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Invites
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Interested
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Hosting
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Past Events
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Notifications
                </li>
              </ul>
            </nav>
            <button className="mt-6 mx-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              + Create New Event
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="sub-main-content">
            <div className="card">
              <img src="https://picsum.photos/200/150" alt="Gallery Item 1" />
              <div className="card-body">
                <h4 className="card-title">Beautiful Landscape</h4>
                <p className="card-description">A serene view of nature.</p>
              </div>
            </div>
            <div className="card">
              <img
                src="https://picsum.photos/200/150?grayscale"
                alt="Gallery Item 2"
              />
              <div className="card-body">
                <h4 className="card-title">City Lights</h4>
                <p className="card-description">A bustling city at night.</p>
              </div>
            </div>
            <div className="card">
              <img
                src="https://picsum.photos/200/150/?blur"
                alt="Gallery Item 3"
              />
              <div className="card-body">
                <h4 className="card-title">Calm Ocean</h4>
                <p className="card-description">Relaxing waves of the sea.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
