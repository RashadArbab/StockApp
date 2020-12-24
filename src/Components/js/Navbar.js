import '../css/Navbar.css';
import 'bootstrap/dist/js/bootstrap.bundle';

function Navbar() {
  return (

    <nav class="navbar navbar-expand-lg" id="navbar" >


      <button class="navbar-toggler btn btn-primary" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="true" aria-label="Toggle navigation">

        <span class="navbar-toggler-icon">Button</span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="/Watchlist">Home</a>
          </li>

        </ul>
      </div>

    </nav>





  );
} export default Navbar; 