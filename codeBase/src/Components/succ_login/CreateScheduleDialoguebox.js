import React, {useState,useEffect } from 'react';
import './CreateScheduleDialoguebox.css';
import './../../../node_modules/material-design-iconic-font/dist/css/material-design-iconic-font.min.css';
import moment from 'moment-timezone';
import Dropdown from './Dropdown.js';
import Logo from '../Logo';
import axios from'axios';

function CreateScheduleDialoguebox(props) {
    const profileDetails=props.profileDetails;
    // const row=props.row;
    // const index=props.index;
    // const status=props.status;
    // const Valuelist=props.Valuelist;
    const options=props.options;
    const cancelButton=props.cancelButton;
    const [scheduleDetails, setscheduleDetails] = useState({
        startPlace: null,
        endPlace: null,
        date: '',
        time: ''
      });
	const [errormsg,seterrormsg]=useState('')
    const confirmButton=async()=>{
		
        // async function InsertData(){
			try{
				if(scheduleDetails.startPlace===null || scheduleDetails.endPlace===null || scheduleDetails.date==='' || scheduleDetails.time==='')
				{
					seterrormsg("*All the fields are mandatory");
					return;
				}
				// console.log(scheduleDetails.startPlace[0],scheduleDetails.endPlace[0],scheduleDetails.startPlace[0]===scheduleDetails.endPlace[0]);
				if(scheduleDetails.startPlace[0]===scheduleDetails.endPlace[0])
				{
					seterrormsg("*Start Place and End Place cannot be same ");
					return;
				}
            const res= await axios.get('/createschedule',{params:scheduleDetails});
            // const res2= await axios.get('/createschedule2',{params:scheduleDetails})
				// console.log(res);
				if(res.data.code==='ER_DUP_ENTRY')
				{
					seterrormsg('You have already created same schedule');
					// console.log(res.data.sqlMessage);
					return;
				}
				
				
		}
			catch(err)
			{
				seterrormsg("fill all details");
				console.log(err);
				return;
			}
	// 	}
	// 	try
    //   {  await InsertData();}
	//   catch(err){
	// 	seterrormsg("fill all details");
	// 	return;
	//   }
        await props.reloadButton();
		
    }

    const handlescheduledetails=(event)=>{
        const { name, value } = event.target;
        setscheduleDetails({ ...scheduleDetails, [name]: value });
    }
    useEffect(()=>{
		seterrormsg('');
		setscheduleDetails({
			startPlace:scheduleDetails.startPlace,
			endPlace:scheduleDetails.endPlace,
			date: '',
			time: ''
		  });
	},[props])
    return (
        <div className="wrapschedule" data-pos="0">
		<div className="headbar">
            <i className="fa-solid fa-handshake"></i> <span style={{marginLeft: '10px', marginRight: '10px'}}> Creating a Schedule  </span><i className="fa-solid fa-handshake"></i> 
            <i className="closeicon zmdi zmdi-close zmdi-hc-lg" onClick={()=>cancelButton()}></i>
		</div>
		<div className="headerschedule">
			{/* <div className="bg"></div> */}
			{/* <div className="filter"></div> */}
			{/* <div className="title"> */}
				{/* <div className="fromPlace">
					<span>D</span><span>U</span><span>B</span>
				</div>
				<span className="separator"><i className="zmdi zmdi-airplane"></i></span>
				<div className="toPlace">
					<span>M</span><span>R</span><span>S</span>
				</div> */}
                <div>
                    <Logo></Logo>
                </div>
			{/* </div> */}
			{/* <div className="map"></div> */}
		</div>
        
        

		<div className="contentschedule">
			<section>
				<div className="formschedule">
                    <div style={{display: 'flex', flexDirection: 'row'}}>
						<div className="controlschedule select" style={{width: '50%'}} >
							<div className="controlschedule-head">
								<i style={{marginRight: '10px'}} className="zmdi zmdi-account-circle"></i>
								
								<span className="close"><i className="zmdi zmdi-close"></i></span>
								<div >
									{/* <h6>Name : </h6> */}
									<span className="airport-name" data-role="from">{profileDetails.name} </span>
								</div>			
							</div>
						</div>
						<div className="controlschedule select" style={{width: '50%'}}>
							<div className="controlschedule-head">
								<i style={{marginRight: '10px'}} className="zmdi zmdi-phone"></i>
								<span className="close"><i className="zmdi zmdi-close"></i></span>
								<div>
									{/* <h6>Phone Number</h6> */}
									<span className="airport-name" data-role="from">{profileDetails.phone}</span>
								</div>			
							</div>
						</div>
					</div>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div className="controlschedule select" style={{width: '50%'}}>
                            <div className="controlschedule-head" >
                                <i className="zmdi zmdi-pin"></i>
                                <span className="close"><i className="zmdi zmdi-close"></i></span>
                                <div >
                                    {/* <h6>From</h6> */}
                                    <span className="airport-name" data-role="from" >
                                    <div>
                                    
                                    <Dropdown
                                        isSearchable={true}
                                        isMulti={false}
                                        placeHolder="From"
                                        options={options}
                                        onChange={(value) =>{ scheduleDetails.startPlace=props.Valuelist(value);}}
                                        
                                    />
                                    </div>
                                    </span>
                                </div>			
                            </div>
                        </div>
						<div className="controlschedule select" style={{width: '50%'}}>
                            <div className="controlschedule-head" >
                                <i className="zmdi zmdi-pin"></i>
                                <span className="close"><i className="zmdi zmdi-close"></i></span>
                                <div >
                                    <span className="airport-name" data-role="from" >
                                    <div>
                                    <Dropdown
                                        isSearchable={true}
                                        isMulti={false}
                                        placeHolder="To"
                                        options={options}
                                        onChange={(value) =>{ scheduleDetails.endPlace=props.Valuelist(value);}}
                                        
                                    />
                                    </div>
                                    </span>
                                </div>			
                            </div>
                        </div>
                    </div>
					<div style={{display: 'flex', flexDirection: 'row'}}>
						<div className="controlschedule dateinput" style={{width: '50%'}}>
							<div className="controlschedule-head">
								<i className="zmdi zmdi-calendar"></i>
								<span className="close"><i className="zmdi zmdi-close"></i></span>
								<div className="controlschedule-item" style={{display: 'flex', flexDirection: 'row'}}>
									{/* <h6>Date</h6> */}
									<span>
									<input
										
										type="date"
										id="date"
										name="date"
										placeholder="Date"
										value={scheduleDetails.date}
										onChange={handlescheduledetails}
										style={{ padding: '10px 16px', borderRadius: 8, outline: 'none', border: 'none', marginRight: 8, width: 200 }}
										required
									/>
									</span>
								</div>
							</div>
						</div>
						<div className="controlschedule dateinput" style={{width: '50%'}}>
							<div className="controlschedule-head">
								<i className="zmdi zmdi-time"></i>
								<span className="close"><i className="zmdi zmdi-close"></i></span>
								<div className="controlschedule-item" style={{display: 'flex', flexDirection: 'row'}}>
									{/* <h6>Time</h6> */}
									<span>
									<input
										
										type="time"
										id="time"
										name="time"
										placeholder="time"
										value={scheduleDetails.time}
										onChange={handlescheduledetails}
										style={{ padding: '10px 16px', borderRadius: 8, outline: 'none', border: 'none', marginRight: 8, width: 200 }}
										required
									/>
									</span>
								</div>
							</div>
							
						</div>
					</div>
					<div style={{display:'flex', justifyContent: 'center', color: 'red'}}>{errormsg}</div>
					<div className="controlschedule">
						<button type='submit' className="btnSearch" style={{color: '#1C1D21'}} onClick={()=>confirmButton(scheduleDetails)}><strong>Confirm</strong></button>
					</div>

				</div>
				
				
				

			</section>
		</div>		
	
	</div>
    );
}

export default CreateScheduleDialoguebox;