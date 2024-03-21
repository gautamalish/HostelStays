import hostel from "../images/hostel.jpg"
export default function FrontPage(){
    return(
        <div className="frontPageContainer">
        <div className="logo">
            <img src={hostel} alt="hostel" className="logoImg"/>
            <div className="title">
                <h1>HostelStays</h1>
                <p>Kathmandu,Nepal</p>
            </div>
        </div>
        <div className="nav">
            <ul className="navItems">
                <li>Home</li>
                <li>About Us</li>
                <li>Services</li>
                <li>Policy</li>
                <li>Contact Us</li>
            </ul>
        </div>
        </div>
    )
}