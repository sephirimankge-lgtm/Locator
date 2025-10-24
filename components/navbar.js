class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .logo {
          color: white;
          font-weight: bold;
          font-size: 1.25rem;
          display: flex;
          align-items: center;
        }
        .logo i {
          margin-right: 0.5rem;
        }
        ul {
          display: flex;
          gap: 1.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        a {
          color: white;
          text-decoration: none;
          transition: opacity 0.2s;
          font-weight: 500;
          display: flex;
          align-items: center;
        }
        a:hover {
          opacity: 0.8;
        }
        a i {
          margin-right: 0.25rem;
        }
        @media (max-width: 640px) {
          nav {
            padding: 1rem;
            flex-direction: column;
            gap: 1rem;
          }
          ul {
            gap: 1rem;
          }
        }
      </style>
      <nav>
        <div class="logo">
          <i data-feather="map"></i>
          <span>WhereAmI?</span>
        </div>
        <ul>
          <li><a href="#"><i data-feather="home"></i> Home</a></li>
          <li><a href="#"><i data-feather="info"></i> About</a></li>
          <li><a href="#"><i data-feather="help-circle"></i> Help</a></li>
        </ul>
      </nav>
    `;
  }
}
customElements.define('custom-navbar', CustomNavbar);
