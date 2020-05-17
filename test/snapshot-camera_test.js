import {SnapshotCamera} from '../camera.js';
import {fixture, html} from '@open-wc/testing';

const assert = chai.assert;

suite('snapshot-camera', () => {
  test('is defined', () => {
    const el = document.createElement('snapshot-camera');
    assert.instanceOf(el, SnapshotCamera);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<snapshot-camera></snapshot-camera>`);
    assert.shadowDom.equal(
      el,
      `
      <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'/>
      <div id="camera">
        <canvas id="camera--sensor"></canvas>
        <video id="camera--view" autoplay playsinline></video>
        <img src="//:0" alt="" id="camera--output">
        <section id="buttons">
          <mwc-button id="shoot" icon="camera" raised>
            kuvaa
          </mwc-button>
          <mwc-button id="exit" icon="close" raised>
            sulje
          </mwc-button>
        </section>
      </div>
    `
    );
  });

  test('renders with a set name', async () => {
    const el = await fixture(html`<snapshot-camera name="Test"></snapshot-camera>`);
    assert.shadowDom.equal(
      el,
      `
      <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'/>
      <div id="camera">
        <canvas id="camera--sensor"></canvas>
        <video id="camera--view" autoplay playsinline></video>
        <img src="//:0" alt="" id="camera--output">
        <section id="buttons">
          <mwc-button id="shoot" icon="camera" raised>
            kuvaa
          </mwc-button>
          <mwc-button id="exit" icon="close" raised>
            sulje
          </mwc-button>
        </section>
      </div>
    `
    );
  });

  /*
  test('handles a click', async () => {
    const el = await fixture(html`<snapshot-camera></snapshot-camera>`);
    const button = el.shadowRoot.querySelector('button');
    button.click();
    await el.updateComplete;
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 1</button>
      <slot></slot>
    `
    );
  });
  */
});
