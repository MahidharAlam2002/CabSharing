import './Tabletest.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar } from '@fortawesome/free-solid-svg-icons'
import 'font-awesome/css/font-awesome.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { faChevronUp,faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Collapse } from "react-bootstrap";
import moment from 'moment-timezone';
import { Table, Button } from 'react-bootstrap';

const TableTest=(props)=>{
    const [open, setOpen] = useState(false);
    
  const handleClick = () => {
    setOpen(!open);
  };
  // console.log(props);
    return (
        <div className="section2">
        <div className="tpd-plan">
          <div className="tp-flight-plan">
                <div className="container-fluid" >
                  <div className="crop depart" >
                      <div className="context collapsed" data-toggle="collapse" data-target="#demo2">
                        { props.showStatus && <button data-testid="btnTableTestUpDown" className="tog-cal itin-det-btn" onClick={handleClick}>
                            <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
                                  </button>}
                        <div className="item it-1" onClick={handleClick} data-testid="divRowData">
                          <label className="trip-type depart">Departure</label>
                          <div className="route-dot">
                              <span className="point" style={{ "--data-left": "35%" }}></span>
                              <span className="point" style={{ "--data-left": "65%" }}></span>
                          </div>
                          <div className="airline-image" >
                              <span className="img-wrapper">
                                  <svg className="anime-airplane">
                                    <FontAwesomeIcon icon={faCar} />
                                  </svg>
                                  {props.showStatus && <span className="top-label has-stops">{JSON.parse(props.row.listofpassengers).filter(item=>Object.keys(item).length>0).length}  Persons </span>}
                              </span>
                          </div>
                          <div className="port-seg">
                              <div className="flight-seg origin">
                                  <div className="time">{moment.utc(props.row.date).tz('Asia/Kolkata').format('ddd, D MMMM YYYY')}</div>
                                  <div className="port">IST</div>
                                  <div className="name">{props.row.start_place}</div>
                              </div>
                              <div className="flight-seg destination">
                                  <div className="time">{moment.utc(props.row.time).tz('Asia/Kolkata').format('hh:mm:ss A')}</div>
                                  <div className="port">IST</div>
                                  <div className="name">{props.row.end_place}</div>
                              </div>
                          </div>
                        </div>
                        {props.showStatus &&  <div className="item it-2">
                            <div className="dr-row">
                              <Button data-testid="btnJoinTabletest" onClick={()=>props.handleStatusClick(props.index)}  variant={props.row.status === 'Unjoin' ? 'danger' : 'success'}>{props.row.status}</Button>
                            </div>
                            <div className="take-tim">{moment.utc(props.row.date).tz('Asia/Kolkata').format('ddd, D MMMM YYYY')}</div>
                        </div>}
                      </div>
                      <Collapse in={open}>
                        <div id="demo2" className="fly-wrap collapse">
                            <div>
                            { props.showStatus && <Table data-testid="TablePassengersTestTable" striped bordered hover >
                                <thead>
                                  <tr>
                                    <th>S.No</th>
                                    <th>Name</th>
                                    <th>Ph.No</th>
                                  </tr>
                                </thead>
                                <tbody >
                                  {JSON.parse(props.row.listofpassengers).filter(item => !Array.isArray(item) || item.length !== 0).map((passenger,index)=>(
                                    
                                    <tr key={index+1} data-testid='listpassTableTest'>
                                      <td>{index+1}</td>
                                      <td>{passenger.name}</td>
                                      <td>{passenger.phone_number}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table> }
                            </div>


                            <div className="arrival-info">
                                <span className="sub-span">
                                    <strong>Arrives:</strong>
                                    {moment.utc(props.row.date).tz('Asia/Kolkata').format('ddd, D MMMM YYYY')}
                                </span>    
                            </div>
                        </div>
                      </Collapse>
                    </div>
                  </div>
            ` </div>
                                                                
        </div>
        
          <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" display="none">
          <symbol  id="airplane" viewBox="243.5 245.183 25 21.633">
            <g>
              <path d="M251.966,266.816h1.242l6.11-8.784l5.711,0.2c2.995-0.102,3.472-2.027,3.472-2.308
                                      c0-0.281-0.63-2.184-3.472-2.157l-5.711,0.2l-6.11-8.785h-1.242l1.67,8.983l-6.535,0.229l-2.281-3.28h-0.561v3.566
                                      c-0.437,0.257-0.738,0.724-0.757,1.266c-0.02,0.583,0.288,1.101,0.757,1.376v3.563h0.561l2.281-3.279l6.535,0.229L251.966,266.816z
                                      "/>
            </g>
          </symbol>
        </svg>
        </div>
    )
}
export default TableTest;