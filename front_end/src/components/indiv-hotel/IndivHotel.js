import React, { Component } from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import ReactStars from 'react-stars';
import AnchorLink from 'react-anchor-link-smooth-scroll'

//  sliding image testing purpose
// All images are local, since I have server connection issues
// all image path are hardcoded as the moment
// pending for further development
//
import images1 from "../../images/hotelImages/paris-1.jpg";
import images2 from "../../images/hotelImages/paris-2.jpg";
import images3 from "../../images/hotelImages/paris-3.jpg";
import images4 from "../../images/hotelImages/paris-4.jpg";
import images5 from "../../images/hotelImages/paris-5.jpg";
import images6 from "../../images/hotelImages/paris-6.jpg";
import images7 from "../../images/hotelImages/paris-7.jpg";
import images8 from "../../images/hotelImages/paris-8.jpg";


const roomOptions = ['single', 'double', 'Queen', 'King']
const amenities= ["Casino", "13 restaurants and 3 bars/lounges", "Full-service spa", "Outdoor pool", "Nightclub", "Breakfast available", "Fitness center", "Valet parking", "Business center", "Limo/town car service", "24-hour front desk", "Air conditioning", "Free WiFi in lobby"]
const images = [images1, images2, images3, images4, images5, images6, images7, images8]


class IndivHotel extends Component {
    constructor(props) {
        super(props);

        this.state = {

          name: "Paris Las Vegas Resort & Casino, Las Vegas",
          streetAddress: "3655 Las Vegas Blvd S, Las Vegas, NV, 89109, United States of America",

          tempAmen1:amenities.slice(0,amenities.length/2),
          tempAmen2:amenities.slice(amenities.length/2, amenities.length),
          starRating:"4-star Hotel",
          city: "Las Vegas",
          zip: "89109",
          state: "NV",
          
          lat:"36.112497",
          alt:"-115.171571",

          tripAdvisorRate: "4.2",
          hotelsRate:"4.9",

          lowPrice:'89',
          highPrice:'120',

          counterAm:0,
          moreAmentities:amenities.length,

          errors: {}
        }
    }

