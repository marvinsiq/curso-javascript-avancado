class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        
        this._form = $('#form-negociacao');
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoes-view')),
            'adiciona', 'limpa');        

        this._mensagem = new Bind(
            new Mensagem(), 
            new MensagemView($('#mensagem-view')),
            'texto');        
    }

    adiciona(event) {

        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = "Negociação cadastrada com sucesso!";

        this._limpaFormulario();
    }

    apagar(event) {
        this._listaNegociacoes.limpa();
        this._mensagem.texto = "Lista de negociações apagadas com sucesso!";
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaFormulario() {
        this._form.reset();
        this._inputData.focus();
    }

}