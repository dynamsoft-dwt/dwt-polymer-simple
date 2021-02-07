/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class MyView1 extends PolymerElement {
  ready(){
      super.ready();
      this.showDWT();
  }
  showDWT() {
      Dynamsoft.WebTwainEnv.CreateDWTObjectEx({ WebTwainId: 'shadowDom' }, (obj) => {
      this.shadowRoot.querySelector('#showDWT').style.display = "none";
      this.shadowRoot.querySelector('#scanbtn').style.display = "";
      DWObject = obj;
      DWObject.Viewer.bind(this.shadowRoot.querySelector('#dwtcontrolContainer'));
      DWObject.Viewer.width = 560;
      DWObject.Viewer.height = 600;
      DWObject.Viewer.show();
      }, function (e) {
      console.log(e)
      });
  }
  handleClick() {
      if (DWObject) {
      DWObject.SelectSource(function () {
          DWObject.AcquireImage(function () {

          }, function (err) { console.log(err); });
      }, function (err) { console.log(err); });
      }
  }
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div class="card">
          <div class="circle">1</div>
          <h1>Use Dynamic Web TWAIN to Scan</h1>
          <div id="dwtcontrolContainer"></div>
          <button id="showDWT" on-click="showDWT">Start</button>
          <button id="scanbtn" on-click="handleClick" style="display:none">scan</button>
      </div>
    `;
  }
}

window.customElements.define('my-view1', MyView1);
