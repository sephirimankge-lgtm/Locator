class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background: #1a202c;
          color: white;
          padding: 2rem 1rem;
          text-align: center;
          margin-top: auto;
        }
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 1rem;
        }
        .footer-links a {
          color: #a0aec0;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-links a:hover {
          color: #ffffff;
        }
        .copyright {
          color: #718096;
          font-size: 0.875rem;
        }
        @media (max-width: 640px) {
          .footer-links {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      </style>
      <footer>
        <div class="footer-content">
          <div class="footer-links">
            <a href="#"><i data-feather="shield"></i> Privacy</a>
            <a href="#"><i data-feather="file-text"></i> Terms</a>
            <a href="#"><i data-feather="mail"></i> Contact</a>
          </div>
          <p class="copyright">&copy; ${new Date().getFullYear()} WhereAmI? Location Finder. All rights reserved.</p>
        </div>
      </footer>
    `;
  }
}
customElements.define('custom-footer', CustomFooter);
