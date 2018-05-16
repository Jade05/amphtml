/**
 * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Layout, isLayoutSizeDefined} from '../../../src/layout';

export class AmpHelloWorld extends AMP.BaseElement {

  /** @param {!AmpElement} element */
  constructor(element) {
    super(element);

    this.scriptsrc = element.hasAttribute('data-scriptsrc') ?
      element.getAttribute('data-scriptsrc') :
      '';
  }

  loadScript(win, url, opt_cb, opt_errorCb) {
    /** @const {!Element} */
    const s = this.win.document.createElement('script');
    s.src = url;
    s.crossOrigin = 'anonymous';
    if (opt_cb) {
      s.onload = opt_cb;
    }
    if (opt_errorCb) {
      s.onerror = opt_errorCb;
    }
    this.win.document.body.appendChild(s);
  }

  preconnectCallback() {
    this.scriptsrc &&
    this.loadScript(this.win,
        this.scriptsrc,
        function() {},
        function() {});
  }

  /** @override */
  isLayoutSupported(layout) {
    return layout == Layout.CONTAINER || isLayoutSizeDefined(layout);
  }
}

AMP.registerElement('amp-hello-world', AmpHelloWorld);
