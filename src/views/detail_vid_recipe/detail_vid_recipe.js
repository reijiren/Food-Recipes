import React from "react";

import { Link } from "react-router-dom";

const detVidRec = () => {
    return(
        <div className="container-fluid">
            <nav className="navbar">
                <div className="main-menu full">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/addrecipe" className="currentPage">Add Recipe</Link>
                        </li>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="yellow-line absolut">
                <div className="video-section">
                    <div className="this-vid-section">
                        <embed src="https://youtube.com/embed/uNT_AxXrUGs" className="this-vid"></embed>
                        <h2>Beef Steak with Curry Sauce - [Step 4] <br/>Cut the condiment and then mix it</h2>
                        <p>3 month ago</p>
                    </div>
                    <div className="next-vid-section">
                        <h5>Next</h5>
                        <div className="next-step">
                            <div className="next-step1-img rounded-2">
                                <p>[step 5]</p>
                            </div>
                            <div className="next-step1-title">
                                <h6>Beef Steak with Curry Sauce - [Step 5]<br/>Saute condiments together until turn brown</h6>
                                <p>HanaLohana - 3 month ago</p>
                            </div>
                        </div>
                        <div className="next-step">
                            <div className="next-step2-img rounded-2">
                                <p>[step 6]</p>
                            </div>
                            <div className="next-step2-title">
                                <h6>Beef Steak with Curry Sauce - [Step 6]<br/>Roast beef until it’s medium rare</h6>
                                <p>HanaLohana - 3 month ago</p>
                            </div>
                        </div>
                        <div className="next-step">
                            <div className="next-step2-img rounded-2">
                                <p>[step 6]</p>
                            </div>
                            <div className="next-step2-title">
                                <h6>Beef Steak with Curry Sauce - [Step 7]<br/>Roast beef until it’s medium rare</h6>
                                <p>HanaLohana - 3 month ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default detVidRec;