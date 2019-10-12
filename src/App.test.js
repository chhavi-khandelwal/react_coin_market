import React from 'react';
import ReactDOM, {render} from 'react-dom';
import { act } from 'react-dom/test-utils';
import App from './App';
import { MemoryRouter } from 'react-router';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { expect } from 'chai';

configure({adapter: new Adapter()});

function renderApp(route) {
  const root = document.createElement('div');
  root.classList.add('main');
  document.body.appendChild(root);

  // Render app
  render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
    root
  );
}

function goToRoute(selector) {
  act(() => {
    // Interact with page
    const overViewLink = document.querySelector(selector);
    overViewLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
}

jest.mock('react-chartjs-2', () => ({
  Bubble: () => <div></div>
}));
jest.setTimeout(30000);

describe('App is mounted correctly', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('On overview', () => {
  beforeEach(() => {
    renderApp('/');
    goToRoute('#overview');
  });

  afterEach(() => {
    const el = document.getElementsByClassName('main')[0];
    el.parentNode.removeChild(el);
  });

  it('App shows loader before loading the first 10 cryptocurrencies', () => {
    expect(document.getElementsByClassName('loader')).to.have.lengthOf(1);
  });

  it('First App load shows 10 crypto currencies', (done) => {
    setTimeout(() => {
      expect(document.querySelectorAll('.cryptolist .cryptolist__item')).to.have.lengthOf(10);
      done();
    }, 20000);
  });

  it('shows 10 crypto currencies on changing select value to 50', (done) => {
    const select = document.querySelector('.coin-limiter select');
    select.value = 50;

    select.dispatchEvent(new Event("change", { bubbles: true }));
    expect(document.getElementsByClassName('loader')).to.have.lengthOf(1);

    setTimeout(() => {
      expect(document.querySelectorAll('.cryptolist .cryptolist__item')).to.have.lengthOf(10);
      done();
    }, 10000);
  });

  it('clicking on Liquidity, changes the url', () => {
    const select = document.querySelector('.coin-limiter select');

    goToRoute('#liquidity');
    expect(document.URL).contains('liquidity');
    expect(select.value).to.equal("10");
  });

  it('clicking on Liquidity, limit value remains same as on overview page', () => {
    const select = document.querySelector('.coin-limiter select');
    select.value = 50;
    select.dispatchEvent(new Event("change", { bubbles: true }));

    goToRoute('#liquidity');
    expect(select.value).to.equal("50");
  });
});
