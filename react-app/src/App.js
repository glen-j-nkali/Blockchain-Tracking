import React, { Component } from "react";
import SpaIcon from "@material-ui/icons/Spa";
import BusinessIcon from "@material-ui/icons/Business";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import "./App.css";

import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
 
var dateOptions = {  
  weekday: "long", year: "numeric", month: "short",  
  day: "numeric", hour: "2-digit", minute: "2-digit"  
};  

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      meta: [],
      info:{},
      historian: [],
      loadingMeta: true,
      requestFailed: false,
    };
  }
  componentDidMount () {
    this.getProductMeta({id:4})
  }

  getProductMeta(options) {
    var url = `http://3ef09715.ngrok.io/api/Product/${options.id}?filter={%22include%22:%20%22resolve%22}`
    this.setState({
      loadingMeta: true
    })
    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw Error("Network request failed")
      }
      return response
    })
    .then(d => d.json())
    .then(d => {
      this.setState({
        info: d,
        meta: JSON.parse(d.productMetaData.replace(/'/g, '"'))
      })
      this.getHistorian(this.state.meta)
      console.log(this.state.meta)
      console.log(this.state.meta.updated)
      console.log(this.state.info)
    },() => {
      this.setState({
        requestFailed: true
      })
    })
  }

  getHistorian(enteredDate) {
    var url = 'http://3ef09715.ngrok.io/api/system/historian'
    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw Error("Network request failed")
      }
      return response
    })
    .then(d => d.json())
    .then(d => {
      this.setState({
        historian: d
      })
      // this.setState({
      //   historian: d.filter(function(history){
      //       return history.transactionTimestamp === enteredDate;
      //   })
      // })
      console.log(this.state.historian)
    },() => {
      this.setState({
        requestFailed: true
      })
    })
  }

  render() {
    const view = this.state.meta.updated === undefined
    ? (
      <div>
        Hey
      </div>
    )
    : this.state.meta.updated.map((meta, ind) =>
        <VerticalTimelineElement
          className={ind % 2 === 0 ? "vertical-timeline-element-title" : "vertical-timeline-element--work"}
          date={ new Date(meta.date_validated).toLocaleTimeString("en-us", dateOptions)}
          iconStyle={{ 
            background: "rgb(233, 30, 99)", 
            color: "#fff" }}
          icon={meta.made_by === "seller" ? <SpaIcon /> :  <BusinessIcon />}
        >
          <h3 className="vertical-timeline-element-title">{meta.name}</h3>
          <h4 className="vertical-timeline-element-subtitle">
            {meta.location}
          </h4>
          <p>
            <span>Type: {meta.made_by.toUpperCase()}</span>
            <br></br>
            <span>{meta.update ? "Updated Entry" : "First Entry"}</span>
            <br></br>
          </p>
        </VerticalTimelineElement>
       )
      const history = 
      ( 

        <ol className="history">
          {
            this.state.historian.map((history, ind) =>
            <li><span>{ind+1}</span>
              <p><strong>Transaction ID:</strong> {history.transactionId}</p>
              <p><strong>Contract:</strong> {history.transactionType}</p>
              <p><strong>Invoked by:</strong> {history.participantInvoking}</p>
              <p><strong>Key used:</strong> {history.identityUsed}</p>
            </li>
            )
          }
        </ol>
      )
    return (
      <div className="mainPage">
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work heading"
            date=""
            iconStyle={{ 
              background: "rgb(16, 204, 82)", 
              color: "#fff" }}
            icon={<VerifiedUserIcon />}
          >
            <h3 className="vertical-timeline-element-title">{this.state.meta.id}</h3>
            <h4 className="vertical-timeline-element-subtitle">
              {this.state.meta.location}
            </h4>
            <p>
              <span>Verified Date: { new Date(this.state.meta.date).toLocaleTimeString("en-us", dateOptions)}</span>
              <br></br>
              <span>Product ID: {this.state.meta.product_id}</span>
              <br></br>
              <span>Quantity Purchased: {`${this.state.meta.quantity} ${this.state.meta.unit}`}</span>
              <br></br>
              <span>Type: {this.state.meta.made_by}</span>
              <br></br>
            </p>
          </VerticalTimelineElement>
          {view}
        </VerticalTimeline>
        {history}
      </div>
    );
  }
}

export default App;
