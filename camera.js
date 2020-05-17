/**
 * @license
 * Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import {LitElement, html, css} from 'lit-element';
import '@material/mwc-button';
import '@material/mwc-fab';
import '@material/mwc-icon-button';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class SnapshotCamera extends LitElement {
  
  static get styles() {
    return css`
      :host {
        display: block;
      }

      #buttons {
        position:absolute; 
        left: 40%;
        bottom: 10%;
      }

      #camera--view, #camera--sensor, #camera--output{
        position:fixed;
        top:0;
        left:0;
        height: 100%;
        width: 100%;
        object-fit: cover;
      }

      .taken{
          height: 100px!important;
          width: 100px!important;
          transition: all 0.5s ease-in;
          border: solid 3px white;
          box-shadow: 0 5px 10px 0 rgba(0,0,0,0.2);
          top: 20px;
          right: 20px;
          z-index: 2;
      }
    `;
  }

  static get properties() {
    return {
      width: {type: Number},
      height: {type: Number},
      media: {type: Object},
      enabled: {type: Boolean}
    };
  }

  constructor() {
    super();
    this.width = 300;
    this.height = 300;
    this.enabled = true;
    this.media = { video: { facingMode: "environment" }, audio: false };
  }

  start() {
    navigator.mediaDevices.getUserMedia(this.media).then(stream => {
      this.stream = stream;
      this.track = stream.getTracks()[0];
      this.cameraView.srcObject = stream;
    }).catch(error => {
        console.log("Oops. Something is broken.", error);
    });
  }

  shoot() {
    this.cameraSensor.width = this.cameraView.videoWidth;
    this.cameraSensor.height = this.cameraView.videoHeight;
    this.cameraSensor.getContext("2d").drawImage(this.cameraView, 0, 0);
    this.cameraOutput.src = this.cameraSensor.toDataURL("image/webp");
    this.cameraOutput.classList.add("taken");
  };

  enable() {
    this.enabled = true;
    this.start();
  }

  disable() {
    this.enabled = false;
    this.track.stop()
  }

  firstUpdated() {
    var sDom = this.shadowRoot;
    this.cameraView = sDom.querySelector("video#camera--view")
    this.cameraOutput = sDom.querySelector("img#camera--output")
    this.cameraSensor = sDom.querySelector("canvas#camera--sensor")
    this.start()
  }

  // Define the custom element HTML
  render() {
    if (this.enabled == false) return '';

    return html`
      <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'/>
      <div id="camera">
        <!-- Camera sensor -->
        <canvas id="camera--sensor"></canvas>
        
        <!-- Camera view -->
        <video id="camera--view" autoplay playsinline></video>
        
        <!-- Camera output -->
        <img src="//:0" alt="" id="camera--output">
            
        <!-- Camera buttons -->

        <section id="buttons">
          <mwc-button @click="${this.shoot}" id="shoot" icon="camera" raised>
            kuvaa
          </mwc-button>
          <mwc-button raised @click="${this.disable}" id="exit" icon="close" raised>
            sulje
          </mwc-button>
        </section>

    </div>`;
  }

}

// define the custom Camera element
window.customElements.define('snapshot-camera', SnapshotCamera);

