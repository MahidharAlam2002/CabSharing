import './JoinDialoguebox.css';
import './../../../node_modules/material-design-iconic-font/dist/css/material-design-iconic-font.min.css';
import moment from 'moment-timezone';
import Logo from '../Logo';
function JoinDialoguebox(props) {
    const profileDetails=props.profileDetails;
    const row=props.row;
    const index=props.index;
    const status=props.status;
    // const cancelButton=props.cancelButton;
    return (
        <div className="wrapjoin" data-pos="0">
            <div className="headbar">
                <i className="fa-solid fa-handshake"></i> <span style={{marginLeft: '10px', marginRight: '10px'}}> {status==='Join' ? 'Joining' : 'Unjoining'} a Schedule  </span><i className="fa-solid fa-handshake"></i> 
                <i className="closeicon zmdi zmdi-close zmdi-hc-lg" onClick={()=>props.cancelButton(index)}></i>
            </div>
            <div className="headerjoin">
                {/* <div className="bg"></div> */}
                {/* <div className="filter"></div> */}
                {/* <div className="title">
                    <div className="fromPlace">
                        <span>D</span><span>U</span><span>B</span>
                    </div>
                    <span className="separator"><i className="zmdi zmdi-airplane"></i></span>
                    <div className="toPlace">
                        <span>M</span><span>R</span><span>S</span>
                    </div>
                </div> */}
                {/* <div className="map"></div> */}
                <div>
                    <Logo></Logo>
                </div>
            </div>

            <div className="contentjoin">
                <section>
                    <div className="formjoin">
                        <div className="controljoin select">
                            <div className="controljoin-head">
                                <i className="zmdi zmdi-account-circle"></i>
                                <span className="close"><i className="zmdi zmdi-close"></i></span>
                                <div>
                                    <h6>Name</h6>
                                    <span className="airport-name" data-role="from">{profileDetails.name}</span>
                                </div>			
                            </div>
                            {/* <div className="controljoin-body">
                                <ul className="select-index"></ul>
                                <div className="nano">
                                    <div className="nano-contentjoin">
                                        <ul className="select-data"></ul>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className="controljoin select">
                            <div className="controljoin-head">
                                <i className="zmdi zmdi-phone"></i>
                                <span className="close"><i className="zmdi zmdi-close"></i></span>
                                <div>
                                    <h6>Phone Number</h6>
                                    <span className="airport-name" data-role="from">{profileDetails.phone}</span>
                                </div>			
                            </div>
                            {/* <div className="controljoin-body">
                                <ul className="select-index"></ul>
                                <div className="nano">
                                    <div className="nano-contentjoin">
                                        <ul className="select-data"></ul>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className="controljoin select">
                            <div className="controljoin-head">
                                <i className="zmdi zmdi-pin"></i>
                                <span className="close"><i className="zmdi zmdi-close"></i></span>
                                <div>
                                    <h6>From</h6>
                                    <span className="airport-name" data-role="from">{row.start_place}</span>
                                </div>			
                            </div>
                            {/* <div className="controljoin-body">
                                <ul className="select-index"></ul>
                                <div className="nano">
                                    <div className="nano-contentjoin">
                                        <ul className="select-data"></ul>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className="controljoin select">
                            <div className="controljoin-head">
                                <i className="zmdi zmdi-pin"></i>
                                <span className="close"><i className="zmdi zmdi-close"></i></span>
                                <div>
                                    <h6>To</h6>
                                    <span className="airport-name" data-role="to">{row.end_place}</span>
                                </div>			
                            </div>
                            {/* <div className="controljoin-body">
                                <ul className="select-index"></ul>
                                <div className="nano">
                                    <div className="nano-contentjoin">
                                        <ul className="select-data"></ul>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className="controljoin dateinput">
                            <div className="controljoin-head">
                                <i className="zmdi zmdi-calendar"></i>
                                <span className="close"><i className="zmdi zmdi-close"></i></span>
                                <div className="controljoin-item">
                                    <h6>Depar</h6>
                                    <span>{moment.utc(row.date).tz('Asia/Kolkata').format('ddd, D MMMM YYYY')}</span> <span>{moment.utc(props.row.time).tz('Asia/Kolkata').format('hh:mm:ss A')}</span>
                                </div>
                                {/* <div className="controljoin-item">
                                    <h6>Return</h6>
                                    <span>One Way</span> 
                                    
                                </div> */}
                            </div>
                            {/* <div className="controljoin-body">
                                <div className="info-message">
                                    <i className="zmdi zmdi-info"></i>
                                    
                                    <span>By the moment theres only One Way tickets, thanks.</span>
                                </div>
                                <div className="calendar">
                                    <div className="month">
                                        <i className="zmdi zmdi-chevron-left"></i>
                                        <span>May</span>
                                        <i className="zmdi zmdi-chevron-right"></i>
                                    </div>
                                    <div className="week">
                                        <span>S</span>
                                        <span>M</span>
                                        <span>T</span>
                                        <span>W</span>
                                        <span>T</span>
                                        <span>F</span>
                                        <span>S</span>
                                    </div>
                                    <div className="days"></div>
                                </div>
                            </div> */}
                        </div>
                        
                        {/* <div className="controljoin radio passengers">
                            <i className="zmdi zmdi-accounts"></i>
                            <div className="controljoin-item">
                                <h6>Passengers</h6>
                                <label>
                                    <input type="radio" name="passengers" value="0" checked="checked"/>
                                    <div><span>1</span>&times;<i className="zmdi zmdi-male-alt"></i><small>Adults</small></div>
                                </label>
                                <label>
                                    <input type="radio" name="passengers" value="1"/>
                                    <div><span>0</span>&times;<i className="zmdi zmdi-face"></i><small>Kids</small></div>
                                </label>
                                <label>
                                    <input type="radio" name="passengers" value="2"/>
                                    <div><span>0</span>&times;<i className="zmdi zmdi-walk"></i><small>Elders</small></div>
                                </label>
                            </div>
                            <section className="spinner">
                                <button data-action="plus"><i className="zmdi zmdi-plus"></i></button>
                                <button data-action="minus"><i className="zmdi zmdi-minus"></i></button>
                            </section>
                        </div> */}
                        {/* <div className="controljoin radio">
                            <i className="zmdi zmdi-airline-seat-recline-extra"></i>
                            <div className="controljoin-item">
                                <h6 style={{marginBottom: '8px'}}>className</h6>
                                <label>
                                    <input type="radio" name="seat" value="Economy" checked="checked"/>
                                    <span>Economy</span>
                                </label>
                                <label>
                                    <input type="radio" name="seat" value="Business"/>
                                    <span>Business</span>
                                </label>
                                <label>
                                    <input type="radio" name="seat" value="First className"/>
                                    <span>First className</span>
                                </label>
                            </div>
                        </div> */}
                        <div className="controljoin">
                            <button type='button' style={{color: '#1C1D21'}}  onClick={()=>props.confirmButton(status, index)}><strong>Confirm</strong></button>
                        </div>

                    </div>
                    {/* <div className="list">
                        <div className="nano">
                            <div className="nano-contentjoin">
                                            
                            </div>
                        </div>					
                    </div>
                    
                    <div className="ticket">
                        <section>
                            
                        </section>
                        <button className="btnBook">BOOK FLIGHT</button>
                        
                        <div className="loader">Loading...</div>
                    </div> */}

                </section>
            </div>		
        </div>
    );
}

export default JoinDialoguebox;