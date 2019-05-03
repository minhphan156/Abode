import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "./Disclaimer.css";
import SJSU from "../../images/SJSU.png";
import Typography from "@material-ui/core/Typography";

export default (class disclaimer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
      <div class="container">
<div>
<br/>
<h1 item id="title" class="display-4">Legal Disclaimer</h1>
<hr/>
</div>

<h4><b>Terms and Conditions</b></h4>
  <p class="mb-0">
  abode.city (Abode) and its members, officers, directors, owners, employees, agents, representatives, suppliers 
  and service providers (collectively “Abode”) provides this website (the “Site”) for informational purposes only. 
  Use of and access to the Site and the information, materials, services, and other Content available on or through 
  the Site (“Content”) are subject to these terms of use and all applicable laws.</p>
<br/>

<h4><b>Purpose</b></h4>
<p class="mb-0">
The Site is a not-for-profit, academic project by students at San Jose State University in San Jose, California, USA. 
Abode is for the Software Engineering Process Management course (CMPE 165). Students of the course must create a fictional, 
proof-of-concept web application to exercise team software development using SDLC methodologies.</p>
<br/>

<h4><b>Fair Use Notice</b></h4>
<p class="mb-0">
The Site contains copyrighted material the use of which has not always been specifically authorized by the copyright owner. 
It is being made available to demonstrate the understanding of web development skills by San Jose State University students. 
It is believed that this constitutes a ‘fair use’ of any such copyrighted material as provided for in section 107 of the US 
Copyright Law. In accordance with Title 17 U.S.C. Section 107, the material on this Site is distributed without profit to those 
who have expressed a prior interest in receiving the included information for research and educational purposes.

</p>
<br/>
<p class="mb-0"><b>
If you wish to use copyrighted material from this Site for purposes of your own that go beyond ‘fair use’, you must obtain 
permission from the copyright owner.</b></p>
<br/>
<h4><b>Hold Harmless</b></h4>
<p class="mb-0">
You alone assume the sole responsibility of evaluating the merits and risks associated with the use of any information or other 
Content on the Site before making any decisions based on such information or other Content. In exchange for using the Site, you 
agree not to hold Abode, its affiliates or any third party service provider liable for any possible claim for damages arising from 
any decision you make based on information or other Content made available to you through the Site.
</p>
<br/>

<h4><b>Money, Payments, and Ownership</b></h4>
  <p class="mb-0">The Site and the Content are not for commercial use. Any price, currency amount, or product offering on the Site are 
  purely fictional. Any input field on the Site that requests a credit card number does not store information.</p>
  <br/>
  <p class="mb-0">
  <b>The Content is not monetized or used for profit in any capacity.</b>
  </p>

<br/>
<br/>
<br/>
<br/>

</div>

</div>
    );
  }
});
