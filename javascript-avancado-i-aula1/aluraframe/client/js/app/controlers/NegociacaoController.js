class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._form = $('#form-negociacao');
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        //this._listaNegociacoes = new ListaNegociacoes(model => this._negociacoesView.update(model));

        this._listaNegociacoes = ProxyFactory.create(
            new ListaNegociacoes(), 
            ['adiciona', 'limpa'],
            model => this._negociacoesView.update(model))
        ;

        this._negociacoesView = new NegociacoesView($('#negociacoes-view'));
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem = ProxyFactory.create(
            new Mensagem(), 
            ['texto'],
            model => this._mensagemView.update(model))
        ;


        this._mensagemView = new MensagemView($('#mensagem-view'));
        this._mensagemView.update(this._mensagem);
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