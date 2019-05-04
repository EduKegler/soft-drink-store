import React, { Component } from 'react';
import { incrementTotal, decrementTotal } from '../actions/totalActions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { floatToMoney } from '../utils/util'
class Row extends Component {

  constructor(props) {
    super(props);
    this.state = { amount: 0, value: 0, total: 0 }
  }

  render() {
    return (
      <tr key={this.props.index}>
        <td><select className="custom-select" onChange={(e) => this.renderPrice(e)}>
          <option defaultValue={0}>Selecione um Refrigerante</option>
          {this.renderOptions()}
        </select>
        </td>
        {/* Caso não seja selecionado um refrigerante, a quantidade passa a ser zero */}
        <td><input type="number" className="form-control"
          readOnly={!this.state.value}
          onChange={(e) => this.updateTotal(e)} value={this.state.amount}></input></td>

        <td><input type="text" className="form-control"
          readOnly value={floatToMoney(this.state.value)}></input></td>
        <td><input type="text" className="form-control"
          readOnly value={floatToMoney(this.state.total)}></input></td>
      </tr>
    )
  };

  // Renderiza a lista de opções
  renderOptions = () => {
    return this.props.softDrinks.map((soda) => {
      return (<option key={soda.id} value={soda.id}>{`${soda.marca} - ${soda.sabor} ${soda.quantidade}`}</option>)
    })
  }

  // Atualiza o preço e valor total quando selecionado ou trocado um refrigerante
  renderPrice(e) {
    const soda = (e.target.value - 1) >= 0 ? this.props.softDrinks[e.target.value - 1].valor : 0
    this.props.decrementTotal(this.state.total)
    this.setState((state) => ({
      ...this,
      amount: soda === 0 ? 0 : state.amount,
      value: soda, total:
        state.amount * soda
    }), () => this.props.incrementTotal(this.state.total))
  }

  // Atualiza o valor total quando trocado a quantidade
  updateTotal = (e) => {
    let amount = parseInt(e.target.value) || 0
    this.props.decrementTotal(this.state.total)
    this.setState((state) => ({
      ...this,
      amount: amount,
      total: amount * state.value
    }), () => this.props.incrementTotal(this.state.total))
  }

  // Antes do componente ser retirado da tela, é descontado seu valor do valor total da lista
  componentWillUnmount = () => {
    this.props.decrementTotal(this.state.total)
  }
}

// REDUX - Mapeia o valor total e as funções para alterar os mesmos para lista de props
const mapStateToProps = state => ({ total: state.totalState.total })
const mapDispatchToProps =
  dispatch => bindActionCreators({ incrementTotal, decrementTotal }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Row)