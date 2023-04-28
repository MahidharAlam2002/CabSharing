import './JoinDialoguebox.css';
import './../../../node_modules/material-design-iconic-font/dist/css/material-design-iconic-font.min.css';
import moment from 'moment-timezone';
import Logo from '../Logo';
function JoinDialoguebox(props) {
    const profileDetails=props.profileDetails;
    const row=props.row;
    const index=props.index;
    const status=props.status;
    
    return (
        <div className="wrapjoin" data-pos="0">
            <div className="headbar">
                <i className="fa-solid fa-handshake"></i> <span style={{marginLeft: '10px', marginRight: '10px'}}> {status==='Join' ? 'Joining' : 'Unjoining'} a Schedule  </span><i className="fa-solid fa-handshake"></i> 
                <i className="closeicon zmdi zmdi-close zmdi-hc-lg" onClick={()=>props.cancelButton(index)}></i>
            </div>
            <div className="headerjoin">
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
                        </div>
                        <div className="controljoin dateinput">
                            <div className="controljoin-head">
                                <i className="zmdi zmdi-calendar"></i>
                                <span className="close"><i className="zmdi zmdi-close"></i></span>
                                <div className="controljoin-item">
                                    <h6>Depar</h6>
                                    <span>{moment.utc(row.date).tz('Asia/Kolkata').format('ddd, D MMMM YYYY')}</span> <span>{moment.utc(props.row.time).tz('Asia/Kolkata').format('hh:mm:ss A')}</span>
                                </div>
                            </div>
                        </div>
                        <div className="controljoin">
                            <button type='button' style={{color: '#1C1D21'}}  onClick={()=>props.confirmButton(status, index)}><strong>Confirm</strong></button>
                        </div>

                    </div>
                </section>
            </div>		
        </div>
    );
}

export default JoinDialoguebox;