    render(){
        return(
            <div>
            <div id="whole page" className="container" style={{marginTop:'2%'}}>
                <div className="row">
                    <h1 className="display-4 text-left col-10" style={{fontSize: 40, fontWeight: "bold"}}>{this.state.name}</h1>
                    <h1 className="display-4 text-center col-2" style={{fontSize: 24, color:"#FFD700"}}> {this.state.starRating} 
                    <ReactStars
                        count={5}
                        value={4}
                        size={28}
                        edit={false}
                        color2={'#FFD700'} /></h1>
                </div>
                <h2 className="display-4 test-left" style={{fontSize: 24, color:"#808080"}}>{this.state.streetAddress}</h2>
                
                <div className="row">
                <div id="pics and amentities" className="col-8 w-75 h-75" style={{marginLeft:'0', marginTop:'30px'}}>

                    <div id="pics sliding show" className="container">
                    <div id="carouselExampleIndicators" className="carousel slide w-100 h-50" data-ride="carousel">
                    <ol className="carousel-indicators">
                    {images.map((item, index) => {
                        if(index == 0) return( <li data-target="#carouselExampleIndicators" data-slide-to={index} className="active"></li>);
                        else return (<li data-target="#carouselExampleIndicators" data-slide-to={index}></li>);
                        
                    })}
                    </ol>
                    <div className="carousel-inner">
                    {images.map((item, index) => {
                        if(index == 0) return( 
                            <div className="carousel-item active">
                                <img className="d-block w-100" src={images[index]} alt="hotel img"></img>
                            </div>
                        );
                        else return (
                            <div className="carousel-item">
                                <img className="d-block w-100" src={images[index]} alt="hotel img"></img>
                            </div>
                        );
                        
                    })}
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                    </div>
                    </div>
                    <div id="amenities" className="expandable-content overview-sections" style={{marginTop:'10px', height: 'auto'}}>
                    <h5 style={{fontWeight:'bold'}}><i class="fas fa-concierge-bell"></i>  Main Amentities</h5>
                    <div className="row">
                    
                        <div id="amentities row" className="col"> 
                            {this.state.tempAmen1.map((item,key) =>{
                                return (
                                    <div id="amentities col" className="col" style={{color:'#808080'}}><i class="fas fa-check" style={{color:'#3e6e00'}}></i>  {item}</div>
                                )
                            })}
                        </div>
                        <div id="amentities row" className="col">
                            {this.state.tempAmen2.map((item,key) =>{
                                return (
                                    <div id="amentities col" className="col" style={{color:'#808080'}}><i class="fas fa-check" style={{color:'#3e6e00'}}></i>  {item}</div>
                                )
                            })}
                        </div>
                    </div>
                    </div>
                </div>

                <div className="col" style={{marginTop:'0'}}>
                <h2 className="text-center" style={{fontSize:40 ,color:"red"}}>${this.state.lowPrice}</h2>
                <AnchorLink href="#table1">
                    <button type="button" class="btn btn-success h-10" style={{width:'100%'}}>Book Now</button>
                </AnchorLink>
                <div className='row' style={{marginTop:'2%'}}>
                <div className='col'>
                    <h3 className="text-left" style={{fontSize:20}}><img style={{width:'20%', height:'18%'}} src="https://cdn-b.william-reed.com/var/wrbm_gb_hospitality/storage/images/7/8/9/3/673987-1-eng-GB/TripAdvisor-being-used-to-blackmail-hoteliers.jpg"></img> Trip Advisor</h3>
                    
                    <ReactStars 
                        count={5}
                        value={this.state.tripAdvisorRate}
                        size={22}
                        edit={false}
                        color2={'#00af87'} />
                    
                </div>
                <div className='col'>
                    <h3 className="text-left" style={{fontSize:20}}><img style={{width:'14%', height:'5%'}} src="https://a.cdn-hotels.com/da/assets/s/63.0/images/brands/hcom/logos/logo-social.jpg"></img>  Hotels.com</h3>
                    <ReactStars
                        count={5}
                        value={this.state.hotelsRate}
                        size={22}
                        edit={false}
                        color2={'#d32f2f'} />
                </div>
                </div>
                    <Map google={this.props.google} zoom={15} initialCenter={{lat:this.state.lat, lng:this.state.alt}} style={{height:'50%', width:'97%', marginTop:'1%', align:'left'}}>
                            
                        <Marker onClick={this.onMarkerClick}
                            name={'Current location'} />

                        <InfoWindow onClose={this.onInfoWindowClose}>
                        <div>
                            <h1>{this.state.name}</h1>
                        </div>
                        </InfoWindow>
                    </Map>
                </div>
            </div>

            <section id="table1">
            <table class="table table-bordered" style={{marginTop:'3%'}}>
            <thead>
                <tr>
                <th>Room Type</th>
                <th>Today's Price</th>
                <th>Book Now</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">Queen Room</th>
                    <td>${this.state.lowPrice}</td>
                    <td><button type="button" class="btn btn-success h-100">Book Now</button></td>
                </tr>
                <tr>
                    <th scope="row">King Room</th>
                    <td>${this.state.highPrice}</td>
                    <td><button type="button" class="btn btn-success h-100">Book Now</button></td>
                </tr>
                <tr>
                    <th scope="row">Standard Suite</th>
                    <td>$300</td>
                    <td><button type="button" class="btn btn-success h-100">Book Now</button></td>
                </tr>
                <tr>
                    <th scope="row">Business Suite</th>
                    <td>$450</td>
                    <td><button type="button" class="btn btn-success h-100">Book Now</button></td>
                </tr>
                <tr>
                    <th scope="row">Presidential Suite</th>
                    <td>$800</td>
                    <td><button type="button" class="btn btn-success h-100">Book Now</button></td>
                </tr>
                <tr>
                    <th scope="row">King Room</th>
                    <td>${this.state.highPrice}</td>
                    <td><button type="button" class="btn btn-success h-100">Book Now</button></td>
                </tr>
                <tr>
                    <th scope="row">King Room</th>
                    <td>${this.state.highPrice}</td>
                    <td><button type="button" class="btn btn-success h-100">Book Now</button></td>
                </tr>
                <tr>
                    <th scope="row">King Room</th>
                    <td>${this.state.highPrice}</td>
                    <td><button type="button" class="btn btn-success h-100">Book Now</button></td>
                </tr>
                <tr>
                    <th scope="row">King Room</th>
                    <td>${this.state.highPrice}</td>
                    <td><button type="button" class="btn btn-success h-100">Book Now</button></td>
                </tr>
                <tr>
                    <th scope="row">King Room</th>
                    <td>${this.state.highPrice}</td>
                    <td><button type="button" class="btn btn-success h-100">Book Now</button></td>
                </tr>
                <tr>
                    <th scope="row">King Room</th>
                    <td>${this.state.highPrice}</td>
                    <td><button type="button" class="btn btn-success h-100">Book Now</button></td>
                </tr>
                <tr>
                    <th scope="row">King Room</th>
                    <td>${this.state.highPrice}</td>
                    <td><button type="button" class="btn btn-success h-100">Book Now</button></td>
                </tr>
                <tr>
                    <th scope="row">King Room</th>
                    <td>${this.state.highPrice}</td>
                    <td><button type="button" class="btn btn-success h-100">Book Now</button></td>
                </tr>
                <tr>
                    <th scope="row">King Room</th>
                    <td>${this.state.highPrice}</td>
                    <td><button type="button" class="btn btn-success h-100">Book Now</button></td>
                </tr>
                <tr>
                    <th scope="row">King Room</th>
                    <td>${this.state.highPrice}</td>
                    <td><button type="button" class="btn btn-success h-100">Book Now</button></td>
                </tr>
                <tr>
                    <th scope="row">King Room</th>
                    <td>${this.state.highPrice}</td>
                    <td><button type="button" class="btn btn-success h-100">Book Now</button></td>
                </tr>
                <tr>
                    <th scope="row">King Room</th>
                    <td>${this.state.highPrice}</td>
                    <td><button type="button" class="btn btn-success h-100">Book Now</button></td>
                </tr>

            </tbody>
            </table>
            </section>
            
            </div>
            </div>

        ); 
    }

}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyDW-Gy3YtzwfsT2pstjlMU2Q5U4TjRJZp8")
  })(IndivHotel)