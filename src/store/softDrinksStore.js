import React, { Component } from 'react';
import Row from '../row/row';
import { connect } from 'react-redux';
import { floatToMoney } from '../utils/util'
import { bindActionCreators } from 'redux';
import {showLoader} from '../actions/loaderActions'
import {STORE_URL} from '../config'

class SoftDrinksStore extends Component {
    constructor(props) {
        super(props);
        this.state = { amount: 1, softDrinks: [] }
    }

    /** Antes do componente ser renderizado, ele busca na API a lista de refrigerantes */
    componentWillMount() {
        console.log(STORE_URL)
        fetch(STORE_URL)
            .then(response => response.json())
            .then(data => this.setState({ ...this, softDrinks: data }, () => this.props.showLoader(false)))
            .catch(err => {
                alert("Não foi possivel buscar a lista de refrigerantes") 
                this.props.showLoader(false)
            });
    }

    // Tabela de Preço de Refrigerantes
    render() {
        return (
            <div className="card card-body">
            <div className="card-title text-center"><h1>Loja de Refrigerantes</h1></div>
                <table className="table table-bordered table-hover table-sm mt-2">
                    <thead>
                        <tr>
                            <th>Refrigerante</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                        <tr>
                            {/* Botão de Adicionar é desabilitado quando o existe mais 
                            campos do que números de refrigerantes na table */}
                            <td><button className='btn btn-primary btn-block'
                                disabled={this.state.amount > this.state.softDrinks.length}
                                onClick={() => this.addRow()}>Adicionar Refrigerante</button></td>

                            {/* Botão de  Remover Refrigerante é desabilitado quando não existe campos para preencher */}
                            <td><button className='btn btn-danger btn-block' disabled={this.state.amount < 1} onClick={() => this.removeRow()}>Remover Refrigerante</button></td>
                            <td className="align-middle text-center"><b>Valor Total</b></td>
                            <td><input type="text" className="form-control" readOnly value={floatToMoney(this.props.total)}></input></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    /**
     * Renderiza os campos de escolha de refrigerantes
     */

    renderRows() {
        const rows = [];
        for (let i = 0; i < this.state.amount; i++) {
            rows.push(<Row key={i} index={i} softDrinks={this.state.softDrinks}></Row>)
        }
        return rows;
    }

    addRow() {
        this.setState((state) => ({ ...this, amount: state.amount + 1 }))
    }

    removeRow() {
        this.setState((state) => ({ amount: state.amount - 1 }))
    }
}

/**
 * REDUX - Mapeia para props o valor total da lista de refrigerantes
 * action para desativar o loader quando a lista de refrigerantes for desativada
 * @param {*} state 
 */
const mapStateToProps = state => ({ total: state.totalState.total });
const mapDispatchToProps =
  dispatch => bindActionCreators({ showLoader }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(SoftDrinksStore);