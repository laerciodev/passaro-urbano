import { ItemCarrinho } from './shared/item-carrinho.model';
import { Oferta } from './shared/oferta.model';

class CarrinhoService {
    public itens: ItemCarrinho[] = [];

    public exibirItens(): ItemCarrinho[] {
        return this.itens;
    }

    get totalItens(): number {
        return this.itens.length;
    }

    public incluirItem(oferta: Oferta): void {
        let itemCarrinho: ItemCarrinho = new ItemCarrinho(
            oferta.id,
            oferta.imagens[0],
            oferta.titulo,
            oferta.descricao_oferta,
            oferta.valor,
            1
        );

        let itemCarrinhoEncontrado = this.buscarItemCarrinho(itemCarrinho);

        if (itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade += 1;
        } else {
            this.itens.push(itemCarrinho);
        }
    }

    get totalCarrinhoCompras(): number {
        let total: number = 0;

        this.itens.map(
            item => total += (item.valor * item.quantidade)
        )

        return total;
    }

    public buscarItemCarrinho(itemCarrinho: ItemCarrinho): ItemCarrinho | undefined {
        return this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)
    }

    public adicionarQuantidade(item: ItemCarrinho): void {
        let itemCarrinhoEncontrado = this.buscarItemCarrinho(item);

        if (itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade += 1;
        } 
    }

    public removerQuantidade(item: ItemCarrinho, index: number): void {
        let itemCarrinhoEncontrado = this.buscarItemCarrinho(item);

        if (itemCarrinhoEncontrado) {

            itemCarrinhoEncontrado.quantidade -= 1;

            if (itemCarrinhoEncontrado.quantidade === 0) {
                this.itens.splice(index, 1);
            } 
        }
    }

    public limparCarrinho(): void {
        this.itens = [];
    }

}

export { CarrinhoService };