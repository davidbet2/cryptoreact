import React, { Component } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Axios from 'axios';
import Resultado from './components/Resultado';

class App extends Component {

  state = {
    monedas: [],
    cotizacion: {},
    monedaCotizada: '',
    cargando: false
  }

  async componentDidMount() {
    this.obtenerMonedas();
  }

  obtenerMonedas = async () => {
    const url = `https://api.coinmarketcap.com/v2/ticker/`;

    Axios.get(url).then( respuesta => {
      this.setState({
        monedas: respuesta.data.data
      })
    }).catch(error => {
      console.log(error);
    })
  }

  obternerValoresCrypto = async (monedas) => {
    const {moneda, crypto} = monedas;
    const url = `https://api.coinmarketcap.com/v2/ticker/${crypto}/?convert=${moneda}`;

    await Axios.get(url)
          .then(respuesta => {
            this.setState({
              cargando: true
            })
           setTimeout(()=>{
            this.setState({
              cotizacion:respuesta.data.data,
              monedaCotizada:moneda,
              cargando: false
            })
           }, 3000)
          })
  
  }

  render() {

    const cargando = this.state.cargando;

    let resultado;

    if(cargando) {
      resultado = <div className="sk-cube-grid">
      <div className="sk-cube sk-cube1"></div>
      <div className="sk-cube sk-cube2"></div>
      <div className="sk-cube sk-cube3"></div>
      <div className="sk-cube sk-cube4"></div>
      <div className="sk-cube sk-cube5"></div>
      <div className="sk-cube sk-cube6"></div>
      <div className="sk-cube sk-cube7"></div>
      <div className="sk-cube sk-cube8"></div>
      <div className="sk-cube sk-cube9"></div>
    </div>
    } else {
      resultado =  <Resultado
      cotizacion={this.state.cotizacion}
      monedaCotizada = {this.state.monedaCotizada}
    />
    }

    return (
      <div className="container">
       <Header titulo = 'Cotiza Criptomonedas al instante' />
       <div className="row justify-content-center">
        <div className="col-md-6 bg-light pb-4 contenido-principal">
          <Formulario
            monedas = {this.state.monedas}
            obternerValoresCrypto = {this.obternerValoresCrypto}
          />
            {resultado}
        </div>
       </div>
      </div>
    );
  }
}

export default App;
